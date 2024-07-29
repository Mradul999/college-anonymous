import express from "express";
import { createComment, getComments } from "../controllers/comment.controller.js";


const router = express.Router();
router.post("/createcomment",createComment)
router.get("/getcomments/:postId",getComments);




export default router;
