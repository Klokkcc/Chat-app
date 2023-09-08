import Home from "./strony/home";
import React, { useContext } from "react";
import Register from "./strony/register";
import Login from "./strony/login";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./app.css"
import { AuthContext } from "./context/AuthContext";

const App =()=> {
  const{currentUser}=useContext(AuthContext);
  const [loading,setLoading]=useState(false);
  const showLogin = () => {
    if (window.location.pathname === "/") {
      return <Login />
    }
  }
  
  const showRegister = () => {
    if (window.location.pathname === "/register") {
      return <Register />
    }
  }
  
  const showHome = () => {
    if (window.location.pathname === "/home") {
      return <Home /> 
    }
  }
  useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
    },1000);
  },[]);

 
  return(
    <div id="App">
    {loading? (
      <ClipLoader id="loading"
        color={"#1c00ff"}
        loading={loading}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    ):(
      <div>
      {currentUser ? showHome() : window.location.pathname === "/" }
        {showLogin()}
        {showRegister()}


      </div>
        
    )
  }
     
      
    
    
    



  </div>

  );



  
 }; 
    


export default App;
 




