import { useForm } from '@tanstack/react-form'
import { Link, useRouter } from '@tanstack/react-router'
import { ChevronLeft, Loader2, PlusIcon } from 'lucide-react'
import { Button } from '~/components/ui/shadcn/button'
import { Input } from '~/components/ui/shadcn/input'
import { NoteMdxEditor } from '~/features/notes/components/note-mdx-editor'
import { useCreateNoteMutation } from '~/features/notes/hooks/use-note-mutations'
import { noteSchema } from '~/features/notes/types/schemas/note-schema'

export function CreateNoteForm() {
  const router = useRouter()
  const mutation = useCreateNoteMutation()

  const form = useForm({
    defaultValues: {
      title: 'title',
      content: '# Hello **world**',
    },
    validators: {
      onChange: noteSchema,
    },
    onSubmit: async ({ value }) => {
      const id = await mutation(value)
      router.navigate({ to: `/notes/${id}` })
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
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
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button disabled={!canSubmit || isSubmitting} className="cursor-pointer">
              {isSubmitting ? <Loader2 className="animate-spin" /> : <PlusIcon />}
              Save
            </Button>
          )}
        />
      </div>
      <form.Field name="content">
        {(field) => (
          <NoteMdxEditor
            markdown={field.state.value}
            onChange={(markdown) => field.handleChange(markdown)}
          />
        )}
      </form.Field>
    </form>
  )
}
