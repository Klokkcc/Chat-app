import  { useState } from 'react';
import { auth ,db} from '../Backend/auth';
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc,collection, query, where,getDocs } from "firebase/firestore"; 
import { updateProfile } from 'firebase/auth';
import "./re.css";
import Link from  "../Backend/Links"
import React from 'react';
const Register=()=>{
   const [visible,setVisible]=useState("none");
   const [texta,setTexta]=useState("none");
   const [user,setUser]=useState("");
   const[approve,setApprove]=useState("true");
   let input1=document.querySelector("#nick");
   let input2=document.querySelector("#haslo");
   let input3=document.querySelector("#email");
   let input4=document.querySelector("#haslo2");
    let nick;
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[password2,setPassword2]=useState('');
    
    const regi=async (e)=>{
        
        
      
        
       if(password===password2){
        let zupa="";
        const q = query( 
            collection(db, "users"),
          where("Username", "==", user)
          
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            
            if(doc.data().Username===user){
                console.log(user);
                console.log(doc.data().Username)
                zupa="zupa";
            }
        });
        console.log(zupa);
       if(zupa!="zupa"){
        try{
            const res= await createUserWithEmailAndPassword(auth, email, password);
           
            updateProfile(auth.currentUser, {
               displayName: user
           });
             let userId=auth.currentUser.uid;
             
             console.log(res);
               
             await setDoc(doc(db, "users", userId), {
               Username: user,
               email: email,
               password: password,
               ID:userId
             });
            
           

           window.history.pushState({}," ", "/");
           window.location.reload(false);

       }catch(err){
                input1.value="";
                input2.value="";
                input3.value="";
                input4.value="";
           
               setTexta("Accaunt with this email already exists**");
               setVisible("flex");
           
               
               console.log(err);
          }

       }
       else{
                input1.value="";
                input2.value="";
                input3.value="";
                input4.value="";
        setTexta("Accaunt with this nick already exists");
        setVisible("flex");
       }
        
            
            
        
        
       }else{
                input1.value="";
                input2.value="";
                input3.value="";
                input4.value="";
        setTexta("Invalid password**");
        setVisible("flex");
       }
    }
    const  sprawdz_czy_enter=(e)=>{
        e.code==='Enter' && regi();
    }

      
    window.history.pushState({}, " ", window.location.href);
    window.addEventListener('popstate', function(event) {
      window.history.pushState({}, " ", window.location.href);
    });
   
    return(
        <div id="tlo">
        <span id="title">DywTalk</span>
            <div id="okienko2"> 
                
                <input id="nick" placeholder='Nick' onChange={(e)=>setUser(e.target.value)}></input>
                <input id="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}></input>
                <input type="password" id="haslo" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}></input>
                <input type="password" id="haslo2" placeholder='Repeat password' onChange={(e)=>setPassword2(e.target.value)} onKeyDown={sprawdz_czy_enter}></input>
                <span id="zle_haslo" style={{display:visible}}>{texta}</span>
                <button id="dolacz" onClick={regi}>REGSITER</button>
                <span id="pytanie">Registered?<span> </span><Link href="/" className="item">Login</Link></span>
                

            
            </div>
        </div>




    );

}
export default Register;