import express from "express"
import { asyncHandler } from "../middleware/errorHandler"
import { cache } from "../middleware/cache"
import { validateQuery } from "../middleware/validate"
import { queryParamsSchema } from "../validators/schemas"
import appService from "../services/appService"

const router = express.Router()

router.get(
    "/",
    validateQuery(queryParamsSchema),
    cache(300),
    asyncHandler(async (req, res) => {
        const { page, limit, category, sort } = req.query as any

        const result = await appService.getAllApps({
            page,
            limit,
            category,
            sort,
        })

        res.json({
            data: result.apps,
            meta: {
                total: result.total,
                page: result.page,
                totalPages: result.totalPages,
                limit: limit || 10,
            },
        })
    }),
)

router.get(
    "/search",
    cache(300),
    asyncHandler(async (req, res) => {
        const { q } = req.query

        if (!q || typeof q !== "string") {
            return res.status(400).json({ error: 'Query parameter "q" is required' })
        }

        const apps = await appService.searchApps(q)

        res.json({
            data: apps,
            meta: {
                query: q,
                count: apps.length,
            },
        })
    }),
)

router.get(
    "/:id",
    cache(300),
    asyncHandler(async (req, res) => {
        const id = Number.parseInt(req.params.id)

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid app ID" })
        }

        const app = await appService.getAppById(id)

        res.json({
            data: app,
            meta: {
                timestamp: new Date().toISOString(),
            },
        })
    }),
)

export default router
