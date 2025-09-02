import { convexQuery } from '@convex-dev/react-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { api } from 'convex/_generated/api'

export function NoteList() {
  const { data: notes } = useSuspenseQuery(convexQuery(api.notes.getNotes, {}))

  return notes.map((note) => (
    <Link
      key={note.id}
      to="/notes/$id"
      params={{ id: note.id }}
      className="transition-all duration-300 hover:text-blue-500"
    >
      <p>{note.title}</p>
    </Link>
  ))
}
