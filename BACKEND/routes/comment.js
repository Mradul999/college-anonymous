import express from "express";
import { createComment, getComments, likeComment } from "../controllers/comment.controller.js";


const router = express.Router();
router.post("/createcomment",createComment)
router.get("/getcomments/:postId",getComments);
router.put("/likecomment/:commentId/:userId",likeComment);




export default router;
