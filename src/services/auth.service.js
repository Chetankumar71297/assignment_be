import createHttpError from "http-errors";
import validator from "validator";
import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";

//env variables
const { DEFAULT_PICTURE, DEFAULT_STATUS } = process.env;

export const createUser = async (userData) => {
  const { name, email, profile_photo, cover_photo, password } = userData;

  //check if fields are empty
  if (!name || !email || !password) {
    throw createHttpError.BadRequest("please fill all fields.");
  }

  //check name length
  if (
    !validator.isLength(name, {
      min: 2,
      max: 16,
    })
  ) {
    throw createHttpError.BadRequest(
      "please make sure that your name is between 2 and 16 characters."
    );
  }

  //check if email is valid
  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest("Provide valid email address.");
  }

  //check if user already exist
  const checkDb = await UserModel.findOne({ email });
  if (checkDb) {
    throw createHttpError.Conflict(
      "User already exist with this email address,try with different email address"
    );
  }

  //check password length
  if (
    !validator.isLength(password, {
      min: 6,
      max: 128,
    })
  ) {
    throw createHttpError.BadRequest(
      "Please make sure your password is between 6 and 128 characters."
    );
  }

  //hash password--->to be done in the user model

  //adding user to database
  const user = await new UserModel({
    name,
    email,
    profile_photo: profile_photo || DEFAULT_PICTURE,
    cover_photo: cover_photo || DEFAULT_STATUS,
    password,
  }).save();

  return user;
};

export const signUser = async (email, password) => {
  const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();

  //check if user exist
  if (!user) {
    throw createHttpError.NotFound("Invalid credentials.");
  }

  //compare password
  let passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    throw createHttpError.NotFound("Invalid credentials");
  }

  return user;
};
