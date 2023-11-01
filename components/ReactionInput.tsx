import { produce } from 'npm:immer'
import { useId } from 'preact/hooks'
import { FormattingInput } from './FormattingInput.tsx'
import { formatVideo } from '../scripts/formatters.ts'

export type reactionVideo = {
  url: string
  title: string
}

export function ReactionInput(
  { reactionVideo, setReactionVideo }: {
    reactionVideo: reactionVideo
    setReactionVideo: (reactionVideo: reactionVideo) => void
  },
) {
  const titleID = useId()
  const urlID = useId()

  return (
    <>
      <button
        style={{
          display: 'block',
        }}
        onClick={() => {
          setReactionVideo({ url: '', title: '' })
        }}
      >
        Clear reaction video
      </button>
      <label for={titleID}>
        Reaction video title:
      </label>
      <FormattingInput
        id={titleID}
        value={reactionVideo.title}
        onChange={(title) => {
          setReactionVideo(produce(reactionVideo, (draft) => {
            draft.title = title
          }))
        }}
        style={{
          width: '100%',
        }}
      />
      <label for={urlID}>
        Reaction video URL:
      </label>
      <FormattingInput
        id={urlID}
        type='url'
        value={reactionVideo.url}
        onChange={(url) =>
          setReactionVideo(produce(reactionVideo, (draft) => {
            draft.url = url
          }))}
        formatter={formatVideo}
        style={{
          width: '100%',
        }}
      />
    </>
  )
}
