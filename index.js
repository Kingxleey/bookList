const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./User.js");
const express = require ("express");
const app = express();
app.use(express.json());
dotenv.config ({path: './config.env'});


const {PORT, db_url} = process.env;

 mongoose.connect(db_url)
 .then(()=>{
    console.log("connected");
 })
 .catch((err) => {
    console.log(err);
 });

app.post("/create", async(req,res)=>{
const reqBody = req.body;
const user = new User(reqBody);
await User.save;
return res.status(201).send(user);
});

app.post("/update", async(req,res)=>{
const user = await user.findById(req.body.id);
findUser.title = req.body.title;
findUser.author = req.body.author;
findUser.id = req.body.id;
findUser.yearOfPublication = req.body.yearOfPublication;
await findUser.save();
return res.status(201).save(findUser);
});

app.get("/getbook", async(req,res) =>{
    const user = await user.findById(req.body.id);
    if(user){
        return res.status(201).save(User);
    }
});
app.listen(PORT, ()=>{
    console.log(`app is working fine on ${PORT}`)
})