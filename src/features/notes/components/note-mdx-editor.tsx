import {
  headingsPlugin,
  listsPlugin,
  MDXEditor,
  quotePlugin,
  thematicBreakPlugin,
} from '@mdxeditor/editor'
import { useEffect, useState } from 'react'

type NoteMdxEditorProps = {
  markdown: string
  onChange: (markdown: string) => void
}

export function NoteMdxEditor({ markdown, onChange }: NoteMdxEditorProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <MDXEditor
      markdown={markdown}
      onChange={onChange}
      plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), thematicBreakPlugin()]}
      className="rounded-md border"
    />
  )
}
