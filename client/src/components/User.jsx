import React, { useState, useEffect } from "react";
import axios from "axios";
import user from "../images/user.png";
import "./user.css";
const User = () => {
  const [Status, setStatus] = useState("Follow");
  const [Data, setData] = useState([]);
  const handleClick = (e) => {
    const user = e.target.value;
    const name = e.target.name;
    setStatus(name);
    console.log(Status);
    Status === "Follow" ? setStatus("Following") : setStatus("Follow");
    if (Status === "Follow") {
      axios({
        method: "delete",
        url: "/user",
        data: { user, Status },
      })
        .then((response) => {
          console.log(response.data.message);
        })
        .catch((err) => {
          console.log("Not Posted!!");
          console.log(err);
        });
    } else {
      axios({
        method: "patch",
        url: "/user",
        data: { user, Status },
      })
        .then((response) => {
          console.log(response.data.message);
        })
        .catch((err) => {
          console.log("Not Posted!!");
          console.log(err);
        });
    }
  };
  useEffect(() => {
    axios
      .get("/user")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Status]);

  return (
    <>
      {Data.map((item) => {
        return (
          <div
            className="user"
            key={item._id}
            style={{ display: item.status === "Follow" && "inline-block" }}
          >
            <img className="userImage" src={user} alt="" />
            <span className="userName">{item.name}</span>
            <p>
              <span> Followers: {item.followers.length} </span>
              <span> Followings: {item.followings.length}</span>
            </p>
            <button
              className="userButton"
              value={item.name}
              name={item.status}
              onClick={handleClick}
            >
              {item.status}
            </button>
            <div style={{ display: item.status === "Follow" && "none" }}>
              <hr />
              <h1>People You may know</h1>
              {item.followers.map((newitem) => (
                <div className="userFollower" key={newitem._id}>
                  <img className="userFollowerImg" src={user} />
                  <div className="userFollowerDiv">
                    <span className="userFollowerName">{newitem.follower}</span>
                    <button>Follow</button>
                  </div>
                </div>
              ))}
              <hr />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default User;
