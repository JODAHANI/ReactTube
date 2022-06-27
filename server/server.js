import express from "express"
import mongoose from "mongoose"
import path from 'path';
import User from "./models/User";
import {auth} from './middleware/auth'
import cookieParser from "cookie-parser";

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
app.use('/css',  express.static(__dirname + '/css'));

app.get('/',(req,res) => {
  res.render('home')
})

app.get('/auth',auth, (req,res) => {
  res.status(200).json({
    id : req.user._id,
    isAuth : true,
    isAdmin : req.user.role === 0 ? false : true,
    email : req.user.email,
    name : req.user.name,
    role : req.user.role,
    image : req.user.image
  })
  // res.redirect('/')
})

app.get('/login', (req, res) => {
  res.render('login')
})
app.post('/login', async (req, res) => {
  const {body : {email,password}} = req;
  let user = await User.findOne({email})
  if(!user) {
    return res.send('가입 된 ID가 없습니다.')
  } 
  let userCompare = await user.comparePassword(password)
  if(!userCompare) {
    res.send('비밀번호 틀렸어요!')
    // res.json({loginSuccess : false , message : '비밀번호가 맞지 않습니다.'})
  } else {
    let currentUser = await user.generateToken();
    return res.cookie('auth',currentUser.token).redirect('/')
    // return res.redirect('/')
    // res.json({loginSuccess : true , user})
  }
})
app.get('/register', (req, res) => {
  res.render('register')
})
app.get('/logout',auth, async (req, res) => {
  let logoutUser = await User.findOneAndUpdate(
    {_id: req.user._id,},
    {token : ""},
    {new : true}
  );
  console.log(logoutUser)
  return res.status(200).send({success : true})
})

app.post('/register', async (req, res) => {
  const {body : {name ,email,password,password2}} = req;
  console.log(name,email,password)
  if(password != password2) {
    return res.send('패스워드가 일치하지 않습니다.')
  } else {
    let user = await User.create({name,email,password})
    console.log(user)
    return res.redirect('/')
  }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})