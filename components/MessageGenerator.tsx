import type { originalVideo } from './OriginalInput.tsx'
import type { reactionVideo } from './ReactionInput.tsx'
import { FormattingInput } from './FormattingInput.tsx'
import { messageFormats } from '../scripts/messages.ts'

export function MessageGenerator({ originalVideo, reactionVideo }: {
  originalVideo: originalVideo
  reactionVideo: reactionVideo
}) {
  const message = messageFormats.cccrediting1(reactionVideo, originalVideo)

  return (
    <>
      <FormattingInput
        textarea={true}
        droppable={false}
        value={message}
        readOnly={true}
      />
      <div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(message)
          }}
        >
          Copy to clipboard
        </button>
        {!(reactionVideo.title || reactionVideo.url)
          ? 'Warning: no reaction video specified.'
          : ''}
      </div>
    </>
  )
}
