import Products, { ProductInput, UpdateProduct } from "../models/bo/Product.js";
import Product_category from "../models/bo/product_category.js";
import _ from "lodash";
import { Op } from "sequelize";
import Categorys from "../models/bo/Category.js";
import User from "../models/bo/User.js";
import { RemoveImage } from "../helper/removeImage.js";

//InsertProductOnCategory
export const InsertProductOnCategory = async (
  categoryId: number,
  productId: number
): Promise<boolean> => {
  const insertProOnCate = await Product_category.create({ categoryId, productId });
  if (!insertProOnCate) {
    return false;
  } else {
    return true;
  }
};
//UpdateProductOnCategory
export const UpdateProductOnCategory = async (
  categoryId: number,
  productId: number
): Promise<boolean> => {
  const updateProOnCate = await Product_category.findOne({where: { productId }});
  if (!updateProOnCate) {
    return false;
  } else {
    updateProOnCate.set({
      categoryId,
      productId,
    });
    await updateProOnCate.save();
    return true;
  }
};

export const CreateProduct = async (data: ProductInput): Promise<boolean> => {
  const dataPro = _.omit(data, ["categoryId"]);
  const product = await Products.create({ ...dataPro, userId: Number(data.userId) });
  if (data.categoryId && product) {
    const cat= await Categorys.findByPk(data.categoryId);
    if(!cat){
       return false
    }
    const tableJoin: boolean = await InsertProductOnCategory(data.categoryId, product.id);
    return tableJoin ? true : false;
  } else if (!product) {
    return false;
  } else {
    return true;
  }
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
  const pro = await Products.findAll({
    where: { id: productId },
    include: [
      {
        model: Categorys,
        through: { attributes: [] },
      },
      //   {
      //     model: User,
      //   },
    ],
  });

  if (!pro) {
    return false;
  } else {
    return pro;
  }
};
//UpdateProduct
export const UpdateProductById = async (data: UpdateProduct, productId: number) => {
  const dataPro = _.omit(data, ["categoryId"]);
  const update = await Products.update(dataPro, { where: { id: productId } });
  if (data?.categoryId && update[0]) {
    const tableJoin = await UpdateProductOnCategory(data.categoryId, productId);
    return tableJoin;
  }
  return !!update[0] ? true : false;
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
