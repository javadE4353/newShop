import Products, { ProductInput, UpdateProduct } from "../models/bo/Product.js";
import Product_category from "../models/bo/product_category.js";
import _ from "lodash";
import { Op, Transaction } from "sequelize";
import Categorys from "../models/bo/Category.js";
import User from "../models/bo/User.js";
import { RemoveImage } from "../helper/removeImage.js";
import { Product_review } from "../models/index.js";

//InsertProductOnCategory
export const InsertProductOnCategory = async (
  categoryId: number,
  productId: number,
  t:Transaction

): Promise<boolean> => {
  const cat= await Categorys.findByPk(categoryId,{transaction:t});
  if(!cat){
     throw new Error("error")
  }
  const insertProOnCate = await Product_category.create({ categoryId, productId },{transaction:t});
  if (!insertProOnCate) {
    throw new Error("error")
  } else {
    return true;
  }
};
//UpdateProductOnCategory
export const UpdateProductOnCategory = async (
  categoryId: number,
  productId: number,
  t?:Transaction
): Promise<boolean> => {
  const updateProOnCate = await Product_category.findOne({where: { productId },transaction:t});
  if (!updateProOnCate) {
    throw new Error("error")
  } else {
    updateProOnCate.set({
      categoryId,
      productId,
    });
    await updateProOnCate.save();
    return true;
  }
};
//
export const CreateProduct = async (data: ProductInput,t:Transaction): Promise<number> => {
  const dataPro = _.omit(data, ["categoryId"]);
  const product = await Products.create({ ...dataPro, userId: Number(data.userId) },{transaction:t});
  return product?product.id:0
};

// GetProductByTitel
export const GetProductsByTitle = async (productTitle: string) => {
  const pro = await Products.findAll({
    where: { title: { [Op.substring]: productTitle } },
    include: [
      {
        model: Categorys,
        through: { attributes: [] },
      },
      {
        model: User,
      },
      {
        model: Product_review,
      },
    ],
  });
  if (!pro) {
    return false;
  } else {
    const newpro = pro.map((p) => {
      p.images = JSON.parse(`${p.images}`);
      return p;
    });
    return newpro;
  }
};

//GetProductById
export const GetProductById = async (productId: number) => {
  const pro = await Products.findOne({
    where: { id: productId },
    include: [
      {
        model: Categorys,
        through: { attributes: [] },
      },
        {
          model: User,
        },
    ],
  });
 return pro?pro:false
};
//UpdateProduct
export const UpdateProductById = async (data: UpdateProduct, productId: number,  t:Transaction) => {
  const dataPro = _.omit(data, ["categoryId"]);
  const update = await Products.update(dataPro, { where: { id: productId },transaction:t });
  if(!!update[0] ){
   return true
  }else{
   throw new Error("error")
  }
};
//DeleteProductById
export const DeleteProductById = async (productId: number) => {
  const pro = await Products.findByPk(productId);
  const remove = await Products.destroy({ where: { id: productId } });
  if (!!remove && pro) {
    const images: string[] = JSON.parse(`${pro.images}`);
    RemoveImage(images);
    return true;
  } else {
    return false;
  }
};

//Obtaining products based on the ID of the creator or
