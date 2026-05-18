import type { NextFunction, Request, Response } from "express";


const notFound =  (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        massage: "api not found",
        error: {
            path: req.originalUrl,
            message: "The api you are looking for is not found"
        }
    })
}

export default notFound;