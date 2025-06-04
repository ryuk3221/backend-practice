import { prisma } from "../prisma.js";
// @desc Auth user
// @route POST /api/auth/login
// @access Public


export const authUser = async (req, res) => {
  const user = await prisma.user.findMany();
  console.log(user)
  res.json(user);
};