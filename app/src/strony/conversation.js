import React, { useContext, useEffect, useState } from "react";
import Message from "./message";
import { ChatContext } from "../context/ChatContext";
import "./conversation.css";
import {db} from "../Backend/auth"
import { onSnapshot,doc } from "firebase/firestore";
const Conversation=()=>{
    const[messages,setMessages]=useState([]);
    const {data}=useContext(ChatContext);
    useEffect(()=>{
        const unsub=onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
                doc.exists() && setMessages(doc.data().messages);
                console.log(messages);
        })
        return()=>{
            unsub()
        }
        


    },[data.chatId])

    return(
    <div id="conversation">
        {messages.map((m)=>{
            return(
                
                <Message message={m} key={m.id}></Message>
            )
        })

        }

    </div>
    
        
    
    
    
    
    
    )
        



}
export default Conversation;