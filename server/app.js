const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/taskDB")
const Schema = new mongoose.Schema({
    name: "string",
    img: "string",
    followers: [
        { follower: "string", img: "string" }
    ],
    followings: [
        { following: "string", img: "string" }
    ],
    status: "string"
})
const User = mongoose.model("User", Schema);
app.route("/user")
    .get((req, res) => {
        User.find({}, (err, foundUser) => {
            if (!err) {
                res.send(foundUser);
            }
            if (err) {
                console.log(err);
            }
        })

    })
    .delete((req, res) => {
        const person = req.body.user;
        const personStatus = req.body.Status;
        const activeUser = 'd';
        //removing activeUser from follower list of  user to which he/she unfollow
        User.updateOne({ name: person }, { $pull: { "followers": { "follower": activeUser } } },
            function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(results);
                }
            });
        //Status update call
        User.updateOne({ name: person }, { "status": personStatus },
            function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(results);
                }
            });
        res.json({ message: "Successfully remove activeUser from follower list!!" });
    })
    .patch((req, res) => {
        const { user } = req.body;
        const personStatus = req.body.Status;
        const activeUser = 'd';
        //adding activeUser to follower list of  user to which he/she started following
        User.updateOne({ name: user }, { $push: { "followers": { "follower": activeUser } }, "status": personStatus },
            function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(results);
                }
            });
        res.json({ message: "Successfully added activeUser to follower list!!" });
    })
app.listen(4000, () => {
    console.log("Server is running on port");
})














// const newUser = new User({
//     name: 'd',
//     status:"Follow",
//     img:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.stickpng.com%2Fimg%2Ficons-logos-emojis%2Fusers%2Fyoung-user-icon&psig=AOvVaw221tWnP65d0LAlOdJ_YdP0&ust=1640397019883000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNCNxeqp-_QCFQAAAAAdAAAAABAO",
//     followers: [{ follower: "a", img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ACrystal_Clear_kdm_user_female.svg&psig=AOvVaw221tWnP65d0LAlOdJ_YdP0&ust=1640397019883000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNCNxeqp-_QCFQAAAAAdAAAAABAI" }, { follower: "b", img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ACrystal_Clear_kdm_user_female.svg&psig=AOvVaw221tWnP65d0LAlOdJ_YdP0&ust=1640397019883000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNCNxeqp-_QCFQAAAAAdAAAAABAI" }],
//     followings:[{ following: "e", img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ACrystal_Clear_kdm_user_female.svg&psig=AOvVaw221tWnP65d0LAlOdJ_YdP0&ust=1640397019883000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNCNxeqp-_QCFQAAAAAdAAAAABAI" }, { following: "f", img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ACrystal_Clear_kdm_user_female.svg&psig=AOvVaw221tWnP65d0LAlOdJ_YdP0&ust=1640397019883000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNCNxeqp-_QCFQAAAAAdAAAAABAI" }]
// })
// newUser.save();
// console.log("Saved");