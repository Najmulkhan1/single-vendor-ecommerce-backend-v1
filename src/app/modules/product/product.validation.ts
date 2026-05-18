import { z } from "zod";


export const createProductSchema = z.object({
  name: z.string({
    message: "Product name is required",
  }).min(2, "Name must be at least 2 characters long"),
  
  description: z.string().optional(),
  
  price: z.number({
    message: "Price is required",
  }).positive("Price must be a positive number"),
  
  stock: z.number({
    message: "Stock is required",
  }).int().nonnegative("Stock cannot be negative"),
  
  images: z.array(z.string().url("Invalid image URL")).optional(),
  
  isFeature: z.boolean().optional(),
  
  categoryId: z.string({
    message: "Category ID is required",
  }), 
});


export const updateProductSchema = createProductSchema.partial();


export type ProductCreate = z.infer<typeof createProductSchema>;
export type ProductUpdate = z.infer<typeof updateProductSchema>;