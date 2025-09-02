import { convexQuery } from '@convex-dev/react-query'
import { useForm } from '@tanstack/react-form'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { api } from 'convex/_generated/api'
import type { Id } from 'convex/_generated/dataModel'
import { useTransition } from 'react'
import { useToggle } from 'react-use'
import {
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} from '~/features/notes/hooks/use-note-mutations'
import { noteSchema } from '~/features/notes/types/schemas/note-schema'
import { Route } from '~/routes/notes/$id'

export function useEditNote() {
  const { id } = Route.useParams()
  const { data: note } = useSuspenseQuery(convexQuery(api.notes.getById, { id: id as Id<'notes'> }))
  const updateNoteMutation = useUpdateNoteMutation()
  const deleteNoteMutation = useDeleteNoteMutation()
  const router = useRouter()

  const [isOpen, toggle] = useToggle(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm({
    defaultValues: {
      title: note.title,
      content: note.content,
    },
    validators: {
      onChange: noteSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await updateNoteMutation({
          id: id as Id<'notes'>,
          title: value.title,
          content: value.content,
        })

        router.invalidate()
      } catch (error) {
        console.error('Failed to update note:', error)
      }
    },
  })

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteNoteMutation({ id: id as Id<'notes'> })

        router.navigate({ to: '/notes' })
      } catch (error) {
        console.error('Failed to delete note:', error)
      }
    })
  }

  return {
    isOpen,
    toggle,
    isPending,
    form,
    handleDelete,
    note,
  } as const
}
