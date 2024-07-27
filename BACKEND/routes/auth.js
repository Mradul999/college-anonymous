import express from "express";
import {
  generateOTP,
  signin,
  signup,
  verifyOTP,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/generateotp", generateOTP);
router.post("/verifyotp", verifyOTP);
router.post("/signin", signin);

export default router;
