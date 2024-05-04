import createHttpError from "http-errors";
import { UserModel } from "../models/index.js";

export const findRequiredUser = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw createHttpError.BadRequest("User not exist's");
  }
  return user;
};
