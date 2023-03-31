import { Transaction } from "sequelize";
import * as categorysdel from "../dal/categorysDel.js";
import { PaginationData } from "../dal/dataSort/pagination.js";
import { RemoveImage } from "../helper/removeImage.js";
import { CategoryInput, UpdateDataInput } from "../models/bo/Category.js";
import { sequelize } from "../models/sequelize.js";

//createNewCategory
export const createNewCategory = async (data: CategoryInput): Promise<boolean> => {
  const result: boolean = await sequelize.transaction(async (t: Transaction) => {
    const cat: boolean = await categorysdel.createNewCategory(data, t);
    if (cat === false) {
      if (data.image) {
        RemoveImage(data.image);
      }
      throw new Error("Request Filed");
    }
    return true;
  });
  return result;
};

//UpdateByIdCategory
export const UpdateByIdCategory = async (data: UpdateDataInput, id: number): Promise<boolean> => {
  const result: boolean = await sequelize.transaction(async (t: Transaction) => {
    const product = await categorysdel.GetById(id, t);
    const update: boolean = await categorysdel.UpdateById(data, id, t);
    if (update === false || product === false) {
      if (data.image) {
        RemoveImage(data.image);
      }
      throw new Error("Request Filed");
    }
    if (product.image) {
      RemoveImage(product.image);
    }
    return true;
  });
  return result;
};

//DeleteByIdCategory
export const DeleteByIdCategory = async (id: number): Promise<boolean> => {
  const result: boolean = await sequelize.transaction(async (t: Transaction) => {
    const category = await categorysdel.GetById(id, t);
    const remove: boolean = await categorysdel.DeleteById(id, t);
    if (remove === false || category === false) {
      throw new Error("Request Filed");
    }
    if (category.image) {
      RemoveImage(category.image);
    }
    return true;
  });
  return result;
};

//GetByTilteCategory
export const GetByTilteCategory = (title: string) => {
  return categorysdel.GetByTilte(title);
};

//GetByIdCategory
export const GetByIdCategory = (id: number) => {
  return categorysdel.GetById(id);
};
//GetByIdCategory
export const GetALLCategorys = (
  title: string,
  content: string,
  limit: number,
  offset: number
): Promise<PaginationData | boolean> => {
  return categorysdel.GetALLCategorys(title, content, limit, offset);
};
