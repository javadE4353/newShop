import * as productsDel from "../dal/productsDel.js";

//InsertProductOnCategory
export const InsertProductOnCategory = async (
  categoryId: number,
  productId: number
  ): Promise<boolean> => {
    return productsDel.InsertProductOnCategory(categoryId, productId);
  };
  
  //CreateProduct
  export const CreateProduct = async (data: any): Promise<boolean> => {
    return productsDel.CreateProduct(data);
  };
  //UpdateProductOnCategory
  export const UpdateProductOnCategory = async (data: any,productId:number): Promise<boolean> => {
    return productsDel.UpdateProductOnCategory(data,productId);
  };
  //DeleteProductById
  export const DeleteProductById = async (productId:number): Promise<boolean> => {
    return productsDel.DeleteProductById(productId);
  };
  //GetProductById
  export const GetProductById = async (productId:number) => {
    return productsDel.GetProductById(productId);
  };
  //GetProductsByTitle
  export const GetProductsByTitle = async (title:string) => {
    return productsDel.GetProductsByTitle(title);
  };