import type { reactionVideo } from '../components/ReactionInput.tsx'
import type { originalVideo } from '../components/OriginalInput.tsx'
import { isTikTokVideo } from '../scripts/formatters.ts'

export const messageFormats = {
  cccrediting1(reactionVideo, originalVideo) {
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
} satisfies Record<
  string,
  (reactionVideo: reactionVideo, originalVideo: originalVideo) => string
>
