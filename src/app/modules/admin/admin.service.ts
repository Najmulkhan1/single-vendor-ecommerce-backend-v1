import { prisma } from "../../../lib/prisma";
import type { UpdateOrderStatus, UpdateUserRole } from "./admin.validation.js";


const getAllCustomers = async () => {
  const result = await prisma.user.findMany({
    where: {
      userType: "USER",
    },
    select: {
      id: true,
      name: true,
      email: true,
      age: true,
      isVerified: true,
      create_at: true,
   
      _count: {
        select: {
          order: true,
        },
      },
    },
    orderBy: {
      create_at: "desc",
    },
  });

  return result;
};


const getCustomerDetails = async (customerId: string) => {
  const result = await prisma.user.findUnique({
    where: { 
      id: customerId 
    },
    select: {
      id: true,
      name: true,
      email: true,
      age: true,
      isVerified: true,
      userType: true,
      create_at: true,
     
      order: {
        select: {
          id: true,
          totalAmount: true,
          status: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        }
      },
    },
  });

  if (!result) {
    throw new Error("Customer not found");
  }

  return result;
};


const updateUserRole = async (customerId: string, payload: UpdateUserRole) => {
  const existingUser = await prisma.user.findUnique({
    where: { id: customerId },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  const result = await prisma.user.update({
    where: { id: customerId },
    data: {
      userType: payload.userType,
    },
    select: {
      id: true,
      name: true,
      email: true,
      userType: true,
      updated_at: true,
    },
  });

  return result;
};


const updateOrderStatus = async (orderId: string, payload: UpdateOrderStatus) => {
  const existingOrder = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!existingOrder) {
    throw new Error("Order not found");
  }

  const result = await prisma.order.update({
    where: { id: orderId },
    data: {
      status: payload.status,
    },
    select: {
      id: true,
      totalAmount: true,
      status: true,
      updatedAt: true, 
    },
  });

  return result;
};

export const AdminService = {
  getAllCustomers,
  getCustomerDetails,
  updateUserRole,
  updateOrderStatus,
};