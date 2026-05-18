import { prisma } from "../../../lib/prisma";
import type { OrderCreate, OrderStatusUpdate } from "./order.validation.js";

const createOrder = async (payload: OrderCreate) => {
  const result = await prisma.$transaction(async (tx) => {
    let totalAmount = 0;
    const orderItemsData = [];

    
    // 1. products price and stock check
    for (const item of payload.items) {
      const product = await tx.product.findUnique({
        where: { id: item.productId },
        select: { id: true, price: true, stock: true },
      });

      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product ID ${item.productId}`);
      }

      // total amount
      totalAmount += product.price * item.quantity;

      // OrderItem data ready
      orderItemsData.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price, 
      });

      // ২. product stock decrees
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: product.stock - item.quantity },
      });
    }

    // ৩. order and order item create
    const order = await tx.order.create({
      data: {
        userId: payload.userId,
        totalAmount,
        orderItems: {
          create: orderItemsData,
        },
      },
      select: {
        id: true,
        totalAmount: true,
        status: true,
        createdAt: true,
        orderItems: {
          select: {
            id: true,
            quantity: true,
            price: true,
            product: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return order;
  });

  return result;
};

const getAllOrders = async () => {
  const result = await prisma.order.findMany({
    select: {
      id: true,
      totalAmount: true,
      status: true,
      createdAt: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return result;
};

const getSingleOrder = async (id: string) => {
  const result = await prisma.order.findUnique({
    where: { id },
    select: {
      id: true,
      totalAmount: true,
      status: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      orderItems: {
        select: {
          id: true,
          quantity: true,
          price: true,
          product: {
            select: {
              id: true,
              name: true,
              images: true,
            },
          },
        },
      },
    },
  });

  if (!result) {
    throw new Error("Order not found");
  }

  return result;
};

const updateOrderStatus = async (id: string, payload: OrderStatusUpdate) => {
  const result = await prisma.order.update({
    where: { id },
    data: { status: payload.status },
    select: {
      id: true,
      status: true,
      updatedAt: true,
    },
  });
  return result;
};



export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
};