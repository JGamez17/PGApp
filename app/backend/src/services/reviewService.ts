import pool from "../config/database"
import { AppError } from "../middleware/errorHandler"
import type { CreateReviewInput, UpdateReviewInput } from "../validators/schemas"
import { clearCache } from "../middleware/cache"

export interface Review {
    id: number
    appId: number
    user: {
        id: number
        username: string
    }
    rating: number
    title?: string
    content: string
    status: string
    helpfulCount: number
    createdAt: Date
    updatedAt: Date
}

class ReviewService {
    async createReview(data: CreateReviewInput): Promise<Review> {
        const client = await pool.connect()

        try {
            await client.query("BEGIN")

            const appCheck = await client.query("SELECT id FROM apps WHERE id = $1", [data.appId])
            if (appCheck.rows.length === 0) {
                throw new AppError("App not found", 404)
            }

            const userCheck = await client.query("SELECT id, username FROM users WHERE id = $1", [data.userId])
            if (userCheck.rows.length === 0) {
                throw new AppError("User not found", 404)
            }

            const result = await client.query(
                `INSERT INTO reviews (app_id, user_id, rating, title, content, status)
         VALUES ($1, $2, $3, $4, $5, 'approved')
         RETURNING *`,
                [data.appId, data.userId, data.rating, data.title, data.content],
            )

            await client.query("COMMIT")

            await clearCache(`cache:/api/v1/apps/${data.appId}/reviews*`)
            await clearCache(`cache:/api/v1/apps/${data.appId}`)

            const review = result.rows[0]

            return {
                id: review.id,
                appId: review.app_id,
                user: {
                    id: userCheck.rows[0].id,
                    username: userCheck.rows[0].username,
                },
                rating: review.rating,
                title: review.title,
                content: review.content,
                status: review.status,
                helpfulCount: review.helpful_count,
                createdAt: review.created_at,
                updatedAt: review.updated_at,
            }
        } catch (error) {
            await client.query("ROLLBACK")
            throw error
        } finally {
            client.release()
        }
    }

    async getReviewsByAppId(
        appId: number,
        options: { page?: number; limit?: number },
    ): Promise<{ reviews: Review[]; total: number; page: number; totalPages: number }> {
        const page = options.page || 1
        const limit = Math.min(options.limit || 10, 50)
        const offset = (page - 1) * limit

        const client = await pool.connect()

        try {
            const result = await client.query(
                `SELECT r.*, u.username
         FROM reviews r
         JOIN users u ON r.user_id = u.id
         WHERE r.app_id = $1 AND r.status = 'approved'
         ORDER BY r.created_at DESC
         LIMIT $2 OFFSET $3`,
                [appId, limit, offset],
            )

            const countResult = await client.query("SELECT COUNT(*) FROM reviews WHERE app_id = $1 AND status = $2", [
                appId,
                "approved",
            ])

            const total = Number.parseInt(countResult.rows[0].count)

            const reviews = result.rows.map((row) => ({
                id: row.id,
                appId: row.app_id,
                user: {
                    id: row.user_id,
                    username: row.username,
                },
                rating: row.rating,
                title: row.title,
                content: row.content,
                status: row.status,
                helpfulCount: row.helpful_count,
                createdAt: row.created_at,
                updatedAt: row.updated_at,
            }))

            return {
                reviews,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            }
        } finally {
            client.release()
        }
    }

    async updateReview(id: number, userId: number, data: UpdateReviewInput): Promise<Review> {
        const client = await pool.connect()

        try {
            const checkResult = await client.query("SELECT * FROM reviews WHERE id = $1 AND user_id = $2", [id, userId])

            if (checkResult.rows.length === 0) {
                throw new AppError("Review not found or unauthorized", 404)
            }

            const updateFields: string[] = []
            const updateValues: any[] = []
            let paramIndex = 1

            if (data.rating !== undefined) {
                updateFields.push(`rating = $${paramIndex}`)
                updateValues.push(data.rating)
                paramIndex++
            }

            if (data.title !== undefined) {
                updateFields.push(`title = $${paramIndex}`)
                updateValues.push(data.title)
                paramIndex++
            }

            if (data.content !== undefined) {
                updateFields.push(`content = $${paramIndex}`)
                updateValues.push(data.content)
                paramIndex++
            }

            if (updateFields.length === 0) {
                throw new AppError("No fields to update", 400)
            }

            updateValues.push(id, userId)

            const result = await client.query(
                `UPDATE reviews
         SET ${updateFields.join(", ")}
         WHERE id = $${paramIndex} AND user_id = $${paramIndex + 1}
         RETURNING *`,
                updateValues,
            )

            const userResult = await client.query("SELECT username FROM users WHERE id = $1", [userId])

            await clearCache(`cache:/api/v1/apps/${result.rows[0].app_id}/reviews*`)
            await clearCache(`cache:/api/v1/apps/${result.rows[0].app_id}`)

            const review = result.rows[0]

            return {
                id: review.id,
                appId: review.app_id,
                user: {
                    id: userId,
                    username: userResult.rows[0].username,
                },
                rating: review.rating,
                title: review.title,
                content: review.content,
                status: review.status,
                helpfulCount: review.helpful_count,
                createdAt: review.created_at,
                updatedAt: review.updated_at,
            }
        } finally {
            client.release()
        }
    }

    async deleteReview(id: number, userId: number): Promise<void> {
        const client = await pool.connect()

        try {
            const result = await client.query("DELETE FROM reviews WHERE id = $1 AND user_id = $2 RETURNING app_id", [
                id,
                userId,
            ])

            if (result.rows.length === 0) {
                throw new AppError("Review not found or unauthorized", 404)
            }

            await clearCache(`cache:/api/v1/apps/${result.rows[0].app_id}/reviews*`)
            await clearCache(`cache:/api/v1/apps/${result.rows[0].app_id}`)
        } finally {
            client.release()
        }
    }
}

export default new ReviewService()
