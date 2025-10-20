import type { Request, Response, NextFunction } from "express"
import redisClient from "../config/redis"

export const cache = (duration = 300) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (req.method !== "GET") {
            return next()
        }

        const key = `cache:${req.originalUrl}`

        try {
            const cachedData = await redisClient.get(key)

            if (cachedData) {
                console.log(`✅ Cache HIT for ${key}`)
                return res.json(JSON.parse(cachedData))
            }

            console.log(`❌ Cache MISS for ${key}`)

            const originalJson = res.json.bind(res)

            res.json = (body: any) => {
                redisClient.setEx(key, duration, JSON.stringify(body)).catch(console.error)
                return originalJson(body)
            }

            next()
        } catch (error) {
            console.error("Cache error:", error)
            next()
        }
    }
}

export const clearCache = async (pattern: string) => {
    try {
        const keys = await redisClient.keys(pattern)
        if (keys.length > 0) {
            await redisClient.del(keys)
            console.log(`🗑️  Cleared ${keys.length} cache entries`)
        }
    } catch (error) {
        console.error("Error clearing cache:", error)
    }
}
