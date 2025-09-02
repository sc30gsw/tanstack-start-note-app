import { z } from 'zod/v4'

export const noteSchema = z.object({
  title: z
    .string({
      error: (iss) => (iss.input === undefined ? 'Title is required' : 'Title must be a string'),
    })
    .min(1, { error: 'Title must be between 1 and 128 characters long' })
    .max(128, { error: 'Title must be between 1 and 128 characters long' }),
  content: z
    .string({
      error: (iss) =>
        iss.input === undefined ? 'Content is required' : 'Content must be a string',
    })
    .min(1, { error: 'Content must be at least 1 character long' }),
})
