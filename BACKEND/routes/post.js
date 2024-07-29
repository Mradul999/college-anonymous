import express from "express";
import { createPost, getAllPosts, likePost,  } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/createpost",createPost);
router.get('/getallposts',getAllPosts);
router.put("/likepost",likePost);


export default router;
