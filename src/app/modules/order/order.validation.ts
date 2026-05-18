import { z } from "zod";

const orderItemSchema = z.object({
  productId: z.string({ message: "Product ID is required" }).min(1, "Product ID cannot be empty"),
  quantity: z.number().int().positive("Quantity must be at least 1"),
});

export const createOrderSchema = z.object({
  userId: z.string({ message: "User ID is required" }).min(1, "User ID cannot be empty"),
  items: z.array(orderItemSchema).min(1, "Order must contain at least one item"),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"] as const, {
    message: "Status is required and must be a valid option",
  }),
});

export type OrderCreate = z.infer<typeof createOrderSchema>;
export type OrderStatusUpdate = z.infer<typeof updateOrderStatusSchema>;