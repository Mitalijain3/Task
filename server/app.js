const express = require("express");
const mongoose = require("mongoose");


const app= express();
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/taskDB")
const Schema = new mongoose.Schema({
    name:"string",
    followers:[
       {follower:"string"}
    ],
    followings:[
      {following:"string"}
    ],
    status:"string"
})
const User= mongoose.model("User",Schema);

app.route("/user")
.get((req,res)=>{
    const newUser= new User({
        name:"h",
        followers:[{follower:"a"},{follower:"b"},{follower:"c"},{follower:"d"},{follower:"e"},{follower:"f"},{follower:"g"}],
        followings:[{following:"a"},{following:"b"},{following:"c"},{following:"d"}],
        status:"follow"

    })
    // newUser.save();
    console.log("successfully saved!!");
    User.find({},(err,foundUser)=>{
if(!err){
    res.send(foundUser);
}
if(err){
    console.log(err);
}
    })
 
})
.delete((req,res)=>{
    const person= req.body.user;
    const personStatus= req.body.Status;
    console.log(person);
    User.updateOne({name:person},{ $pull :{"followers":{"follower":"d"}}},
    function(err,results){
         if(err){
            console.log("delete not d");
             console.log(err);
         }else{
             console.log("delete d");
             console.log(results);
         }
     });
     User.updateOne({name:person},{ "status":personStatus},
     function(err,results){
          if(err){
             console.log("status not update");
              console.log(err);
          }else{
              console.log("status update");
              console.log(results);
          }
      });
    res.json({message:person});
})
.patch((req,res)=>{
    const {user}= req.body;
    const personStatus= req.body.Status;
    console.log(user);
    User.updateOne({name:user},{ $push :{"followers":{"follower":"d"}}, "status":personStatus},
    function(err,results){
         if(err){
            console.log("not added d");
             console.log(err);
         }else{
             console.log("added d");
             console.log(results);
         }
     });
    res.json({message:user});
})
app.listen(4000,()=>{
console.log("Server is running on port");
})