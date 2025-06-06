import jwt from "jsonwebtoken";

export const generateToken = userId => jwt.sign(
  {
    id: userId
  },
  process.env.ACCESS_TOKEN,
  {
    expiresIn: '10d'
  }
);