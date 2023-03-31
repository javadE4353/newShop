import { Transaction } from "sequelize";
import { paginationData } from "../dal/dataSort/pagination.js";
import * as productsDel from "../dal/productsDel.js";
import { RemoveImage } from "../helper/removeImage.js";
import { sequelize } from "../models/sequelize.js";
import * as revieweService from "./product_reviewService.js"
//InsertProductOnCategory
export const InsertProductOnCategory = async (categoryId: number,productId: number,): Promise<boolean> => {
  const result:boolean=await sequelize.transaction(async(t:Transaction)=>{
    const tableJoin:boolean=await productsDel.InsertProductOnCategory(categoryId, productId,t);
    if(tableJoin){
      throw new Error("Request Filed")
    }
    return true
  })
  return result; 
  };
  
  //CreateProduct
  export const CreateProduct = async (data: any): Promise<boolean> => {
     const result=await sequelize.transaction(async(t:Transaction)=>{
      const product:number= await productsDel.CreateProduct(data,t);
      if(!!product){
        const review:boolean=await revieweService.CreateProductReview(data,product,t)
        if(review ===false){
          if(data.images){
            RemoveImage(JSON.parse(`${data.images}`));
           }
          throw new Error("Request Filed")
       }
      }
      if(data.categoryId && !!product){
        const tableJoin:boolean=await productsDel.InsertProductOnCategory(data.categoryId,product,t);
        if(tableJoin ===false){
          if(data.images){
            RemoveImage(JSON.parse(`${data.images}`));
           }
           throw new Error("Request Filed")
        }
      }
      return true
     })
     return result
  }; 
  //UpdateProductOnCategory
  export const UpdateProductOnCategory = async (data: any,productId:number): Promise<boolean> => {
    const result:boolean=await sequelize.transaction(async(t:Transaction)=>{
      const update:boolean=await productsDel.UpdateProductOnCategory(data,productId,t);
      if(update){
        throw new Error("Request Filed")
      }
      return true
    })
    return result
  };
  //UpdateProductById
  export const UpdateProductById = async (data: any,productId:number): Promise<boolean> => {
    const result=await sequelize.transaction(async(t:Transaction)=>{
      const pro= await productsDel.GetProductById(productId,t) 
      const ArrayImage:string[]=[]   
      if(data.images && pro){
        const imgA:string[]=JSON.parse(`${data.images}`)
        if(pro.images){
          imgA?.map((m:string,index:number)=>{
            if(pro.images[index]){
              ArrayImage.push(pro.images[index])
            }
            pro.images[index]=m
          })
          data.images=JSON.stringify(pro.images)
        }
      }
      const update:boolean=await productsDel.UpdateProductById(data,productId,t);
      if(update === false && pro === false){
        if(data.images){
          RemoveImage(JSON.parse(`${data.images}`));
         }
        throw new Error("Request Fild")
      }
      if(data.categoryId && update){
        const tableJoin:boolean=await productsDel.UpdateProductOnCategory(data.categoryId,productId,t)
        if(tableJoin === false){
          if(data.images){
            RemoveImage(JSON.parse(`${data.images}`));
           }
          throw new Error("Request Fild")
        }
      }
      if(data.title | data.content | data.rating){
        const review:boolean=await revieweService.UpdateProductReview(data,productId,t)
        if(review===false){
          if(data.images){
            RemoveImage(JSON.parse(`${data.images}`));
           }
          throw new Error("Request Filed")
       }
      }
      if(ArrayImage.length>0){
        RemoveImage(ArrayImage)
      }
      return true
    })
    return result
  };
  //GetProductById
  export const GetProductById = async (productId:number) => {
    return productsDel.GetProductById(productId);
  };
  //GetProductsByTitle
  export const GetProductsByTitle = async (title: string | undefined,offset:number,limit:number) => {
      const pro=await productsDel.GetProductsByTitle(title,offset,limit);
      if(pro===false){
        return pro
      }
     const products = pro.rows.map((p) => {
          p.images = JSON.parse(`${p.images}`);
          return p;
      });
      paginationData(products,pro.count,limit,offset)
   return paginationData(products,pro.count,limit,offset)
  };
 //DeleteProductById
  export const DeleteProductById = async (productId:number): Promise<boolean> => {
      const result:boolean=await sequelize.transaction(async(t:Transaction)=>{
        const pro=await productsDel.GetProductById(productId,t)
        const remove=await productsDel.DeleteProductById(productId,t);
        if(pro===false){
          throw new Error("Request Filed")    
        }
        if(remove===false){
            throw new Error("Request Filed")    
        }
        if(pro.images.length>0){
          RemoveImage(pro.images);
        }
        return true
      })
      return result
  };