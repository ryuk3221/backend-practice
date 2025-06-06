import jwt from "jsonwebtoken";
import { prisma } from "../prisma.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    console.log('токен' + token);

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    console.log('decoded: ' + decoded)

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id
      }
    });

    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401);
      res.json({
        message: 'Authorization failed'
      });
    }
  }

  if (!token) {
    res.status(400);
    res.json({
      message: 'Authorization failed, token not found'
    });
  }
}