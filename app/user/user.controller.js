import { prisma } from "../prisma.js";

// @desc get user profile
// @route GET /api/profile
// @access Public
export const getUserProfile = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id
    }
  });

  res.status(200);
  res.json(user)
};