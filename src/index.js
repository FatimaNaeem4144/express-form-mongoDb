const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const templatePath = path.join(__dirname,'../templates')
const collection=require("./mongodb")

app.use(express.json())
app.set("view engine","hbs")
app.set("views", templatePath)
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'));

app.get("/",(req,res)=>{
    res.render("login")
})
app.get("/signup",(req,res)=>{
    res.render("signup")
})
app.get("/login",(req,res)=>{
    res.render("login")
})

app.post("/signup", async (req,res)=>{
    const { name, password, confirmpassword } = req.body;

    if (password !== confirmpassword) {
        return res.send("Password and Confirm Password do not match");
    }

    const data = {
        name: name,
        password: password,
        confirmpassword: confirmpassword,
    };


    await collection.insertMany([data])
    res.render("home")
})

app.post("/login", async (req,res)=>{
    try{
        const check=await collection.findOne({name:req.body.name})

        if(check.password===req.body.password){
            res.render("home")
        }
        else{
            res.send("Wrong Password")
        }
    }
    catch{
        res.send("Wrong Details")
    }
})


app.listen(7001,()=>{
    console.log("port connected");
})