const mongoose = require("mongoose");
// const {Schema,model} = mongoose
const postSchema = new mongoose.Schema({
    title:String,
    summary:String,
    content:String,
    cover:String,
    author:{
        type:mongoose.Schema.Types.ObjectId ,ref:"User"
    }
},{timestamps:true})
const postModel = mongoose.model("Post",postSchema)
module.exports = postModel