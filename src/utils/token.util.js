import Jwt from "jsonwebtoken";

export const sign = async (payload, expireIn, secret) => {
  return new Promise((resolve, reject) => {
    Jwt.sign(payload, secret, { expiresIn: expireIn }, (error, token) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
};

export const verify = async (token, secret) => {
  return new Promise((resolve, reject) => {
    Jwt.verify(token, secret, (error, payload) => {
      if (error) {
        console.log(error);
        resolve(null);
      } else {
        resolve(payload);
      }
    });
  });
};
