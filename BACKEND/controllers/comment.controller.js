import Comment from "../models/model.comments.js";

export const createComment = async (req, res) => {
  const { content, userId, postId } = req.body;
  try {
    if (!content || !userId || !postId) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const newComment = new Comment({
      content,
      userId,
      postId,
    });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getComments=async(req,res)=>{
    try {
        const comments = await Comment.find({postId:req.params.postId});
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({
            message:error.message,
        });
    }
 
}
