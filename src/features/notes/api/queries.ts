import { convexQuery, useConvexMutation } from '@convex-dev/react-query'
import { api } from 'convex/_generated/api'
import type { Id } from 'convex/_generated/dataModel'

export const notesQuery = {
  list: () => convexQuery(api.notes.getNotes, {}),
  detail: (id: Id<'notes'>) => convexQuery(api.notes.getById, { id }),
} as const

export function useCreateNoteMutation() {
  return useConvexMutation(api.notes.createNote)
}

export function useUpdateNoteMutation() {
  return useConvexMutation(api.notes.updateNote)
}
