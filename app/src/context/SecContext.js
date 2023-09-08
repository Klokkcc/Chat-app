
import {createContext,useContext,useEffect,useReducer,useState} from "react";



export const SeContext=createContext();

export const SeContextProvider=({children})=>{
    
    const INITTIAL_STATE={
        user:""
    }
    const chatReducer=(state,action)=>{
        switch(action.type){
            case "CHANGE_USER":
                return {
                    user:action.payload,
                }
                
                default:
                    return state
        }

    }
    const [state,dispatch1]=useReducer(chatReducer,INITTIAL_STATE);
    return(
<SeContext.Provider value={{se:state,dispatch1}}>
        {children}

    </SeContext.Provider>
    );
    
};

    
