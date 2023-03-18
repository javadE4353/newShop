import { Router } from "express";
import { validate } from "./validate.js";
import * as controller from "../../controllers/categoryController.js";
import { uploadesProductImagesGallery } from "../../middlewares/multiFile-uploades-disk.js";
import { ConfigUploadeMutiFiles } from "../../middlewares/configUplodeMultiFiles.js";
const categoryRouter = Router();

categoryRouter.post(
  "/",
  uploadesProductImagesGallery,
  validate.create(),
  ConfigUploadeMutiFiles,
  controller.CreateNewCategory
);
categoryRouter.get("/all-categorys", validate.GetALLCategorys(), controller.GetALLCategorys);
categoryRouter.get("/:categoryId", validate.getById(), controller.GetByIdCategory);
categoryRouter.get("/", controller.GetByTilteCategory);
categoryRouter.put(
  "/:categoryId",
  uploadesProductImagesGallery,
  validate.update(),
  ConfigUploadeMutiFiles,
  controller.UpdateByIdCategory
);
categoryRouter.delete("/:categoryId", validate.delete(), controller.DeleteByIdCategory);

export default categoryRouter;
