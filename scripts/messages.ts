import type { reactionVideo } from '../components/ReactionInput.tsx'
import type { originalVideo } from '../components/OriginalInput.tsx'
import { isTikTokVideo } from '../scripts/formatters.ts'

export const messageFormats = {
  jerbear(reactionVideo, originalVideo) {
    return `hi${
      originalVideo.creator ? ` ${originalVideo.creator}` : ''
    }! I wanted to let you know that sssniperwolf has included one of your ${
      (originalVideo.url ? isTikTokVideo(originalVideo.url) : true)
        ? 'tiktoks'
        : 'videos'
    }${originalVideo.url ? ` (${originalVideo.url})` : ''} in her video${
      reactionVideo.title ? ` "${reactionVideo.title}"` : ''
    }${
      reactionVideo.url ? ` (${reactionVideo.url})` : ''
    }. She has a history of not getting permission for the videos she uses, so I wanted to make sure you were asked for permission or encourage you to copyright claim the video if not. hope you're having a good day!`
  },
  finn(reactionVideo, _originalVideo) {
    return `I\u2019m writing to inform you that YouTuber SSSniperWolf recently \u201Cfeatured\u201D your content in her TikTok compilation video${
      reactionVideo.title ? ` entitled \u201C${reactionVideo.title}\u201D` : ''
    }${
      reactionVideo.url ? ` (link provided: ${reactionVideo.url})` : '.'
    }\n\nGiven that you have obviously spent a long time cultivating your following, I thought it pertinent to inform you that your video has been stolen by this \u2018reactor\u2019 / freebooter so you can take the steps necessary to file a copyright claim, should you desire.\n\nHave a good rest of your day!`
  },
  charlie(reactionVideo, originalVideo) {
    return `Hello${
      originalVideo.creator ? ` ${originalVideo.creator}` : ''
    },\n\nI am writing to let you know that popular reaction YouTuber SSSniperwolf has used your video${
      originalVideo.url ? ` '${originalVideo.url}'` : ''
    } in one of her videos${
      reactionVideo.title ? ` - \u201C${reactionVideo.title}\u201D` : ''
    }${
      reactionVideo.url ? ` (${reactionVideo.url})` : ''
    }.\n\nSSSniperwolf has a history of not getting permission to use creator's clips in her videos, so I just wanted to make sure you were aware of this. She also provides very limited reaction commentary, so the use of the clip may not fall under YouTube's Fair Use Policy.\n\nIf you do not believe that her using your clip falls under Fair Use, you can request to either\n- Get the clip taken out of the video, or\n- Take the video down entirely (and give her a strike against her channel)\n\nHope you're having a good day!\n\nThanks,\n`
  },
} satisfies Record<
  string,
  (reactionVideo: reactionVideo, originalVideo: originalVideo) => string
>

export const messageFormatNames: Record<keyof typeof messageFormats, string> = {
  jerbear: 'jerbear\'s format', // modified from the version in the cccrediting spreadsheet, whoever made it
  finn: 'Finn\'s format', // https://discord.com/channels/1156773645084012665/1157107944370995332/1163553603433287770
  charlie: 'Charlie\'s format', // https://docs.google.com/spreadsheets/d/1fYT2b7J6T8QKbwszbdrFMq5alKdq86eDPPtnwV_lsIM/edit#gid=0&range=L:L
}
