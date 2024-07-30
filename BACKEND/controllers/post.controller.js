import Post from "../models/model.posts.js";
//create post
export const createPost = async (req, res) => {
  try {
    const { title, content, image } = req.body.formData;
    const { author, userId } = req.body;

    console.log(req.body);

    if (!title || !content) {
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
    const slug = req.body.formData.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");
    const newPost = new Post({
      title,
      content,
      author,
      image,
      slug,
      userId,
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

//like post

export const likePost = async (req, res) => {
  try {
    // console.log("postId ,userId",req.params.postId,req.params.userId);
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.stauts(404).json({
        message: "post not found",
      });
    }

    const index = post.likes.indexOf(req.params.userId);
    if (index === -1) {
      post.likes.push(req.params.userId);
    } else {
      post.likes.splice(index, 1);
    }

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({
        message: "post does not exist",
      });
    }
    const deletedPost = await Post.findByIdAndDelete(req.params.postId);

    res.status(200).json(deletedPost);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
