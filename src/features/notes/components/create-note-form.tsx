import {
  headingsPlugin,
  listsPlugin,
  MDXEditor,
  quotePlugin,
  thematicBreakPlugin,
} from '@mdxeditor/editor'
import { useForm } from '@tanstack/react-form'
import { Link } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'
import { Button } from '~/components/ui/shadcn/button'
import { Input } from '~/components/ui/shadcn/input'
import { noteSchema } from '~/features/notes/types/schemas/note-schema'

export function CreateNoteForm() {
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
    <>
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
    </>
  )
}
