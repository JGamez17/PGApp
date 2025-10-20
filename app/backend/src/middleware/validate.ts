import type { Request, Response, NextFunction } from "express"
import type { ZodSchema } from "zod"

export const validate = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body)
            next()
        } catch (error: any) {
            res.status(400).json({
                error: "Validation failed",
                details: error.errors,
            })
        }
    }
}

export const validateQuery = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.query = schema.parse(req.query)
            next()
        } catch (error: any) {
            res.status(400).json({
                error: "Invalid query parameters",
                details: error.errors,
            })
        }
    }
}
