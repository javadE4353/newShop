
import * as categorysdel  from "../dal/categorysDel.js"
import { PaginationData } from "../dal/dataSort/pagination.js"
import { CategoryInput, UpdateDataInput } from "../models/bo/Category.js"

//createNewCategory
export const createNewCategory=(data:CategoryInput):Promise<boolean>=>{
    return categorysdel.createNewCategory(data)
}

//GetByTilteCategory
export const GetByTilteCategory=(title:string)=>{
    return categorysdel.GetByTilte(title)
}

//GetByIdCategory
export const GetByIdCategory=(id:number)=>{
    return categorysdel.GetById(id)
}
//GetByIdCategory
export const GetALLCategorys=(title:string,content:string,limit:number,offset:number):Promise<PaginationData|boolean>=>{
    return categorysdel.GetALLCategorys(title,content,limit,offset)
}

//UpdateByIdCategory
export const UpdateByIdCategory=(data:UpdateDataInput,id:number):Promise<boolean>=>{
    return categorysdel.UpdateById(data,id)
}

//DeleteByIdCategory
export const DeleteByIdCategory=(id:number):Promise<boolean>=>{
    return categorysdel.DeleteById(id)
}