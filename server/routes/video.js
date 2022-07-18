import express from 'express';
const videoRouter = express.Router();
import { upload } from '../middleware/upload';

videoRouter.post('/uploadFiles', (req,res) => {
    console.log(req.body)
    return res.send({success : true})
})



export default videoRouter