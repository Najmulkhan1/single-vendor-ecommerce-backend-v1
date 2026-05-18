import type { Request, Response } from "express";
import { ProductService } from "./product.service.js";
import catchAsync from "../../utils/catchAsync.js";

const createProduct = catchAsync(
    async (req: Request, res: Response) => {
    const result = await ProductService.createProduct(req.body);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: result,
    });}
) 

const getAllProducts = catchAsync(
    async (req: Request, res: Response) => {

    const result = await ProductService.getAllProducts();
    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: result,
    });
  } 
) 

const getSingleProduct = catchAsync(
    async (req: Request, res: Response) => {
  const { id } = req.params;
    const result = await ProductService.getSingleProduct(id as string);
    res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      data: result,
    });
}
) 

const updateProduct = catchAsync(
    async (req: Request, res: Response) => {
 const { id } = req.params;
    const result = await ProductService.updateProduct(id as string, req.body);
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: result,
    });
}
) 

const deleteProduct = catchAsync(
    async (req: Request, res: Response) => {
  const { id } = req.params;
    await ProductService.deleteProduct(id as string);
    res.status(200).json({
      success: true,
      message: "Product deleted (archived) successfully",
      data: null,
    });
}
) 

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
};