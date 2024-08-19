const express=require("express")
const bcrypt=require("bcrypt")
const mongoose=require("mongoose")
const cors=require("cors")
const app=express()
const jwt=require("jsonwebtoken")
const jwtSecreteKey="jwt_token"

mongoose.connect("mongodb+srv://Jak:Sjakeer201@cluster0.5y48ina.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Mongoose Connected")
}).catch((e)=>console.log(e))


app.use(express.json())
app.use(cors())


app.post("/p",async(req,res)=>{
    console.log(req.body)
    try {
        res.send({"status":"ok"})
    } catch (error) {
        res.send({status:error})
    }
})

require("./userDetails")

const user=mongoose.model("UserInfo")

app.post("/register",async (req,res)=>{
    const {fname,lname,email,password}=req.body
    const encryptedPassword=await bcrypt.hash(password,10)
    try {
        const oldUser=await user.findOne({email})
        if(oldUser){
            res.send({status:"email already use"})
            
        }
        else{
            await user.create({
                fname,lname,email,password:encryptedPassword
            })
            res.send({status:"ok"})
            res.status(200)
        }
    } catch (error) {
        res.send({status:"error"})
    }
})

app.post('/login',async (req,res)=>{
    const {email,password}=req.body

    try {
        const oldUser=await user.findOne({email})
        if(oldUser){
            if(await bcrypt.compare(password,oldUser.password)){
                const token=jwt.sign({email:oldUser.email},jwtSecreteKey)
                res.send({status:"ok",token})
            }else{
                res.send({status:"incorrect password"})
            }
        }else{
            res.send({status:"user not created"})
            return
        }
    } catch (error) {
        res.send({status:"error"})
    }
})

app.post("/user-details",async(req,res)=>{
    const {token}=req.body
    try {
        const userVerify=jwt.verify(token,jwtSecreteKey)
        const email=userVerify.email
        console.log(userVerify)
        user.findOne({email}).then((data)=>{
            res.send({status:"ok",data:data})
        })

    } catch (error) {
        res.send({error})
    }
})

app.listen(3008,()=>{
    console.log("Server Started")
})
