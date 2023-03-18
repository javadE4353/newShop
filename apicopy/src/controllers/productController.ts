import { Request, Response } from "express";
import { response } from "../helper/customResponse.js";
import * as productsService from "../service/productsService.js";

export const createProduct = async (req: Request, res: Response) => {
    console.log(req.body)
  try {
    const newpro = await productsService.CreateProduct(req.body);
    response({
      res,
      message: " ",
      code: 201,
      data: newpro,
    });
  } catch (error) {
    response({
      res,
      message: " ",
      code: 500,
      data: error,
    });
  }
};
export const insertProductOnCategory = async (req: Request, res: Response) => {
    const categoryId=Number(req.query.categoryId);
    const productId=Number(req.query.productId);
  try {
    const newpro = await productsService.InsertProductOnCategory(categoryId,productId);
    response({
      res,
      message: " ",
      code: 200,
      data: newpro,
    });
  } catch (error) {
    response({
      res,
      message: " ",
      code: 500,
      data: error,
    });
  }
};
export const getProductById = async (req: Request, res: Response) => {
    const productId=Number(req.params.productId);
  try {
    const newpro = await productsService.GetProductById(productId);
    response({
      res,
      message: " ",
      code: 200,
      data: newpro,
    });
  } catch (error) {
    response({
      res,
      message: " ",
      code: 500,
      data: error,
    });
  }
};
export const getProductsByTitle = async (req: Request, res: Response) => {
    const title=req.query.title as string
  
    const newpro = await productsService.GetProductsByTitle(title);
    if(newpro !==false){
     response({
       res,
       message: " ",
       code: 200,
       data: newpro,
     });
   }else{
     response({
       res,
       message: " ",
       code: 500,
     });
   }
  
};
export const UpdateProductOnCategory = async (req: Request, res: Response) => {
  const productId=Number(req.params.productId);
  try {
    const newpro = await productsService.UpdateProductOnCategory(req.body,productId);
    response({
      res,
      message: " ",
      code: 200,
      data: newpro,
    });
  } catch (error) {
    response({
      res,
      message: " ",
      code: 500,
      data: error,
    });
  }
};
