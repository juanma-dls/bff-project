import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/errors/customError";
import { categoriesService } from "../services/categoriesService";
import { productByCategoryService } from "../services/productsByCategoryService";
import { deleteProductByIdService } from "../services/deleteProductByIdService";
import { Products } from "../interface/productInterface";


export const deleteProductsByCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await categoriesService();
    
    const categoryParam = req.params.category;

    const validCategory = categories.includes(categoryParam);
    if (!validCategory) {
      throw new CustomError("Category is not valid", 400);
    }

    const { products } = await productByCategoryService(categoryParam);

    const deleteResults = await Promise.allSettled(
      products.map((product: Products) => deleteProductByIdService(product.id))
    );

    const deleteCount = deleteResults.filter(result => result.status === "fulfilled").length;

    deleteResults.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(`Error deleting product ${products[index].id}:`, result.reason.message || result.reason);
      }
    });

    return res.status(200).json({
      result: "ok",
      items_delete: deleteCount
    });
  } catch (error) {
    next(error);
  }
};
