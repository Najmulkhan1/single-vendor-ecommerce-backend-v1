import { prisma } from "../../../lib/prisma";
import type { ProductCreate, ProductUpdate } from "./product.validation.js";


const generateSlug = (name: string) => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

const createProduct = async (payload: ProductCreate) => {
  let generatedSlug = generateSlug(payload.name);
  
  const existingProduct = await prisma.product.findUnique({
    where: { 
      slug: generatedSlug 
    },
  });

  if (existingProduct) {
    generatedSlug = `${generatedSlug}-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  const result = await prisma.product.create({
    data: {
      ...payload,
      description: payload.description ?? "",
      images: payload.images ?? [],
      isFeature: payload.isFeature ?? false,
      slug: generatedSlug,
    },
    
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      stock: true,
      images: true,
      isFeature: true,
      categoryId: true,
      
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      createdAt: true,
    },
  });

  return result;
};

const getAllProducts = async () => {
 
  const result = await prisma.product.findMany({
    where: {
      isArchived: false, 
    },
    
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      stock: true,
      images: true,
      isFeature: true,
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  return result;
};

const getSingleProduct = async (id: string) => {
  const result = await prisma.product.findUnique({
    where: { 
      id: id,
    },
    
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      price: true,
      stock: true,
      images: true,
      isFeature: true,
      isArchived: true,
      categoryId: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!result) {
    throw new Error("Product not found");
  }

  return result;
};

const updateProduct = async (id: string, payload: ProductUpdate) => {
  const existingProduct = await prisma.product.findUnique({
    where: { 
      id: id, 
    },
  });

  if (!existingProduct) {
    throw new Error("Product not found");
  }

  
  const cleanPayload = Object.fromEntries(
    Object.entries(payload).filter(([_, v]) => v !== undefined)
  );

  const result = await prisma.product.update({
    where: { 
      id: id, 
    },
    data: {
      ...cleanPayload,
      ...(payload.name ? { slug: generateSlug(payload.name) } : {})
    },
   
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      stock: true,
      updatedAt: true,
    },
  });

  return result;
};

const deleteProduct = async (id: string) => {
  const existingProduct = await prisma.product.findUnique({
    where: { 
      id: id, 
    },
  });

  if (!existingProduct) {
    throw new Error("Product not found");
  }

  const result = await prisma.product.update({
    where: { 
      id: id, 
    },
    data: { 
      isArchived: true, 
    },
    
    select: {
      id: true,
      isArchived: true,
    },
  });

  return result;
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};