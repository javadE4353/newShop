import express from "express";
import * as userController from "../../controllers/UserController.js";
import { ConfigUploadeFile } from "../../middlewares/configUplodeSingleFile.js";
import { verifyRole } from "../../middlewares/verifyRole.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { allowRoles } from "../../util/role.js";
import { validate } from "./validate.js";
const userRoute = express.Router();

userRoute.post(
  "/",
  verifyToken,
  verifyRole([allowRoles.admin]),
  validate.create(),
  ConfigUploadeFile,
  userController.create
);
userRoute.put(
  "/:userId",
  verifyToken,
  verifyRole([allowRoles.admin]),
  validate.update(),
  ConfigUploadeFile,
  userController.updateUser
);
userRoute.get(
  "/logout/:userId",
  verifyToken,
  verifyRole([allowRoles.admin]),
  validate.LogOutUser(),
  userController.LogOutUser
);
userRoute.get(
  "/:userId",
  verifyToken,
  verifyRole([allowRoles.admin, allowRoles.edite]),
  validate.getByIdUser(),
  userController.getByIdUser
);
userRoute.get(
  "/",
  verifyToken,
  verifyRole([allowRoles.admin, allowRoles.edite]),
  validate.pagintionUsers(),
  userController.getUser
);
userRoute.delete(
  "/multiusers",
  verifyToken,
  verifyRole([allowRoles.admin]),
  validate.removeMultipleUsers(),
  userController.removeMultipleUsers
);
userRoute.delete(
  "/:userId",
  verifyToken,
  verifyRole([allowRoles.admin]),
  validate.deleteByIdUser(),
  userController.removeUser
);

export default userRoute;
