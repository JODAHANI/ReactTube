import mongoose, { Schema } from "mongoose";

const videoSchema = new mongoose.Schema({
    writer : {
        type : Schema.Types.ObjectId,
        ref: 'User'
    }, 
    title : {
        type : String,
        maxlength : 50,
    },
    description : {
        type : String,
    },
    privacy : {
        type : Number
    },
    category : {
        type : String
    },
    views : { 
        type : Number,
        default : 0
    },
    thumbnailPath : {
        type : String
    },
    videoPath : {
        type : String
    },
},{timestamps : true})


const Video = mongoose.model('Video', videoSchema)
export default Video