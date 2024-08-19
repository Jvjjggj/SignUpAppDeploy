const mongoose=require("mongoose")
const { type, userInfo } = require("os")

const UserDetailsSchema=mongoose.Schema({
    fname:String,
    lname:String,
    email:{type:String,unique:true},
    password:String
},{collection:"UserInfo"})

mongoose.model("UserInfo",UserDetailsSchema)