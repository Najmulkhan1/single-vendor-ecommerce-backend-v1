import type { NextFunction, Request, Response } from "express"
import type { ErrorResponse } from "../../types/index.js"
import env from "../../config/env.js"


export const globalError = (err: any, _req: Request, res: Response, next: NextFunction) => {
     const statusCode = err.statusCode || 500
     const message = err.message || "something went wrong"

     const errResponse: ErrorResponse =  {
          success: false,
          message: message
     }

     if(env.NODE_ENV === "development"){
          errResponse.stack = err.stack
          errResponse.error = err
     }

     res.status(statusCode).json(errResponse)
}

