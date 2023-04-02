import { Request, Response } from "express";
//
import { validationResult } from "express-validator";
import _ from "lodash";
//
import messageResponse from "../util/messageResponse.json" assert{type:"json"};
import * as cartService from "../service/cartService.js";
import { response } from "../helper/customResponse.js";
import { CartItemsInput } from "../models/bo/CartItems.js";
import { CartInput } from "../models/bo/Cart.js";

//createCart
export const createCart = async (req: Request, res: Response) => {
  const cart = _.omit(req.body, "cartItems") as CartInput;
  const cartItems: CartItemsInput[] = req.body.cartItems;
  const error = validationResult(req);
  if (!!error.array().length) {
    response({
      res,
      message: messageResponse.cart[400],
      code: 400,
      data: error.array(),
    });
    return;
  }

  const result: boolean = await cartService.CreateCart(cart, cartItems);
  if (result) {
    response({
      res,
      message: messageResponse.cart[201],
      code: 201,
    });
  }
};
//AddItemInCart
export const AddItemInCart = async (req: Request, res: Response) => {
  const tokenCart= req.query.tokenCart as string;
  const productId= Number(req.query.productId )as number;
  const error = validationResult(req);
  if (!!error.array().length) {
    response({
      res,
      message: messageResponse.cart[400],
      code: 400,
      data: error.array(),
    });
    return;
  }

  const result: boolean = await cartService.AddToCartItem(req.body, tokenCart,productId);
  if (result) {
    response({
      res,
      message: messageResponse.cart[201],
      code: 201,
    });
  }
};
//UpdateQuantity
export const UpdateQuantity = async (req: Request, res: Response) => {
  const tokenCart= req.query.tokenCart as string;
  const productId= Number(req.query.productId )as number;
  const quantity= Number(req.query.quantity )as number;
  const error = validationResult(req);
  if (!!error.array().length) {
    response({
      res,
      message: messageResponse.cart[400],
      code: 400,
      data: error.array(),
    });
    return;
  }

  const result: boolean = await cartService.UpdateQuantity(quantity, tokenCart,productId);
  if (result) {
    response({
      res,
      message: messageResponse.cart[200],
      code: 200,
    });
  }
};
//GetCartByToken
export const GetCartByToken = async (req: Request, res: Response) => {
  const tokenCart= req.query.tokenCart as string;
  const error = validationResult(req);
  if (!!error.array().length) {
    response({
      res,
      message: messageResponse.cart[400],
      code: 400,
      data: error.array(),
    });
    return;
  }

  const result = await cartService.GetCartByToken(tokenCart);
  if (typeof result !=="boolean") {
    response({
      res,
      message: messageResponse.cart[200],
      code: 200,
      data:result
    });
  }else{
    response({
        res,
        message: messageResponse.cart[500],
        code: 500,
      });
  }
};
//GetCartByUserId
export const GetCartByUserId = async (req: Request, res: Response) => {
  const userId= Number(req.query.userId) as number;
  const error = validationResult(req);
  if (!!error.array().length) {
    response({
      res,
      message: messageResponse.cart[400],
      code: 400,
      data: error.array(),
    });
    return;
  }

  const result = await cartService.GetCartByUserId(userId);
  if (typeof result !=="boolean") {
    response({
      res,
      message: messageResponse.cart[200],
      code: 200,
      data:result
    });
  }else{
    response({
        res,
        message: messageResponse.cart[500],
        code: 500,
      });
  }
};
//GetAllCart
export const GetAllCart = async (req: Request, res: Response) => {
    const tokenCart= req.query.tokenCart as string;
  const userId= Number(req.query.userId) as number;
  const error = validationResult(req);
  if (!!error.array().length) {
    response({
      res,
      message: messageResponse.cart[400],
      code: 400,
      data: error.array(),
    });
    return;
  }

  const result = await cartService.GetAllCart(tokenCart,userId);
  if (typeof result !=="boolean") {
    response({
      res,
      message: messageResponse.cart[200],
      code: 200,
      data:result
    });
  }else{
    response({
        res,
        message: messageResponse.cart[500],
        code: 500,
      });
  }
};
//RemoveItemCart
export const RemoveItemCart = async (req: Request, res: Response) => {
    const tokenCart= req.query.tokenCart as string;
  const userId= Number(req.query.userId) as number;
  const error = validationResult(req);
  if (!!error.array().length) {
    response({
      res,
      message: messageResponse.cart[400],
      code: 400,
      data: error.array(),
    });
    return;
  }

  const result:boolean = await cartService.RemoveItemCart(tokenCart,userId);
  if (result) {
    response({
      res,
      message: messageResponse.cart[200],
      code: 200,
      data:result
    });
  }
};
//DeleteCartByToken
export const DeleteCartByToken = async (req: Request, res: Response) => {
    const tokenCart= req.query.tokenCart as string;
  const error = validationResult(req);
  if (!!error.array().length) {
    response({
      res,
      message: messageResponse.cart[400],
      code: 400,
      data: error.array(),
    });
    return;
  }

  const result:boolean = await cartService.DeleteCartByToken(tokenCart);
  if (result) {
    response({
      res,
      message: messageResponse.cart[200],
      code: 200,
      data:result
    });
  }
};
