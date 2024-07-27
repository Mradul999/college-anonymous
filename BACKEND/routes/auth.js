import express from "express";
import { generateOTP, signup, verifyOTP } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/generateotp",generateOTP);
router.post("/verifyotp",verifyOTP)

export default router;
