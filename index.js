const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./User");
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
  try{
    const user = ({
     // id: req.body.id,
      title: req.body.title,
     // author: req.body.author,
      pages: req.body.pages,
      year: req.body.year,
    });
   
   let userTwo = await User.findOneAndUpdate( {author: req.query.author} , user, {new:true})
  //  .then(
  //     () => { 
       return res.status(201)
        .send(userTwo);
     //}
  } catch {
      (error) => {
        console.log(error.message)
        res.status(400)
        .json({error: error});
      }
    };
  });


app.get("/getbook", async(req,res) =>{
  const id = req.params.id
 const user = await User.findbyId({id})
  .then(() =>{
      return res.status(200).send(user)
    })
.catch((error) =>{
 return res.status(400).send(error);
});
});

app.listen(PORT, ()=>{
    console.log(`app is working fine on ${PORT}`)
})