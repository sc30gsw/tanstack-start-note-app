import { createFileRoute } from '@tanstack/react-router'
import '@mdxeditor/editor/style.css'
import { Suspense } from 'react'
import Loader from '~/components/ui/loader'
import { EditNoteForm } from '~/features/notes/components/edit-note-form'

export const Route = createFileRoute('/notes/$id')({
  component: NoteIdPage,
})

function NoteIdPage() {
  return (
    <div className="grid h-dvh grid-rows-[min-content_1fr] gap-2 p-2">
      <Suspense fallback={<Loader />}>
        <EditNoteForm />
      </Suspense>
    </div>
  )
}
