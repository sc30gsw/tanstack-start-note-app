import { useConvexMutation } from '@convex-dev/react-query'
import { api } from 'convex/_generated/api'

export function useCreateNoteMutation() {
  return useConvexMutation(api.notes.createNote)
}

export function useUpdateNoteMutation() {
  return useConvexMutation(api.notes.updateNote)
}

export function useDeleteNoteMutation() {
  return useConvexMutation(api.notes.deleteNote)
}
