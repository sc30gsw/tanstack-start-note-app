import { CreateNoteForm } from '~/features/notes/components/create-note-form'
import { EditNoteForm } from '~/features/notes/components/edit-note-form'

export function NoteFormContainer({ id }: Partial<Record<'id', string>>) {
  return id ? <EditNoteForm id={id} /> : <CreateNoteForm />
}
