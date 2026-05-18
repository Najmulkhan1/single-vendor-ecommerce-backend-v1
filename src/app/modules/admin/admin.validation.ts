import { z } from "zod";

export const updateUserRoleSchema = z.object({
  userType: z.enum(["USER", "ADMIN"], {
    message: "Valid user role (USER or ADMIN) is required",
  }),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"] as const, {
    message: "Status is required and must be a valid option",
  }),
});

export type UpdateUserRole = z.infer<typeof updateUserRoleSchema>;
export type UpdateOrderStatus = z.infer<typeof updateOrderStatusSchema>;