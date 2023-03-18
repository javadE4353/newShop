import { Request, Response } from "express";

import {v4 as uuidv4}from "uuid"
import { validationResult } from "express-validator";
import messageResponse from "../util/messageResponse.json" assert{type:"json"}
//
import { response } from "../helper/customResponse.js";
import * as productsService from "../service/productsService.js";
import { RemoveImage } from "../helper/removeImage.js";

//createProduct
export const createProduct = async (req: Request, res: Response) => {

    const sku=uuidv4();
    const type=uuidv4();
    //
    const error=validationResult(req)
    if(!!error.array().length){
      response({
        res,
        message:messageResponse.products[401],
        code:401,
       data:error.array()
      })
      if(req.body.images){
        RemoveImage(JSON.parse(`${req.body.images}`));
      }
      return
    }
    req.body.sku=sku
    req.body.type=type    
    const newpro = await productsService.CreateProduct(req.body);
    if(newpro ===false){
      response({
        res,
        message: messageResponse.products[500],
        code: 500,
      });
    }else{
      response({
        res,
        message: messageResponse.products[201],
        code: 201,
        data: newpro,
      });
    }
};
//insertProductOnCategory
export const insertProductOnCategory = async (req: Request, res: Response) => {
    const categoryId=Number(req.query.categoryId);
    const productId=Number(req.query.productId);
    const error=validationResult(req)
    if(!!error.array().length){
      response({
        res,
        message:messageResponse.products[401],
        code:401,
       data:error.array()
      })
      return
    }
    const newpro = await productsService.InsertProductOnCategory(categoryId,productId);
  if(newpro) {
    response({
      res,
      message: messageResponse.products[200],
      code: 200,
      data: newpro,
    });
  } else {
    response({
      res,
      message:messageResponse.products[500],
      code: 500,
    });
  }
};

//GetProductById
export const getProductById = async (req: Request, res: Response) => {
    const productId=Number(req.params.productId);
    const error=validationResult(req)
    if(!!error.array().length){
      response({
        res,
        message:messageResponse.products[401],
        code:401,
       data:error.array()
      })
      return
    }
    const newpro = await productsService.GetProductById(productId);
  if(typeof newpro === "boolean") {
    response({
      res,
      message: messageResponse.products[200],
      code: 200,
      data: newpro,
    });
  } else{
    response({
      res,
      message:messageResponse.products[500], 
      code: 500,
    });
  }
};

//GetProductsByTitle
export const getProductsByTitle = async (req: Request, res: Response) => {
    const title=req.query.title as string
    const error=validationResult(req)
    if(!!error.array().length){
      response({
        res,
        message:messageResponse.products[401],
        code:401,
       data:error.array()
      })
      return
    }
    const newpro = await productsService.GetProductsByTitle(title);
    if(newpro !==false){
     response({
       res,
       message: messageResponse.products[200],
       code: 200,
       data: newpro,
     });
   }else{
     response({
       res,
       message: messageResponse.products[500],
       code: 500,
     });
   }
  
};

//UpdateProductOnCategory
export const UpdateProductOnCategory = async (req: Request, res: Response) => {
  const productId=Number(req.params.productId);
  const error=validationResult(req)
  if(!!error.array().length){
    response({
      res,
      message:messageResponse.products[401],
      code:401,
     data:error.array()
    })
    if(req.body.images){
      RemoveImage(JSON.parse(`${req.body.images}`));
    }
    return
  }
  const newpro = await productsService.UpdateProductOnCategory(req.body,productId);
  if(newpro) {
    response({
      res,
      message: messageResponse.products[200],
      code: 200,
      data: newpro,
    });
  } else{
    response({
      res,
      message: messageResponse.products[500],
      code: 500,
    });
  }
};
//UpdateProductById
export const UpdateProductById = async (req: Request, res: Response) => {
  const productId=Number(req.params.productId);
  const error=validationResult(req)
  if(!!error.array().length){
    response({
      res,
      message:messageResponse.products[401],
      code:401,
     data:error.array()
    })
    if(req.body.images){
      RemoveImage(JSON.parse(`${req.body.images}`));
    }
    return
  }
  const newpro = await productsService.UpdateProductById(req.body,productId);
  if(newpro) {
    response({
      res,
      message: messageResponse.products[200],
      code: 200,
      data: newpro,
    });
  } else{
    response({
      res,
      message: messageResponse.products[500],
      code: 500,
    });
  }
};

//DeleteProductById
export const DeleteProductById = async (req: Request, res: Response) => {
  const productId=Number(req.params.productId);
  const error=validationResult(req)
  if(!!error.array().length){
    response({
      res,
      message:messageResponse.products[401],
      code:401,
     data:error.array()
    })
    return
  }
  const newpro = await productsService.DeleteProductById(productId);
  if(newpro) {
    response({
      res,
      message: messageResponse.products[200],
      code: 200,
      data: newpro,
    });
  } else{
    response({
      res,
      message: messageResponse.products[500],
      code: 500,
    });
  }
};
