import createHttpError from "http-errors";
import { createUser, signUser } from "../services/auth.service.js";
import { generateToken, verifyToken } from "../services/token.service.js";
import { findRequiredUser } from "../services/user.service.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, profile_photo, cover_photo, password } = req.body;
    const newUser = await createUser({
      name,
      email,
      profile_photo,
      cover_photo,
      password,
    });

    const access_token = await generateToken(
      { userId: newUser._id },
      "1d",
      process.env.ACCESS_TOKEN_SECRET
    );
    const refresh_token = await generateToken(
      { userId: newUser._id },
      "30d",
      process.env.REFRESH_TOKEN_SECRET
    );

    //sending refresh token
    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refreshtoken",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    });

    res.json({
      message: "registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profile_photo: newUser.profile_photo,
        cover_photo: newUser.cover_photo,
        token: access_token,
      },
    });
  } catch (error) {
    next(error); //send control to last error handling middleware in app.js file
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await signUser(email, password);

    const access_token = await generateToken(
      { userId: user._id },
      "1d",
      process.env.ACCESS_TOKEN_SECRET
    );
    const refresh_token = await generateToken(
      { userId: user._id },
      "30d",
      process.env.REFRESH_TOKEN_SECRET
    );

    //sending refresh token
    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refreshtoken",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    });

    res.json({
      message: "logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profile_photo: user.profile_photo,
        cover_photo: user.cover_photo,
        token: access_token,
      },
    });
  } catch (error) {
    next(error); //send control to last error handling middleware in app.js file
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("refreshtoken", { path: "/api/v1/auth/refreshtoken" });

    res.json({
      message: "logged out successfully",
    });
  } catch (error) {
    next(error); //send control to last error handling middleware in app.js file
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const refresh_token = req.cookies.refreshtoken;
    if (!refresh_token) {
      throw createHttpError.Unauthorized("Please login");
    }

    const check = await verifyToken(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await findRequiredUser(check.userId);
    const access_token = await generateToken(
      { userId: user._id },
      "1d",
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profile_photo: newUser.profile_photo,
        cover_photo: newUser.cover_photo,
        token: access_token,
      },
    });
  } catch (error) {
    next(error); //send control to last error handling middleware in app.js file
  }
};
