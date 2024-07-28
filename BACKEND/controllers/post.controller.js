import Post from "../models/model.posts.js";
//create post
export const createPost = async (req, res) => {
  try {
    const { title, content, author, image } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({
        message: "Title, content and author are required",
      });
    }
    const post = await Post.findOne({ title });
    if (post) {
      return res.status(409).json({
        message: "Post with this title already exists",
      });
    }
    const newPost = new Post({
      title,
      content,
      author,
      image,
    });

    await newPost.save();
    res.status(200).json({
      message: "post created succesfully",
      newPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//getAllpost

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      message: "post fetched successfully",
      posts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//get popular posts
