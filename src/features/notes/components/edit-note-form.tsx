import { Link } from '@tanstack/react-router'
import { ChevronLeft, Loader2, Pencil, Trash2 } from 'lucide-react'
import { AlertDialog } from '~/components/ui/shadcn/alert-dialog'
import { Button } from '~/components/ui/shadcn/button'
import { Input } from '~/components/ui/shadcn/input'
import { NoteMdxEditor } from '~/features/notes/components/note-mdx-editor'
import { useEditNote } from '~/features/notes/hooks/use-edit-note'

export function EditNoteForm() {
  const { isOpen, toggle, isPending, form, handleDelete, note } = useEditNote()

  return (
    <>
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
          <div className="flex gap-x-2">
            <Button
              type="button"
              variant="destructive"
              onClick={toggle}
              disabled={isPending}
              className="cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting || isPending}
                  className="cursor-pointer"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <Pencil />}
                  Update
                </Button>
              )}
            />
          </div>
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

      <AlertDialog
        open={isOpen}
        onOpenChange={toggle}
        title="Delete Note"
        description={`Are you sure you want to delete "${note.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={toggle}
        destructive={true}
      />
    </>
  )
}
