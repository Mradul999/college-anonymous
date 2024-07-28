import express from "express";
import { createPost, getAllPosts,  } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/createpost",createPost);
router.get('/getallposts',getAllPosts);


export default router;
