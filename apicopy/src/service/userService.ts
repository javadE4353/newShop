import * as usersdal from "../dal/usersDal.js";
import { RoleUsers, UpdateUser, UserAttributesOutput, UserInput } from "../models/bo/User.js";

//create
export const create = (payload: UserInput) => {
  const create = usersdal.create(payload);
  return create;
};
// getAllUsers
export const getAllUsers = (
  page: number,
  limit: number,
  condition: string | null,
  role: string | null
): Promise<UserAttributesOutput | boolean> => {
  const users = usersdal.getAllUsers(page, limit, condition, role);
  return users;
};
// getByIdUser
export const getByIdUser = (id: number): Promise<RoleUsers | boolean> => {
  const users = usersdal.getByIdUser(id);
  return users;
};
// getByIdUser
export const getByUsernameAndEmail = (
  username: string,
  email: string
): Promise<RoleUsers | boolean> => {
  const users = usersdal.getByUsernameAndEmail(username, email);
  return users;
};
//update
export const updata = (id: number, payload: UpdateUser): Promise<boolean> => {
  const users = usersdal.update(id, payload);
  return users;
};
//deleteBYId
export const deleteById = (id: number): Promise<boolean> => {
  const users = usersdal.deleteById(id);
  return users;
};

//removeMultipleUsers

export const removeMultipleUsers = (id: number[]): Promise<boolean> => {
  const removeMultipleUsers = usersdal.removeMultipleUsers(id);
  return removeMultipleUsers;
};

//UpdateActiveUser
export const UpdateActiveUser = async (id: number, active: boolean): Promise<boolean> => {
  const upAcUser = usersdal.UpdateActiveUser(id, active);
  return upAcUser;
};

//LogoutUser
export const LogOutUser = async (id: number, refreshToken: string): Promise<boolean> => {
  const logOutUser = usersdal.LogOutUser(id, refreshToken);
  return logOutUser;
};
