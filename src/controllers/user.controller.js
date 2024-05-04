import createHttpError from "http-errors";
import { findRequiredUser } from "../services/user.service.js";

export const findUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw createHttpError.BadRequest("please provide user id.");
    }

    const user = await findRequiredUser(userId);
    res.json({
      message: "registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profile_photo: user.profile_photo,
        cover_photo: user.cover_photo,
      },
    });
  } catch (error) {
    next(error);
  }
};
