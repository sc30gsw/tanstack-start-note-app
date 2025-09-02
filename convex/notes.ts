import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getNotes = query({
  args: {},
  handler: async (ctx) => {
    const notes = await ctx.db.query('notes').order('desc').collect()

    return notes.map((note) => ({
      ...note,
      id: note._id,
      createdAt: note._creationTime,
    }))
  },
})

export const getById = query({
  args: { id: v.id('notes') },
  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.id)

    if (!note) {
      throw new Error('Note not found')
    }

    return {
      ...note,
      id: note._id,
      createdAt: note._creationTime,
    }
  },
})

export const createNote = mutation({
  args: {
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const noteId = await ctx.db.insert('notes', {
      title: args.title,
      content: args.content,
    })
    return noteId
  },
})

export const updateNote = mutation({
  args: {
    id: v.id('notes'),
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      title: args.title,
      content: args.content,
    })
  },
})