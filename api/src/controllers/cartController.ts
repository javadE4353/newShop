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
