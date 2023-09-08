import { sendEmailVerification, signOut } from "firebase/auth";
import { useState,useEffect,useContext } from "react";
import {auth} from "../Backend/auth";
import  Search  from "./search";
import {  onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { arrayUnion, doc, onSnapshot, Timestamp } from "firebase/firestore";
import {db} from "../Backend/auth"
import Conversation from "./conversation";
import Message from "./message";
import "./hom.css";
import { ChatContext } from "../context/ChatContext";
import {  updateDoc } from "firebase/firestore";
import {v4 as uuid} from "uuid";
import { SeContext, SeContextProvider } from "../context/SecContext";
const Home =()=>{
  const {currentUser}=useContext(AuthContext);
  const [chats,setChats]=useState(null);
  const {se}=useContext(SeContext);
 
  const {data}=useContext(ChatContext);
  const[mes,setMes]=useState("");
    const wyloguj=async ()=>{
        try{
           await signOut(auth);
        }catch(err){
            console.log(err);
        }
        window.history.pushState({}," ", "/");
            window.location.reload(false);
    }
    
  
    useEffect(()=>{
      const getchats=()=>{
           const unsub = onSnapshot(doc(db, "userChats", currentUser.ID), (doc) => {
           setChats(doc.data);
    
       });
    
       return ()=>{
           unsub();
        };
      }
      
      currentUser.ID && getchats();

    },[currentUser.ID])
   
     
   

  
    window.history.pushState({}, " ", window.location.href);
    window.addEventListener('popstate', function(event) {
      window.history.pushState({}, " ", window.location.href);
      
    });
    const send=async()=>{
      
        await updateDoc(doc(db,"chats",data.chatId),{
          messages:arrayUnion({
            id:uuid(),
            mes,
            senederid:currentUser.uid,
            date:Timestamp.now(),
          })
        })
      
    }
    const inputv=document.querySelector("#wysylanie");
    const setinput=()=>{
      inputv.value="";
    }
    const  sprawdz_czy_enter=(e)=>{
      e.code==="Enter" && send()&&setinput();
  }

    return(
        <div id="calosc">
       
        <div id="chat">
        
      
            <div id="menu">
                  <div id="info">
                  <span id="logo">DywTalk</span>
                    <span id="ksywa">{currentUser.displayName}</span>
                      <img src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg" id="zdjencie"></img>
                      
                  </div>
                  <Search></Search>
                  <div id="users">
                  
                  
                  
                  
                  
                  
                  
                  </div>
                 
                  
              </div>
              
                 <div id="chatinfo">
                    <span id="friend">{se.user}</span>
                 
                 
                 </div>
              
              
            <button id="kolko" onClick={wyloguj}></button>
            <Conversation/>
            <input id="wysylanie" placeholder='Message'  onKeyDown={sprawdz_czy_enter}  onChange={(e)=>setMes(e.target.value)} ></input>
           
         
          

         
            <div id="infouser"></div>
            
          </div>
          
          
       
            

        </div>

    );
}
export default Home;