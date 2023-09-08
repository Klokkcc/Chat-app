import { collection, query, where, getDoc,setDoc, updateDoc, serverTimestamp, doc,getDocs } from "firebase/firestore";
import {db} from "../Backend/auth";
import React, { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { SeContext} from "../context/SecContext";
import "./hom.css"
const Search=()=>{
    const [seuser,setSeuser]=useState("none");
    const [ifuser,setIfuser]=useState(null);
    const {currentUser}=useContext(AuthContext);
    const {dispatch}=useContext(ChatContext);
    const {dispatch1}=useContext(SeContext);
    const pobieranie_user=async()=>{
        const q = query( 
            collection(db, "users"),
          where("Username", "==", seuser)
          
        );
      try{
        if(!seuser){
          setIfuser(null);
        }else{
          const querySnapshot = await getDocs(q);
        
          querySnapshot.forEach((doc) => {
            setIfuser(doc.data());
          });
        }
       
      }catch(err){
        console.log(err);
      }
        
      }
    const  sprawdz_czy_enter=(e)=>{ 
        e.code==='Enter'&& pobieranie_user();
        
           
    }
    const inputv=document.querySelector("#search");
    const setinputv=()=>{
      inputv.value="";
    }
    const go_to_conversation=async()=>{
      setinputv();
      const superID= currentUser.uid>ifuser.ID ? currentUser.uid+ifuser.ID : ifuser.ID+currentUser.uid;
      
      try{
        const res=await getDoc(doc(db,"chats",superID));
        if(!res.exists()){
          await setDoc(doc(db, "chats", superID), {messages:[]});
          const ID1=ifuser.ID;
          const ID2=currentUser.uid;
          await setDoc(doc(db,"userChats",ID1),{});
          await setDoc(doc(db,"userChats",ID2),{});
          await updateDoc(doc(db,"userChats",ID2),{
            [superID+".userInfo"]:{
              uid:ifuser.ID,
              displayName:ifuser.Username

            },
            [superID+".date"]:serverTimestamp()
          })
          
          await updateDoc(doc(db,"userChats",ID1),{
            [superID+".userInfo"]:{
              uid:currentUser.uid,
              displayName:currentUser.displayName

            },
            [superID+".date"]:serverTimestamp()
          })
        }
      }catch(err){
        console.log(err);

      }
      dispatch1({type:"CHANGE_USER",payload:ifuser.Username});
      dispatch({type:"CHANGE_USER",payload:ifuser.ID});
      setIfuser(null);
      setSeuser(null);
      

    }


    return(
      
            <div>
                <input id="search" placeholder="  Search" onChange={e=>setSeuser(e.target.value)} onKeyDown={sprawdz_czy_enter}></input>
                 
                  
                   
                   {ifuser && <div id="user" onClick={go_to_conversation}>
                     <img src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg" id="zdjencie2"></img>
                     <span id="nickname">{ifuser.Username}</span>
                    </div>
                   }
                   

            </div>
      
      
                




    )
}
export default Search;