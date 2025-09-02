import { createFileRoute, Link } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'
import { Button } from '~/components/ui/shadcn/button'

export const Route = createFileRoute('/notes/')({
  component: NotesPage,
})

const notes = [
  { title: 'Note 1', id: crypto.randomUUID() },
  { title: 'Note 2', id: crypto.randomUUID() },
  { title: 'Note 3', id: crypto.randomUUID() },
  { title: 'Note 4', id: crypto.randomUUID() },
  { title: 'Note 5', id: crypto.randomUUID() },
  { title: 'Note 6', id: crypto.randomUUID() },
  { title: 'Note 7', id: crypto.randomUUID() },
  { title: 'Note 8', id: crypto.randomUUID() },
  { title: 'Note 9', id: crypto.randomUUID() },
  { title: 'Note 10', id: crypto.randomUUID() },
] as const satisfies readonly Record<string, string>[]

function NotesPage() {
  return (
    <div className="grid h-dvh grid-rows-[min-content_1fr]">
      <div className="flex items-center justify-between border-b-2 p-2">
        <h1>Notes</h1>
        <Button size={'sm'}>
          <PlusIcon />
          Add Note
        </Button>
      </div>
      <div className="p-2">
        {notes.map((note) => (
          <Link
            key={note.id}
            to="/notes/$id"
            params={{ id: note.id }}
            className="transition-all duration-300 hover:text-blue-500"
          >
            <p>{note.title}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
