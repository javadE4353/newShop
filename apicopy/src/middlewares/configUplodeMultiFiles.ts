import { Request, Response } from "express";
// import _ from "lodash"
export const ConfigUploadeMutiFiles=(req:Request,res:Response)=>{
  const filenames = req.files! as Array<Express.Multer.File>
  const file_names = filenames.map(file => file.filename)
  
           console.log(file_names)
            console.log(res.charset)
}