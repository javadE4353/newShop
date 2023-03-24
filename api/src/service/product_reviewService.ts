import { Transaction } from "sequelize"
import * as productReview from "../dal/product_reviewDel.js"

//CreateProductReview
export const CreateProductReview=async(data:any,t:Transaction)=>{
    const create= await productReview.CreateProductReview(data,t)
    if(create===false){
     throw new Error("error")
    }
    return create
}
//UpdateProductReview
export const UpdateProductReview=(data:any,productId:number)=>{
    const update= productReview.UpdateProductReview(data,productId)
    return update
}
//DeleteProductReview
export const DeleteProductReview=(productId:number)=>{
    const remove= productReview.DeleteProductReview(productId)
    return remove
}