import { z } from "zod";

export const postSchema = z.object({
    id: z.number(),
    name: z.string(),
    createdAt: z.date()
})
export type Post = z.infer<typeof postSchema>

export const getByIdSchema = z.object({
    id: z.number()
})
export type GetByIdInput = z.infer<typeof getByIdSchema>

export const createSchema = z.object({
    name: z.string().min(1)
})
export type CreateInput = z.infer<typeof createSchema>