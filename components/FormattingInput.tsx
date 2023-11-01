import type { JSX } from 'preact'
import { useState } from 'preact/hooks'

export function FormattingInput({
  value,
  onChange = () => {},
  formatter = (input) => input,
  droppable = true,
  ...props
}:
  & { // common types
    value: string
    onChange?: (value: string) => void
    formatter?: (input: string) => string
    droppable?: boolean
  }
  & (
    | ( // input types
      & { textarea?: false }
      & Omit<
        JSX.HTMLAttributes<HTMLInputElement>,
        'value' | 'onInput' | 'onFocus' | 'onChange'
      >
    )
    | ( // textarea types
      & {
        textarea: true
      }
      & Omit<
        JSX.HTMLAttributes<HTMLTextAreaElement>,
        'value' | 'onInput' | 'onFocus' | 'onChange'
      >
    )
  ) // deno-fmt-ignore
) {
  const selectElementContents: JSX.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const element = e?.target as HTMLInputElement | HTMLTextAreaElement
    if (!element) return

    if (document.hasFocus()) {
      element.select()
    }
  }
  const deselectContents: JSX.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const element = e?.target as HTMLInputElement | HTMLTextAreaElement
    if (!element) return
    element.setSelectionRange(0, 0)
  }
  
  const handleDragOver: JSX.DragEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    if (!droppable) return
    e.preventDefault()
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'move'
  }
  const handleDrop: JSX.DragEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    if (!droppable) return
    e.preventDefault()
    if (!e.dataTransfer) return
    const text = e.dataTransfer.getData('text/plain')
    if (!text) return
    onChange(formatter(text))
  }

  if (!props.textarea) {
    return (
      <input
        value={value}
        onInput={(e) => onChange(formatter(e.currentTarget.value))}
        onFocus={selectElementContents}
        onMouseOver={selectElementContents}
        onBlur={deselectContents}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        {...props}
      />
    )
  } else {
    return (
      <textarea
        value={value}
        onInput={(e) => onChange(formatter(e.currentTarget.value))}
        onFocus={selectElementContents}
        onMouseOver={selectElementContents}
        onBlur={deselectContents}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        {...props}
      />
    )
  }
}
