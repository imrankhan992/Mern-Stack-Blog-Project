const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("../api/models/User");
const app = express();
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const Post = require("./models/Post");
const secretKey =
  "imhfsdkfjsdfjsdfjlsdjfksdnflsdfjskdlfjsdkjflsdjflksdfkjsdlkfjklsdjfhelkalfndsknfsd";
mongoose
  .connect(
    "mongodb+srv://imrankhan:imrankhan@cluster0.o1tywyf.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  .then((data) => {
    console.log("successsfully conected");
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json("failed");
    }
    const userExist = await User.findOne({ username });
    if (!userExist) {
      const userDoc = await User.create({
        username,
        password: bcrypt.hashSync(password, salt),
      });
      return res.status(200).json({ success: true, userDoc: userDoc });
    }
    return res.status(400).json({ success: false });
  } catch (error) {
    res.status(400).json(error);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json("wrong credientials");
    }
    const UserExist = await User.findOne({ username });
    if (!UserExist) {
      return res.status(400).json("failed");
    }
    const passwordOk = bcrypt.compareSync(password, UserExist.password);
    if (passwordOk) {
      const token = await jwt.sign(
        { username: username, id: UserExist._id },
        secretKey
      );
      res.cookie("token", token).status(200).json({
        id: UserExist._id,
        username: UserExist.username,
      });
    } else {
      res.status(400).json("wrong credientails");
    }
  } catch (error) {
    console.log(error);
  }
});
app.get("/profile", async (req, res) => {
  try {
    const { token } = req.cookies;
    const data = await jwt.verify(token, secretKey);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("0k");
});

app.post("/createpost", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;

  console.log(originalname.split("."));
  const parts = originalname.split(".");

  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const { title, summary, content } = req.body;

  const { token } = req.cookies;
  const data = jwt.verify(token, secretKey);
  console.log(data);
  const postDoc = await Post.create({
    title,
    summary,
    content,
    cover: newPath,
    author: data.id,
  });
  res.status(200).json({ postDoc });
});
app.get("/post", async (req, res) => {
  res.json(
    await Post.find({})
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});
app.get("/post/:id", async (req, res) => {
  const {id}= req.params
    const userData  = await Post.findById(id).populate("author",["username"])
   res.json(userData)

});
app.put("/update", uploadMiddleware.single("file"),async(req,res)=>{
  let newPath
  if(req.file){
    const { originalname, path } = req.file;
  console.log(originalname.split("."));
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  }

  const { id,title, summary, content } = req.body;
  const { token } = req.cookies;
  const data = jwt.verify(token, secretKey);
  
 
  const postdata = await Post.findById(id);
  console.log(postdata.cover);
  const isAuthor = JSON.stringify(postdata.author) === JSON.stringify(data.id)
  if(!isAuthor){
    return res.status(400).json("you are not the author")
  }
  // const postDoc = await Post.create({
  //   title,
  //   summary,
  //   content,
  //   cover: newPath,
  //   author: data.id,
  // });
  await postdata.updateOne({
    title,
    content,
    summary,
    cover:newPath?newPath:postdata.cover
  })
  res.status(200).json({ postdata });
})
app.post("/myprofile",async(req,res)=>{
 try {
  const { token } = req.cookies;
  // console.log(token);
  const data = await jwt.verify(token, secretKey);
  // console.log(data);
  const id = data.id
  console.log(id);
  if(data){
  const allposts = await Post.find({author:id}).sort("createdAt");
  
    res.status(200).json(allposts)
  }
 } catch (error) {
  console.log(error);
 }
})
app.listen(4000, () => {
  console.log("listen at 4000");
});
