import { onAuthStateChanged } from "firebase/auth";
import {createContext,useContext,useEffect,useReducer,useState} from "react";
import {auth} from "../Backend/auth";
import { AuthContext } from "./AuthContext";


export const ChatContext=createContext();

export const ChatContextProvider=({children})=>{
    const {currentUser} =useContext(AuthContext);
    const INITTIAL_STATE={
        chatId:"null",
        user:{}
    }
    const chatReducer=(state,action)=>{
        switch(action.type){
            case "CHANGE_USER":
                return {
                    user:action.payload,
                    chatId:
                     currentUser.uid>action.payload 
                     ? currentUser.uid+action.payload 
                     : action.payload +currentUser.uid,
                }
                
                default:
                    return state
        }

    }
    const [state,dispatch]=useReducer(chatReducer,INITTIAL_STATE);
    return(
<ChatContext.Provider value={{data:state,dispatch}}>
        {children}

    </ChatContext.Provider>
    );
    
};