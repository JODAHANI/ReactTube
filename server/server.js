import express from "express"
import mongoose from "mongoose"
import path from 'path';
import cookieParser from "cookie-parser";
import userRouter from "./routes/users";
import videoRouter from "./routes/video";

import 'dotenv/config' 


const app = express()
const port = 8080

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('DB 연결.')
}).catch((err) => {
  console.log(err)
})

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.use('/api/users',userRouter)
app.use('/api/video',videoRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



// ignore : TEST
// app.use('/css',  express.static(__dirname + '/css'));
// app.get('/',(req,res) => {
//   res.render('home')
// })
// app.get('/api/hello',(req,res) => {
//   res.send('하위')
// })
// app.get('/login', (req, res) => {
//   res.render('login')
// })

// app.get('/api/register', (req, res) => {
//   res.render('register')
// })
