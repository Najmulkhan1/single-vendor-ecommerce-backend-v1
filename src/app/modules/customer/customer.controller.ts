import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { CustomerService } from "./customer.service";




const getMyProfile = catchAsync(async (req: Request, res:Response) => {
    const userId = (req as any).user.userId
    const result = await CustomerService.getMyProfile(userId)

    res.status(200).json({
        success: true,
        message: "Your profile fetched successfully",
        data: result
    })
})


const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.userId
    const result = await CustomerService.updateMyProfile(userId,  req.body)

    res.status(200).json({
        success: true,
        message: "Your profile updated successfully",
        data: result
    })
})


const cancelMyOrder = catchAsync(
    async (req: Request, res: Response) => {
  const orderId = req.params.id; 
    const userId = (req as any).user.userId; 

    const result = await CustomerService.cancelMyOrder(orderId as string, userId);
    
    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: result,
    });
}
)


export const CustomerController = {
    getMyProfile,
    updateMyProfile,
    cancelMyOrder
}