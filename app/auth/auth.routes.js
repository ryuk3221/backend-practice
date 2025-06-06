import express from "express";
import { authUser, registerhUser } from "./auth.controller.js";

const router = express.Router();

router.route('/login').post(authUser);
router.route('/register').post(registerhUser);

export default router;