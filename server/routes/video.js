import express from 'express';
const videoRouter = express.Router();
const multer = require('multer');
import path from 'path'
import fs from 'fs'
import sharp from 'sharp';


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

const upload = multer({ storage : storage }).single('file')
const videoUpload = multer({ storage : videoStorage }).single('file')

videoRouter.post("/thumbnail-upload-files", (req, res) => {
    upload(req, res, err => {
        console.log(res.req)
        if (err) {
            return res.json({ success: false, err })
        }  else {
            let filePath = res.req.file.path;
            let fileName = res.req.file.filename;
            sharp(`${path.join(__dirname,'..','..')}/${filePath}`)
            .resize({width : 320, height : 240})
            .withMetadata()
            .toBuffer((err, buffer) => {
                if (err) return res.json({ success: false, err});
                // 압축된 파일 새로 저장(덮어씌우기)
                fs.writeFile(`${path.join(__dirname,'..','..')}/${filePath}`, buffer, (err) => {
                  if (err) return res.json({ success: false, err});
                  console.log(filePath, fileName)
                  return res.json({ success: true, filePath, fileName})
                });
              });
            // ${path.join(__dirname,'..','..')}/${filePath}
            // sharp(`${path.join(__dirname,'..','..')}`)
        }
    })
})


videoRouter.post("/thumbnail-delete",  (req, res) => {
    const {body : {ThumnailPath}} = req;
    let deletePath = path.join(__dirname,'..','..');
    fs.unlink(`${deletePath}/${ThumnailPath}`,(err) => {
        return res.json({success : true})
    })
    
})

videoRouter.post("/upload", (req, res) => {
    videoUpload(req, res, err => {
        console.log(res.req.file)
        if (err) {
            return res.json({ success: false, err })
        }  
        return res.json({success : true})
    })
   
})


export default videoRouter