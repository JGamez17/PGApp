import { createClient } from "redis"

let redisClient: any = null
let isConnected = false

async function initRedis() {
  try {
    redisClient = createClient({
      socket: {
        host: process.env.REDIS_HOST || "localhost",
        port: parseInt(process.env.REDIS_PORT || "6379"),
        connectTimeout: 2000,
      },
    })

    redisClient.on("error", (err: any) => {
      console.warn("⚠️  Redis not available - caching disabled")
      isConnected = false
    })

    redisClient.on("connect", () => {
      console.log("✅ Redis connected successfully")
      isConnected = true
    })

    await redisClient.connect()
    isConnected = true
  } catch (error) {
    console.warn("⚠️  Redis not available - continuing without cache")
    isConnected = false
  }
}

// Initialize but don't block
initRedis()

// Safe Redis client that works even when Redis is down
export default {
  get: async (key: string): Promise<string | null> => {
    if (!isConnected || !redisClient) return null
    try {
      return await redisClient.get(key)
    } catch {
      return null
    }
  },
  
  setEx: async (key: string, seconds: number, value: string): Promise<void> => {
    if (!isConnected || !redisClient) return
    try {
      await redisClient.setEx(key, seconds, value)
    } catch {
      // Fail silently
    }
  },
  
  keys: async (pattern: string): Promise<string[]> => {
    if (!isConnected || !redisClient) return []
    try {
      return await redisClient.keys(pattern)
    } catch {
      return []
    }
  },
  
  del: async (keys: string[]): Promise<void> => {
    if (!isConnected || !redisClient) return
    try {
      await redisClient.del(keys)
    } catch {
      // Fail silently
    }
  },
}
