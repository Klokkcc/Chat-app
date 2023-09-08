import { onValue } from "firebase/database";
import React, { useEffect } from "react";
import "./conversation.css";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { doc } from "firebase/firestore";
const Message=({message})=>{
    const {currentUser}=useContext(AuthContext); 
    const ID1=message.senederid;
    const ID2=currentUser.uid;
    const ele=document.querySelector("#message");
    if(ID1===ID2&& window.innerWidth<600){
        return(
            <span id="message" style={{left:"100px"}}>{message.mes}</span>
        )
    }else if(ID1!==ID2&& window.innerWidth<600){
        return(
            <span id="message" style={{left:"10px"}}>{message.mes}</span>
        ) 
    }
    else if(ID1===ID2){
        return(
            <span id="message" style={{left:"300px"}}>{message.mes}</span>
        )
    }else{
        return(
            <span id="message" style={{left:"50px"}}>{message.mes}</span>
        )
    }

   




}
export default Message;