import { z } from "zod"

export const createReviewSchema = z.object({
    appId: z.number().int().positive(),
    userId: z.number().int().positive(),
    rating: z.number().int().min(1).max(5),
    title: z.string().min(3).max(200).optional(),
    content: z.string().min(10).max(5000),
})

export const updateReviewSchema = z.object({
    rating: z.number().int().min(1).max(5).optional(),
    title: z.string().min(3).max(200).optional(),
    content: z.string().min(10).max(5000).optional(),
})

export const queryParamsSchema = z.object({
    page: z.string().regex(/^\d+$/).transform(Number).optional(),
    limit: z.string().regex(/^\d+$/).transform(Number).optional(),
    category: z.string().optional(),
    sort: z.enum(["rating", "name", "date"]).optional(),
})

export type CreateReviewInput = z.infer<typeof createReviewSchema>
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>
export type QueryParams = z.infer<typeof queryParamsSchema>
