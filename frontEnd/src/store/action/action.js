// Actions for Alert
export const  setAlert = (parameters)=>{
    return {
        type : 'NOTIFY',
        payload : parameters
    }
}
// Actions for Auth
export const  setAuth = (parameters)=>{
    return {
        type : 'AUTH',
        payload : parameters
    }
}
// Actions for change to dark mode
export const  setMode = (parameters)=>{
    return {
        type : 'MODE',
        payload : parameters
    }
}
// Actions for change to dark mode
export const  setTab = (parameters)=>{
    return {
        type : 'TAB',
        payload : parameters
    }
}
// Actions for change to dark mode
export const  setForm = (parameters)=>{
    return {
        type : 'FORM',
        payload : parameters
    }
}