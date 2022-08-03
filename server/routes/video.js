import express from 'express';
const videoRouter = express.Router();
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import sharp from 'sharp';
import Video from '../models/Video';
import Comment from '../models/Comment';


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/thumbnails/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
})
var videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/videos/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
})

const upload = multer({ storage: storage }).single('file')
const videoUpload = multer({ storage: videoStorage }).single('file')

videoRouter.post("/thumbnail-upload-files", (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        } else {
            let filePath = res.req.file.path;
            let fileName = res.req.file.filename;
            sharp(`${path.join(__dirname, '..', '..')}/${filePath}`)
                .resize({ width: 320, height: 240 })
                .withMetadata()
                .toBuffer((err, buffer) => {
                    if (err) return res.json({ success: false, err });
                    // 압축된 파일 새로 저장(덮어씌우기)
                    fs.writeFile(`${path.join(__dirname, '..', '..')}/${filePath}`, buffer, (err) => {
                        if (err) return res.json({ success: false, err });
                        console.log(filePath, fileName)
                        return res.json({ success: true, filePath, fileName })
                    });
                });
            // ${path.join(__dirname,'..','..')}/${filePath}
            // sharp(`${path.join(__dirname,'..','..')}`)
        }
    })
})


videoRouter.post("/thumbnail-delete", (req, res) => {
    const { body: { ThumnailPath } } = req;
    let deletePath = path.join(__dirname, '..', '..');
    fs.unlink(`${deletePath}/${ThumnailPath}`, (err) => {
        return res.json({ success: true })
    })

})

videoRouter.post("/video-save", (req, res) => {
    videoUpload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        let filePath = res.req.file.path;
        let fileName = res.req.file.filename;
        return res.json({ success: true, filePath, fileName })
    })

})


videoRouter.post("/upload-video", async (req, res) => {
    const video = await Video.create(req.body)
    await Comment.create({_id : video._id})
    console.log(video)
    return res.json({ success: true, video })
})

videoRouter.get('/get-videos', async (req, res) => {
    const video = await Video.find().populate('writer')
    return res.json({ success: true, video })
})

videoRouter.post('/get-video', async (req, res) => {
    const { body: { id } } = req;
    let video = await Video.findById(id).populate('writer')
    return res.json({ success: true, video })
})
videoRouter.get('/remove/:id', async (req, res) => {
    const { params: { id } } = req;
    const video = await Video.findByIdAndDelete(id);
    console.log(video)
    return res.json({ success: true })
})

videoRouter.post('/edit', async (req, res) => {
    const {
        body: {
            id,
            title,
            description,
            privacy,
            category
        }
    } = req
    const video = await Video.findByIdAndUpdate(
        id,
        { title, description, privacy, category },
        { new: true }
    )
    return res.json({ success: true, video })
})


export default videoRouter