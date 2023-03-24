import { Transaction } from "sequelize";
import * as productsDel from "../dal/productsDel.js";
import { sequelize } from "../models/sequelize.js";
import * as revieweService from "./product_reviewService.js"
//InsertProductOnCategory
export const InsertProductOnCategory = async (
  categoryId: number,
  productId: number,
  t:Transaction
  ): Promise<boolean> => {
    return productsDel.InsertProductOnCategory(categoryId, productId,t);
  };
  
  //CreateProduct
  export const CreateProduct = async (data: any): Promise<boolean> => {
     const result=await sequelize.transaction(async(t:Transaction)=>{
      const product:number= await productsDel.CreateProduct(data,t);
      if(!!product){
        const obj={title:data.title,content:data.content,productId:product,rating:data.rating?data.rating:0}
        await revieweService.CreateProductReview(obj,t)
      }
      if(data.categoryId){
        await productsDel.InsertProductOnCategory(data.categoryId,product,t)
      }
      return true
     })
     return result
  }; 
  //UpdateProductOnCategory
  export const UpdateProductOnCategory = async (data: any,productId:number): Promise<boolean> => {
    return productsDel.UpdateProductOnCategory(data,productId);
  };
  //UpdateProductOnCategory
  export const UpdateProductById = async (data: any,productId:number): Promise<boolean> => {
    const result=await sequelize.transaction(async(t:Transaction)=>{
      await productsDel.UpdateProductById(data,productId,t);
      if(data.categoryId){
        await productsDel.UpdateProductOnCategory(data.categoryId,productId,t)
      }
      return true
    })
    return result
  };
  //DeleteProductById
  export const DeleteProductById = async (productId:number): Promise<boolean> => {
    return productsDel.DeleteProductById(productId);
  };
  //GetProductById
  export const GetProductById = async (productId:number) => {
    return productsDel.GetProductById(productId);
  };
  //GetProductsByTitle
  export const GetProductsByTitle = async (title:string) => {
    return productsDel.GetProductsByTitle(title);
  };