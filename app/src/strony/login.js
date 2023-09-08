import { useEffect, useState } from "react";
import {  signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../Backend/auth"
import Link from  "../Backend/Links"
import "./log.css";
const Login=()=>{
    const [visible,setVisible]=useState("none");
    const [show,setShow]=useState("unshown");
    const[password,setPassword]=useState('');
    const[email,setEmail]=useState('');
   
   
    const loguj=async (e)=>{
       
        if(email, password){
            try{
               await signInWithEmailAndPassword(auth, email, password);
                window.history.pushState({}," ", "/home");
                window.location.reload(false);
            }catch(err){
                console.log(err);
                setVisible("flex");
            }
           
        }
        
  
 
    }
    const  sprawdz_czy_enter=(e)=>{
        e.code==="Enter" && loguj();
    }
   
    window.history.pushState({}, " ", window.location.href);
    window.addEventListener('popstate', function(event) {
      window.history.pushState({}, " ", window.location.href);
    });
    
    return(
        
        <div id="tlo">
          <span id="title">DywTalk</span>
          <div id="okienko"> 
            <input id="mail" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}></input>
            
            <input type="password" id="haslo" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} onKeyDown={sprawdz_czy_enter}></input>
           
            <span id="errr" style={{display:visible}}>Invalid password or email**</span>
            <button id="dolacz" onClick={loguj}>LOGIN </button>
            <span id="pytanie" >Dosen't have accaunt?<Link href="/register" className="item">Register</Link></span>
        
          </div>
    </div>



    );

   
}
export default Login;