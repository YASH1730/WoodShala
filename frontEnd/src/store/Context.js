import { useContext, useReducer, createContext } from "react";
import {globalSwitch} from './Reducer'

const GlobalContext = createContext();

// function for exporting reducer 
const Context  = ({children})=>{

    // reducer initialization 
    const [state,dispatch] = useReducer(globalSwitch,{
        Auth : {
            isLogin : false,
            WDToken : null,
            role : null
        },
        Notify : {
            variant : undefined,
            message : undefined,
            open : false
        },
        DarkMode : {
            mode : false
        },
        SideTabs : {
            open : false
        },
        OpenBox : {
            state: false,
            formType: null,
            payload : null,
            row : null,
            setRow : null
        }
    });
    

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}

// this for component file to import and perform function
export const Store = () => {
    return useContext(GlobalContext)
}
// this for index.js main file to render it as global state
export default Context;

