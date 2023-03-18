import { Op } from "sequelize";
import { paginationData } from "./dataSort/pagination.js";
import { RemoveImage } from "../helper/removeImage.js";
import { sequelize } from "../models/sequelize.js";
import Permission from "../models/bo/Premission.js";
import Products from "../models/bo/Product.js";
import Role from "../models/bo/Role.js";
import Token from "../models/bo/Token.js";
import User, { RoleUsers, UpdateUser, UserAttributesOutput, UserInput } from "../models/bo/User.js";

//createUsers
export const create = async (payload: UserInput) => {
  const create = await User.create(payload);
  if (!!create.toJSON()?.id === false) {
    return false;
  } else {
    return true;
  }
};
//getallusers
export const getAllUsers = async (
  offset: number,
  limit: number,
  condition: string | null,
  role: string | null
): Promise<UserAttributesOutput | boolean> => {
  const users = await User.findAll({
    attributes: ["id", "firstname", "lastname", "mobile", "email", "username", "image", "active"],
    where: condition ? { username: { [Op.like]: `%${condition}%` } } : undefined,
    include: [
      {
        model: Role,
        attributes: ["name"],
        where: role ? { name: { [Op.like]: `%${role}%` } } : undefined,
        include: [
          {
            model: Permission,
            attributes: ["bits"],
            through: { attributes: [] },
          },
        ],
      },
    ],
    offset,
    limit,
  });
  const count = await User.count();
  if (!!count === false) {
    return false;
  } else {
    const result = users.map((item: any): RoleUsers => {
      const permission = item.role.permissons
        .map((P: any) => P.bits)
        .reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0);
      const newRole = {
        role: item.role.name,
        permission,
      };
      return { ...item.toJSON(), role: newRole };
    });
    return paginationData(result, count, limit, offset);
  }
};

//getByIdUser
export const getByIdUser = async (id: number): Promise<RoleUsers | boolean> => {
  const userpro = await User.findByPk(id, {
    //   attributes: { exclude: ["id", "roleId", "password"] },
    attributes: ["firstname", "lastname", "mobile", "email", "username", "image", "active"],
    include: [
      {
        model: Role,
        attributes: ["name"],
        include: [
          {
            model: Permission,
            attributes: [[sequelize.fn("sum", sequelize.col("bits")), "permission"]],
            through: { attributes: [] },
          },
        ],
      },
      {
        model: Products,
      },
    ],
  });
  console.log(userpro);
  const user = await User.findByPk(id, {
    //   attributes: { exclude: ["id", "roleId", "password"] },
    attributes: ["firstname", "lastname", "mobile", "email", "username", "image", "active"],
    include: [
      {
        model: Role,
        attributes: ["name"],
        include: [
          {
            model: Permission,
            attributes: [[sequelize.fn("sum", sequelize.col("bits")), "permission"]],
            through: { attributes: [] },
          },
        ],
      },
    ],
  });
  if (!user || !user.toJSON()?.username) {
    return false;
  } else {
    const newRole = {
      role: user.role.name,
      permission: Number(user.role.permissons[0].toJSON().permission),
    };
    return { ...user.toJSON(), role: newRole };
  }
};
//getByIdUser
export const getByUsernameAndEmail = async (
  username: string,
  email: string
): Promise<RoleUsers | boolean> => {
  const user = await User.findOne({
    where: { [Op.and]: [{ username }, { email }] },
    attributes: ["id", "firstname", "lastname", "mobile", "email", "username", "image", "active"],
    include: [
      {
        model: Role,
        attributes: ["name"],
        include: [
          {
            model: Permission,
            attributes: [[sequelize.fn("sum", sequelize.col("bits")), "permission"]],
            through: { attributes: [] },
          },
        ],
      },
    ],
  });
  if (!user || !user.toJSON()?.username) {
    return false;
  } else {
    const newRole = {
      role: user.role.name,
      permission: Number(user.role.permissons[0].toJSON().permission),
    };
    return { ...user.toJSON(), role: newRole };
  }
};

//updateUser

export const update = async (id: number, payload: UpdateUser): Promise<boolean> => {
  const img=await User.findByPk(id)
  const update = await User.update({ ...payload }, { where: { id } });
  if (!update[0]) {
    return false;
  } else {
    if(img){
      RemoveImage(img?.toJSON().image);
    }
    return !!update[0];
  }
};

//RemoveUsersBYiD

export const deleteById = async (id: number): Promise<boolean> => {
  const user = await User.findByPk(id);
  const deleteById = await User.destroy({ where: { id }, truncate: true });
  if (!!deleteById === false) {
    return false;
  } else {
    RemoveImage(user?.toJSON().image);
    return !!deleteById;
  }
};

//removeMultipleUsers
export const removeMultipleUsers = async (ids: number[]): Promise<boolean> => {
  const user = await User.findAll({ where: { id: ids } });
  const deleteById = await User.destroy({ where: { id: ids }, truncate: true });
  if (!!deleteById === false) {
    return false;
  } else {
    const ImageUsers: string[] = user.map((img) => img.image as string);
    RemoveImage(ImageUsers);
    return !!deleteById;
  }
};

//ActiveUser
export const UpdateActiveUser = async (id: number, active: boolean): Promise<boolean> => {
  const user = await User.update({ active: active }, { where: { id } });

  if (!!user[0]) {
    return true;
  } else {
    return false;
  }
};

//LogoutUser
export const LogOutUser = async (id: number, refreshToken: string): Promise<boolean> => {
  await UpdateActiveUser(id, false);
  const removeToken = await Token.destroy({
    where: { [Op.and]: [{ name: refreshToken }, { userId: id }] },
  });
  if (!!removeToken) {
    return true;
  } else {
    return false;
  }
};
