import { convexQuery } from '@convex-dev/react-query'
import {
  headingsPlugin,
  listsPlugin,
  MDXEditor,
  quotePlugin,
  thematicBreakPlugin,
} from '@mdxeditor/editor'
import { useForm } from '@tanstack/react-form'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { api } from 'convex/_generated/api'
import type { Id } from 'convex/_generated/dataModel'
import { ChevronLeft } from 'lucide-react'
import { Button } from '~/components/ui/shadcn/button'
import { Input } from '~/components/ui/shadcn/input'
import { noteSchema } from '~/features/notes/types/schemas/note-schema'
import { Route } from '~/routes/notes/$id'

export function NoteForm() {
  const { id } = Route.useParams()
  const { data: note } = useSuspenseQuery(convexQuery(api.notes.getById, { id: id as Id<'notes'> }))

  const form = useForm({
    defaultValues: {
      title: note.title,
      content: note.content,
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
