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
const user = new User (reqBody);
await user.save().then(() =>{
  return res.status(201).send(user)
})
  .catch((err)=>{
    return res.status(400).send(err)
})
});

app.put('/update', async(req, res) => {
    const user = new User({
      id: req.body.id,
      title: req.body.title,
      author: req.body.author,
      pages: req.body.pages,
      year: req.body.year,
    });
    user.updateOne( {id: req.body.id} , user).then(
      () => { 
        res.status(201)
        .send({user});
     }
    ).catch(
      (error) => {
        res.status(400)
        .json({error: error});
      }
    );
  });

app.get("/getbook", async(req,res) =>{
 const reqBody = req.body;
  const user =  await User(reqBody);
 res.status(200).send(user);
});

app.listen(PORT, ()=>{
    console.log(`app is working fine on ${PORT}`)
})