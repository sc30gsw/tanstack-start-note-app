import {
  headingsPlugin,
  listsPlugin,
  MDXEditor,
  quotePlugin,
  thematicBreakPlugin,
} from '@mdxeditor/editor'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Input } from '~/components/ui/shadcn/input'
import '@mdxeditor/editor/style.css'
import { useForm } from '@tanstack/react-form'
import { ChevronLeft } from 'lucide-react'
import { Button } from '~/components/ui/shadcn/button'
import { noteSchema } from '~/features/notes/types/schemas/note-schema'

export const Route = createFileRoute('/notes/$id')({
  component: NoteIdPage,
})

function NoteIdPage() {
  const form = useForm({
    defaultValues: {
      title: 'title',
      content: '# Hello **world**',
    },
    validators: {
      onChange: noteSchema,
    },
  })

  return (
    <div className="grid h-dvh grid-rows-[min-content_1fr] gap-2 p-2">
      <div className="flex gap-x-2">
        <Link to="..">
          <Button variant={'link'} className="cursor-pointer">
            <ChevronLeft />
          </Button>
        </Link>
        <form.Field name="title">
          {(field) => (
            <Input
              type="text"
              placeholder="Title"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
          )}
        </form.Field>
        <Button className="cursor-pointer">Save</Button>
      </div>
      <form.Field name="content">
        {(field) => (
          <MDXEditor
            markdown={field.state.value}
            onChange={(markdown) => field.handleChange(markdown)}
            plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), thematicBreakPlugin()]}
            className="rounded-md border"
          />
        )}
      </form.Field>
    </div>
  )
}
