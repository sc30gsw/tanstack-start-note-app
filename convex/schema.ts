import { defineSchema, defineTable } from 'convex/server'
import { type Infer, v } from 'convex/values'

const schema = defineSchema({
  notes: defineTable({
    title: v.string(),
    content: v.string(),
  }).index('title', ['title']),
})
export default schema

const note = schema.tables.notes.validator

export const updateNoteSchema = v.object({
  title: v.optional(note.fields.title),
  content: v.optional(note.fields.content),
})

export type Note = Infer<typeof note>