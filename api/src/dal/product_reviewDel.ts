import { Transaction } from "sequelize";
import { Product_review } from "../models/index.js"

//CreateProductReview
export const CreateProductReview=async(data:any,t:Transaction)=>{
    const create=await Product_review.create(data,{transaction:t})
    return create?true:false;
}
//UpdateProductReview
export const UpdateProductReview=async(data:any,productId:number)=>{
    const update=await Product_review.update(data,{where:{productId}})
    return !!update[0]?true:false;
}
//DeleteProductReview
export const DeleteProductReview=async(productId:number)=>{
    const remove=await Product_review.destroy({where:{productId}})
    return !!remove?true:false;
}