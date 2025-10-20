import pool from "../config/database"
import { AppError } from "../middleware/errorHandler"

export interface App {
    id: number
    name: string
    developer: {
        id: number
        name: string
    }
    description: string
    category: string
    ageRating: string
    iconUrl: string
    ratings: {
        appStore?: number
        googlePlay?: number
        playguard?: number
    }
    features: string[]
    createdAt: Date
    updatedAt: Date
}

class AppService {
    async getAppById(id: number): Promise<App> {
        const client = await pool.connect()

        try {
            const appResult = await client.query(
                `SELECT a.*, d.name as developer_name, d.id as developer_id
         FROM apps a
         JOIN developers d ON a.developer_id = d.id
         WHERE a.id = $1`,
                [id],
            )

            if (appResult.rows.length === 0) {
                throw new AppError("App not found", 404)
            }

            const app = appResult.rows[0]

            const ratingsResult = await client.query("SELECT platform, rating FROM ratings WHERE app_id = $1", [id])

            const ratings: any = {}
            ratingsResult.rows.forEach((row) => {
                const platform = row.platform.replace("_", "")
                ratings[platform === "appstore" ? "appStore" : platform === "googleplay" ? "googlePlay" : row.platform] =
                    Number.parseFloat(row.rating)
            })

            const featuresResult = await client.query("SELECT feature_name FROM app_features WHERE app_id = $1", [id])

            const features = featuresResult.rows.map((row) => row.feature_name)

            return {
                id: app.id,
                name: app.name,
                developer: {
                    id: app.developer_id,
                    name: app.developer_name,
                },
                description: app.description,
                category: app.category,
                ageRating: app.age_rating,
                iconUrl: app.icon_url,
                ratings,
                features,
                createdAt: app.created_at,
                updatedAt: app.updated_at,
            }
        } finally {
            client.release()
        }
    }

    async getAllApps(options: {
        page?: number
        limit?: number
        category?: string
        sort?: string
    }): Promise<{ apps: App[]; total: number; page: number; totalPages: number }> {
        const page = options.page || 1
        const limit = Math.min(options.limit || 10, 50)
        const offset = (page - 1) * limit

        let query = `
      SELECT a.*, d.name as developer_name, d.id as developer_id
      FROM apps a
      JOIN developers d ON a.developer_id = d.id
    `

        const queryParams: any[] = []
        let paramIndex = 1

        if (options.category) {
            query += ` WHERE a.category = $${paramIndex}`
            queryParams.push(options.category)
            paramIndex++
        }

        switch (options.sort) {
            case "name":
                query += " ORDER BY a.name ASC"
                break
            case "date":
                query += " ORDER BY a.created_at DESC"
                break
            default:
                query += " ORDER BY a.id ASC"
        }

        query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`
        queryParams.push(limit, offset)

        const client = await pool.connect()

        try {
            const result = await client.query(query, queryParams)

            let countQuery = "SELECT COUNT(*) FROM apps"
            const countParams: any[] = []

            if (options.category) {
                countQuery += " WHERE category = $1"
                countParams.push(options.category)
            }

            const countResult = await client.query(countQuery, countParams)
            const total = Number.parseInt(countResult.rows[0].count)

            const apps = await Promise.all(
                result.rows.map(async (app) => {
                    const ratingsResult = await client.query("SELECT platform, rating FROM ratings WHERE app_id = $1", [app.id])

                    const ratings: any = {}
                    ratingsResult.rows.forEach((row) => {
                        const platform = row.platform.replace("_", "")
                        ratings[platform === "appstore" ? "appStore" : platform === "googleplay" ? "googlePlay" : row.platform] =
                            Number.parseFloat(row.rating)
                    })

                    const featuresResult = await client.query("SELECT feature_name FROM app_features WHERE app_id = $1", [app.id])

                    const features = featuresResult.rows.map((row) => row.feature_name)

                    return {
                        id: app.id,
                        name: app.name,
                        developer: {
                            id: app.developer_id,
                            name: app.developer_name,
                        },
                        description: app.description,
                        category: app.category,
                        ageRating: app.age_rating,
                        iconUrl: app.icon_url,
                        ratings,
                        features,
                        createdAt: app.created_at,
                        updatedAt: app.updated_at,
                    }
                }),
            )

            return {
                apps,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            }
        } finally {
            client.release()
        }
    }

    async searchApps(query: string): Promise<App[]> {
        const client = await pool.connect()

        try {
            const result = await client.query(
                `SELECT a.*, d.name as developer_name, d.id as developer_id
         FROM apps a
         JOIN developers d ON a.developer_id = d.id
         WHERE a.name ILIKE $1 OR a.description ILIKE $1
         LIMIT 10`,
                [`%${query}%`],
            )

            const apps = await Promise.all(
                result.rows.map(async (app) => {
                    const ratingsResult = await client.query("SELECT platform, rating FROM ratings WHERE app_id = $1", [app.id])

                    const ratings: any = {}
                    ratingsResult.rows.forEach((row) => {
                        const platform = row.platform.replace("_", "")
                        ratings[platform === "appstore" ? "appStore" : platform === "googleplay" ? "googlePlay" : row.platform] =
                            Number.parseFloat(row.rating)
                    })

                    const featuresResult = await client.query("SELECT feature_name FROM app_features WHERE app_id = $1", [app.id])

                    const features = featuresResult.rows.map((row) => row.feature_name)

                    return {
                        id: app.id,
                        name: app.name,
                        developer: {
                            id: app.developer_id,
                            name: app.developer_name,
                        },
                        description: app.description,
                        category: app.category,
                        ageRating: app.age_rating,
                        iconUrl: app.icon_url,
                        ratings,
                        features,
                        createdAt: app.created_at,
                        updatedAt: app.updated_at,
                    }
                }),
            )

            return apps
        } finally {
            client.release()
        }
    }
}

export default new AppService()
