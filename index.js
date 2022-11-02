const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./User.js");
const express = require ("express");
const { response } = require("express");
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

app.put('/update', async(req, res) => {
    const user = new User({
      id: req.body.id,
      title: req.body.title,
      author: req.body.author,
      pages: req.body.pages,
      year: req.body.year,
    });
    user.updateOne({id: req.params.id}, user).then(
      () => { 
        res.status(201)
        .json({user});
     }
    ).catch(
      (error) => {
        res.status(400)
        .json({error: error});
      }
    );
  });

app.get("/getbook", async(req,res) =>{
    const user = await User.find(req.body);

    res.status(200).json({
        status:true,
        data: {
            user
        }
    })
});

app.listen(PORT, ()=>{
    console.log(`app is working fine on ${PORT}`)
})