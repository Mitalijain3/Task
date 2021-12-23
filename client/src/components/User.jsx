import React,{useState,useEffect} from 'react'
import axios from "axios"
import user1 from '../images/user1.jpg'
const User = () => {
    const [Status,setStatus]= useState("Follow");
    const [Data,setData]= useState([ ]);
const handleClick=(e)=>{
const user=e.target.value;
const name=e.target.name;
setStatus(name);
console.log(Status);
    Status==="Follow"?setStatus("Following"):setStatus("Follow");
    if( Status==="Follow"){
    axios({
        method:'delete',
        url:'/user',
        data:{user,Status}
    }).then((response)=>{
        console.log(response.data.message);
     })
     .catch((err)=>{
        console.log("Not Posted!!");
         console.log(err);
     });
    }else{
        axios({
            method:'patch',
            url:'/user',
            data:{user,Status}
        }).then((response)=>{
            console.log(response.data.message);
         })
         .catch((err)=>{
            console.log("Not Posted!!");
             console.log(err);
         });
    }
}
useEffect(() => {
    axios.get('/user')
    .then((response)=>{
       setData(response.data);
    })
    .catch((err)=>{
        console.log(err);
    });
},[Status]);


    return (
        <>
       {Data.map((item)=>{return(
        <div key={item._id} style={{display:"inline-block",margin:"30px"}}>
            <img src={user1} alt="" style={{borderRadius:"50%",marginTop:"10px"}}/>
            <span style={{display:"block",fontSize:"20px",fontWeight:"500"}} >{item.name}</span>
            <p>Followers:{item.followers.length}
            </p>
            <p>Followings:{item.followings.length}
            </p>
            <button value={item.name} name={item.status} onClick={handleClick}>{item.status}</button>
<div style={{display:item.status==="Follow"&&"none"}}>
    <hr />
    <h1>People You may know</h1>
            {item.followers.map((newitem)=><div  key={newitem._id} style={{display:"inline-block",margin:"30px"}}> <img src={user1} alt="" style={{borderRadius:"50%",marginTop:"10px"}}/>
           <div style={{display:"block"}}>
            <span style={{fontSize:"20px",fontWeight:"500",display:"block"}} >{newitem.follower}</span>
            <button>Follow</button></div>
            </div>)}
            <hr />
            </div>
        </div>); })}
        </>
    )
}

export default User;
