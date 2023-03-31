import * as cartDel from "../dal/cartDel.js";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../models/sequelize.js";
import { Transaction } from "sequelize";
import _ from "lodash";
import { CartInput } from "../models/bo/Cart.js";
import { CartItemsInput } from "../models/bo/CartItems.js";
import * as cartItemsService from "./cartItemsService.js";

export const CreateCart = async (dataCart: CartInput, dataCartItems: CartItemsInput[]) => {

  //token
  dataCart.token = uuidv4();
  //createCart
  const result:boolean = await sequelize.transaction(async (t: Transaction) => {
    const cartCreate: number = await cartDel.CreateCart(dataCart, t);
    if (!!cartCreate === false) {
      throw new Error("Request Filed");
    }
    const cartItemsCreate = await cartItemsService.CreateCartItems(dataCartItems,cartCreate, t);
    if (cartItemsCreate === false) {
      throw new Error("Request Filed");
    }
    return true
  });
  return result;
};

//AddToCartItem
export const AddToCartItem=async(data:CartItemsInput,token:string,productId:number):Promise<boolean>=>{
  const result=await sequelize.transaction(async(t:Transaction)=>{
    const cart=await cartDel.GetCartByToken(token,t)
    if(cart===false){
    throw new Error("Request Filed")
    }
    
    const items=await cartItemsService.AddItemsInCartByCartId(data,cart.toJSON().id,productId,t)
    if(items===false){
      throw new Error("Request Filed")
      }
      return true
  })
  return result
}

//GetCartByToken
export const GetCartByToken=async(token:string)=>{
  const cart=await cartDel.GetCartByToken(token)
  if(cart ===false){
    return false
  }else{
    return cart
  }

}

//GetCartByUserId
export const GetCartByUserId=async(userId:number)=>{
  const cart=await cartDel.GetCartByUserId(userId)
  if(cart ===false){
    return false
  }else{
    return cart
  }
}

//GetAllCart
export const GetAllCart=async(status:string,userId:number)=>{
  const cart=await cartDel.GetAllCart(status,userId)
  if(cart ===false){
    return false
  }else{
    return cart
  }
}


//UpdateQuantity
export const UpdateQuantity=async(quantity:number,token:string,productId:number):Promise<boolean>=>{
  const result=await sequelize.transaction(async(t:Transaction)=>{
    const cart=await cartDel.GetCartByToken(token,t)
    if(cart===false){
    throw new Error("Request Filed")
    }
    
    const items=await cartItemsService.updateQuantityByCartIdAndProductId(quantity,cart.toJSON().id,productId,t)
    if(items===false){
      throw new Error("Request Filed")
      }
      return true
  })
  return result
}

//RemoveItemCart
export const RemoveItemCart=async(token:string,productId:number):Promise<boolean>=>{
  const result=await sequelize.transaction(async(t:Transaction)=>{
    const cart=await cartDel.GetCartByToken(token,t)
    if(cart===false){
    throw new Error("Request Filed")
    }
    
    const items=await cartItemsService.RemoveCartItemsByCartIdAndProductID(cart.toJSON().id,productId,t)
    if(items===false){
      throw new Error("Request Filed")
      }
      return true
  })
  return result
}

//DeleteCartByToken
export const DeleteCartByToken=async(token:string):Promise<boolean>=>{
  const result=await sequelize.transaction(async(t:Transaction)=>{

    const cart=await cartDel.GetCartByToken(token,t)
    if(cart===false){
    throw new Error("Request Filed")
    }

  const removeCart=await cartDel.DeleteCart(token,t)
   if(removeCart===false){
   throw new Error("Request Filed")
   }
   const removeCartItems=await cartItemsService.RemoveAllItems(cart.toJSON().id,t)  
   if(removeCartItems===false){
    throw new Error("Request Filed")
    } 
    return true  
  })
  return result
}
