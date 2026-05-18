import { prisma } from "../../../lib/prisma"
import type { CustomerUpdate } from "./customer.validation"



const getMyProfile = async (id: string) => {
    const result = await prisma.user.findUnique({
        where: {id},
        select: {
            id: true,
            name: true,
            email: true,
            age: true,
            isVerified: true,
            userType: true,
            create_at: true
        }
    })

    if(!result){
        throw new Error('user not found')
    }

    return result
}



const updateMyProfile = async (userId: string, payload: CustomerUpdate) => {
    const existingUser = await prisma.user.findUnique({
        where:{id: userId}
    })

    if(!existingUser){
        throw new Error ("user not found")
    }

    const result = await prisma.user.update({
        where: {id: userId},
        data: payload,
        select: {
            id: true,
            name: true,
            email: true,
            age:true,
            updated_at: true
        }
    })

    return result
}

const cancelMyOrder = async (orderId: string, userId: string) => {

  const order = await prisma.order.findUnique({
    where: { 
      id: orderId 
    },
    select: { 
      id: true, 
      userId: true, 
      status: true,
      orderItems: {
        select: {
          productId: true,
          quantity: true
        }
      }
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  
  if (order.userId !== userId) {
    throw new Error("You are not authorized to cancel this order");
  }

  
  if (order.status !== "PENDING") {
    throw new Error("You cannot cancel this order because it has already been approved.");
  }

  
  const result = await prisma.$transaction(async (tx) => {
    
   
    for (const item of order.orderItems) {
      await tx.product.update({
        where: { id: item.productId },
        data: { 
          stock: { increment: item.quantity } 
        },
      });
    }

   
    const cancelledOrder = await tx.order.update({
      where: { id: orderId },
      data: { 
        status: "CANCELLED" 
      },
      select: {
        id: true,
        status: true,
        updatedAt: true, 
      },
    });

    return cancelledOrder;
  });

  return result;
};

export const CustomerService = {
    getMyProfile,
    updateMyProfile,
    cancelMyOrder

}