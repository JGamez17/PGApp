import type { Request, Response, NextFunction } from "express"

export class AppError extends Error {
    statusCode: number
    isOperational: boolean

    constructor(message: string, statusCode = 500) {
        super(message)
        this.statusCode = statusCode
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }
}

export const errorHandler = (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: err.message,
            status: err.statusCode,
            path: req.path,
        })
    }

    console.error("💥 UNEXPECTED ERROR:", err)

    res.status(500).json({
        error: "Internal server error",
        status: 500,
        path: req.path,
    })
}

export const asyncHandler = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
}
