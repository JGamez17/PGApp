import express from "express"
import rateLimit from "express-rate-limit"
import { asyncHandler } from "../middleware/errorHandler"
import { validate, validateQuery } from "../middleware/validate"
import { cache } from "../middleware/cache"
import { createReviewSchema, updateReviewSchema, queryParamsSchema } from "../validators/schemas"
import reviewService from "../services/reviewService"

const router = express.Router()

const reviewLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: "Too many reviews created from this IP, please try again later",
})

router.get(
    "/:appId/reviews",
    validateQuery(queryParamsSchema),
    cache(180),
    asyncHandler(async (req, res) => {
        const appId = Number.parseInt(req.params.appId)
        const { page, limit } = req.query as any

        if (isNaN(appId)) {
            return res.status(400).json({ error: "Invalid app ID" })
        }

        const result = await reviewService.getReviewsByAppId(appId, { page, limit })

        res.json({
            data: result.reviews,
            meta: {
                total: result.total,
                page: result.page,
                totalPages: result.totalPages,
                limit: limit || 10,
            },
        })
    }),
)

router.post(
    "/:appId/reviews",
    reviewLimiter,
    validate(createReviewSchema),
    asyncHandler(async (req, res) => {
        const appId = Number.parseInt(req.params.appId)

        if (isNaN(appId)) {
            return res.status(400).json({ error: "Invalid app ID" })
        }

        const reviewData = {
            ...req.body,
            appId,
        }

        const review = await reviewService.createReview(reviewData)

        res.status(201).json({
            data: review,
            meta: {
                message: "Review created successfully",
            },
        })
    }),
)

router.patch(
    "/reviews/:id",
    validate(updateReviewSchema),
    asyncHandler(async (req, res) => {
        const id = Number.parseInt(req.params.id)
        const userId = req.body.userId

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid review ID" })
        }

        const review = await reviewService.updateReview(id, userId, req.body)

        res.json({
            data: review,
            meta: {
                message: "Review updated successfully",
            },
        })
    }),
)

router.delete(
    "/reviews/:id",
    asyncHandler(async (req, res) => {
        const id = Number.parseInt(req.params.id)
        const userId = Number.parseInt(req.body.userId)

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid review ID" })
        }

        await reviewService.deleteReview(id, userId)

        res.status(204).send()
    }),
)

export default router
