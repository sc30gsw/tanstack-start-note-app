import { createFileRoute } from '@tanstack/react-router'
import { CreateNoteForm } from '~/features/notes/components/create-note-form'

export const Route = createFileRoute('/notes/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="grid h-dvh grid-rows-[min-content_1fr] gap-2 p-2">
      <CreateNoteForm />
    </div>
  )
}
