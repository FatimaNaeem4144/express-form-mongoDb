
require('dotenv').config();
const connectDB = require('./connectmongo');
connectDB();

const express = require("express");
const app = express();
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
app.post("/signup", async (req, res) => {
    const { name, password, confirmpassword } = req.body;

    if (password !== confirmpassword) {
        return res.send("Password and Confirm Password do not match");
    }

    const data = {
        name: name,
        password: password,
        confirmpassword: confirmpassword,
    };

    try {
        console.log("Inserting data into MongoDB:", data);
        // Insert data into MongoDB
        await collection.create(data);
        console.log("Data inserted successfully");
        res.render("home");
    } catch (error) {
        console.error("Error saving data to MongoDB:", error);
        res.send("Error saving data to MongoDB");
    }
});


app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name });

        if (check && check.password === req.body.password) {
            res.render("home");
        } else {
            res.send("Wrong Password");
        }
    } catch (error) {
        console.error("Error checking login credentials:", error);
        res.send("Error checking login credentials");
    }
});
const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log("Server is running on port",PORT);
})


