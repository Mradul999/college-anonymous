import Post from "../models/model.posts.js";
//create post
export const createPost = async (req, res) => {
  try {
    const { title, content, image } = req.body.formData;
    const { author } = req.body;
    console.log(req.body);

    if (!title || !content) {
      return res.status(400).json({
        message: "Title, content and author are required",
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

//like a post
export const likePost=async(req,res)=>{

  try {
    
    
  } catch (error) {
    
  }

}
