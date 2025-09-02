import { createFileRoute, Link } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'
import { Suspense } from 'react'
import Loader from '~/components/ui/loader'
import { Button } from '~/components/ui/shadcn/button'
import { NoteList } from '~/features/notes/components/note-list'

export const Route = createFileRoute('/notes/')({
  component: NotesPage,
})

function NotesPage() {
  return (
    <div className="grid h-dvh grid-rows-[min-content_1fr]">
      <div className="flex items-center justify-between border-b-2 p-2">
        <h1>Notes</h1>
        <Link to="/notes/new">
          <Button size={'sm'}>
            <PlusIcon />
            Add Note
          </Button>
        </Link>
      </div>
      <div className="p-2">
        <Suspense fallback={<Loader />}>
          <NoteList />
        </Suspense>
      </div>
    </div>
  )
}
