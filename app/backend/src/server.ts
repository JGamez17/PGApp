import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import compression from "compression"
import dotenv from "dotenv"
import appRoutes from "./routes/appRoutes"
import reviewRoutes from "./routes/reviewRoutes"
import { errorHandler } from "./middleware/errorHandler"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(helmet())
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        credentials: true,
    }),
)

app.use(compression())
app.use(morgan("combined"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || "development",
    })
})

app.use("/api/v1/apps", appRoutes)
app.use("/api/v1/apps", reviewRoutes)

app.use((req, res) => {
    res.status(404).json({
        error: "Route not found",
        path: req.path,
        method: req.method,
    })
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
    console.log(`📡 Environment: ${process.env.NODE_ENV || "development"}`)
    console.log(`🔗 Health check: http://localhost:${PORT}/health`)
    console.log(`📚 API Base: http://localhost:${PORT}/api/v1`)
})

export default app
