import express  from "express";
import Comment from "../models/Comment";
const commentRouter = express.Router();


commentRouter.post('/make',async (req,res) => {
    const {
        body : {id , writer,text}
    } = req;
    const comment = await Comment.findByIdAndUpdate(
        id,
    )
    console.log(comment)
    return res.json({success : true})
})


export default commentRouter





