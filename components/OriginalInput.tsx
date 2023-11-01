import { produce } from 'npm:immer'
import { useId } from 'preact/hooks'
import { FormattingInput } from './FormattingInput.tsx'
import { extractUsername, formatVideo } from '../scripts/formatters.ts'
import { re } from '$std/semver/_shared.ts'

export type originalVideo = {
  url: string
  creator: string
}

const formattedUsernameCache = new Map<string, string>()
const getFormattedUsername = (url: string | undefined) => {
  if (!url) return ''
  const username = extractUsername(url)
  if (!username) return ''
  if (formattedUsernameCache.has(username)) {
    return formattedUsernameCache.get(username)
  }
  return username
}
const setFormattedUsername = (url: string, formattedUsername: string) => {
  const username = extractUsername(url)
  if (!username) return
  formattedUsernameCache.set(username, formattedUsername)
}

export function OriginalInput(
  { originalVideo, setOriginalVideo }: {
    originalVideo: originalVideo
    setOriginalVideo: (originalVideo: originalVideo) => void
  },
) {
  const urlID = useId()
  const creatorID = useId()

  return (
    <>
      <button
        style={{
          display: 'block',
        }}
        onClick={() => {
          setOriginalVideo({ url: '', creator: '' })
        }}
      >
        Clear original video
      </button>
      <label for={urlID}>
        Original video URL:
      </label>
      <FormattingInput
        id={urlID}
        type='url'
        value={originalVideo.url}
        onChange={(url) => {
          setOriginalVideo(produce(originalVideo, (draft) => {
            draft.url = url
            const extractedUsername = getFormattedUsername(url)
            if (extractedUsername) draft.creator = extractedUsername
          }))
        }}
        formatter={formatVideo}
        style={{
          width: '100%',
        }}
      />
      <label for={creatorID}>
        Original creator name:
      </label>
      <FormattingInput
        id={creatorID}
        value={originalVideo.creator}
        onChange={(creator) => {
          setOriginalVideo(produce(originalVideo, (draft) => {
            draft.creator = creator
          }))
          setFormattedUsername(originalVideo.url, creator)
        }}
        style={{
          width: '100%',
        }}
      />
    </>
  )
}
