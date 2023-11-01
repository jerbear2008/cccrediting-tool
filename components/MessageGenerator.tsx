import type { originalVideo } from './OriginalInput.tsx'
import type { reactionVideo } from './ReactionInput.tsx'
import { FormattingInput } from './FormattingInput.tsx'
import { messageFormatNames, messageFormats } from '../scripts/messages.ts'
import { useState } from 'preact/hooks'

export function MessageGenerator({ originalVideo, reactionVideo }: {
  originalVideo: originalVideo
  reactionVideo: reactionVideo
}) {
  const [messageFormat, setMessageFormat] = useState(
    (Object.keys(messageFormatNames) as (keyof typeof messageFormats)[])[0],
  )
  const message = messageFormats[messageFormat](reactionVideo, originalVideo)

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
        <select
          style={{
            display: 'inline-block',
          }}
          value={messageFormat}
          onChange={(e) => {
            setMessageFormat(
              e.currentTarget.value as keyof typeof messageFormats,
            )
          }}
        >
          {Object.entries(messageFormatNames).map(([format, name]) => (
            <option value={format}>{name}</option>
          ))}
        </select>
        {!(reactionVideo.title || reactionVideo.url)
          ? 'Warning: no reaction video specified.'
          : ''}
      </div>
    </>
  )
}
