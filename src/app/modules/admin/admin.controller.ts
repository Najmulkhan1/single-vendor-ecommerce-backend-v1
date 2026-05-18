
import type { Request, Response } from "express";
import { AdminService } from "./admin.service.js";

const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.getAllCustomers();
    
    res.status(200).json({
      success: true,
      message: "All customers fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCustomerDetails = async (req: Request, res: Response) => {
  try {
    const customerId = req.params.id;
    const result = await AdminService.getCustomerDetails(customerId as string);
    
    res.status(200).json({
      success: true,
      message: "Customer details fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const updateUserRole = async (req: Request, res: Response) => {
  try {
    const customerId = req.params.id;
    const result = await AdminService.updateUserRole(customerId as string, req.body);
    
    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id; 
    const result = await AdminService.updateOrderStatus(orderId as string, req.body);
    
    res.status(200).json({
      success: true,
      message: `Order status updated to ${result.status} successfully`,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const AdminController = {
  getAllCustomers,
  getCustomerDetails,
  updateUserRole,
  updateOrderStatus,
};