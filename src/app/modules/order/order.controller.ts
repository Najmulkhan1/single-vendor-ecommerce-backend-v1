
import type { Request, Response } from "express";
import { OrderService } from "./order.service.js";

const createOrder = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.createOrder(req.body);
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.getAllOrders();
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await OrderService.getSingleOrder(id as string);
    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await OrderService.updateOrderStatus(id as string, req.body);
    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
};