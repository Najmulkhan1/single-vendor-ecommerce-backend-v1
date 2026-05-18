import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import { Authservice } from "./auth.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";


const login = catchAsync(async (req: Request, res: Response) => {
    const result = await Authservice.login(req.body)
    ApiResponse.success(res, "Login successful", result)
})

const register = catchAsync(
    async (req: Request, res: Response) => {
    const result = await Authservice.register(req.body)
    ApiResponse.success(res, "Registration successful", result, 201)
}
)

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
    const result = await Authservice.verifyEmail(req.body)
    ApiResponse.success(res, "Email verified successfully", result)
})


const getAllUseres = catchAsync(async (req: Request, res: Response) => {
    const result = await Authservice.getAllUsers();
    ApiResponse.success(res , "user retrieved successfully", result);
})

export const AuthController = {
    login,
    register,
    getAllUseres,
    verifyEmail
}