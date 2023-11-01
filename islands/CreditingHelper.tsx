import { useState } from 'preact/hooks'
import { ReactionInput, type reactionVideo } from '../components/ReactionInput.tsx'
import { OriginalInput, type originalVideo } from '../components/OriginalInput.tsx'
import { MessageGenerator } from '../components/MessageGenerator.tsx'

export function CreditingHelper() {
  const [originalVideo, setOriginalVideo] = useState<originalVideo>({ url: '', creator: '' })
  const [reactionVideo, setReactionVideo] = useState<reactionVideo>({ url: '', title: '' })

  return (
    <>
      <h3>Offending reaction video</h3>
      <ReactionInput
        reactionVideo={reactionVideo}
        setReactionVideo={setReactionVideo}
      />
      <h3>Original stolen video</h3>
      <OriginalInput
        originalVideo={originalVideo}
        setOriginalVideo={setOriginalVideo}
      />
      <h3>Generated message</h3>
      <MessageGenerator
        originalVideo={originalVideo}
        reactionVideo={reactionVideo}
      />
    </>
  )
}
