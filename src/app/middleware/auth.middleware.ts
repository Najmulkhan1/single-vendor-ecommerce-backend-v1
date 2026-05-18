
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
 
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "You are not authorized" });
    }


    const token = authHeader.split(" ")[1];

   
    const secret = process.env.JWT_ACCESS_SECRET as string;
    const decodedData = jwt.verify(token as string, secret);


    (req as any).user = decodedData;

    
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};