import express from "express";
import { generateOTP, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/generateotp",generateOTP)

export default router;
