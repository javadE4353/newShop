import { Op, Transaction } from "sequelize";
import  Categorys, { CategoryInput, UpdateDataInput }  from "../models/bo/Category.js";
import  Products  from "../models/bo/Product.js";
import Product_category from "../models/bo/product_category.js";
import { conditionGetAllCategory } from "./dataSort/helperCategoryDel.js";
import { PaginationData, paginationData } from "./dataSort/pagination.js";

//Create
export const createNewCategory = async (data: CategoryInput,t:Transaction):Promise<boolean> => {
  const create = await Categorys.create({...data},{transaction:t});
  return create?true:false
};

//UpdateById
export const UpdateById=async(data:UpdateDataInput,categoryId:number,t:Transaction):Promise<boolean>=>{
  const update=await Categorys.update({...data},{where:{id:categoryId},transaction:t})
  return !!update[0]?true:false
}
//DeleteById
export const DeleteById=async(categoryId:number,t:Transaction):Promise<boolean>=>{
  const cate=await Product_category.findAll({where:{categoryId},transaction:t})
  const remove=await Categorys.destroy({where:{id:categoryId}})
  if(cate?.length>0 && !!remove){
    const removeTableJoin=await Product_category.destroy({where:{categoryId},transaction:t})
    return !!removeTableJoin?true:false
  }
  return !!remove?true:false
}
//GetById
export const GetById=async(categoryId:number,t?:Transaction)=>{
  const category=await Categorys.findByPk(categoryId,{transaction:t})
  return category?category:false
}
//GetALLCategorys
export const GetALLCategorys=async(categoryName:string,content:string,limit:number,offset:number):Promise<PaginationData|boolean>=>{
  const category=await Categorys.findAndCountAll({where:conditionGetAllCategory(categoryName,content,Op),
  include:[{model:Products,through:{attributes:[]}}],offset,limit})
  if(!!category?.rows?.length===false){
    return false
  }else{
    return paginationData(category.rows,category.count,limit,offset)
  }
}

//GetByTitle
export const GetByTilte = async (title: string)=> {
  const categorys = await Categorys.findAll({
    attributes: ["id", "title", "metatitle","image"],
    where: { title:{[Op.substring]:title }},
    include: [
      {
        model: Products,
        attributes: [
          "id",
          "title",
          "price",
          "quantity",
          "discount",
          "sku",
          "shop",
          "type",
          "summery",
          "metatitle",
          "slug",
          "content",
        ],
        through: { attributes: [] },
      },
    ],
  });
  return categorys;
};
