const initialAlert = {
    open  : false,
    message : null,
    variant : null
}

export const alert = (state = initialAlert, action)=>{
    switch (action.type) {
        case 'NOTIFY':
            return state = action.payload;
        default:
            return state;
    }
}

const initialAuth = {
    isAuth : false,
    role : null,
    token : null,
    
}

export const auth = (state = initialAuth, action)=>{
    switch (action.type) {
        case 'AUTH':
            return state = action.payload;
        default:
            return state;
    }
}
const initialMode = {
   type : false
    
}

export const mode = (state = initialMode, action)=>{
    switch (action.type) {
        case 'MODE':
            return state = action.payload;
        default:
            return state;
    }
}
const initialTab = {
   open : false
}

export const tab = (state = initialTab, action)=>{
    switch (action.type) {
        case 'TAB':
            return state = {open  : action.payload.open};
        default:
            return state;
    }
}
const initialForm = {
    state: false,
    formType: null,
    payload : null,
    row : null,
    setRow : null
    
}

export const form = (state = initialForm, action)=>{
    switch (action.type) {
        case 'FORM':
            return state = action.payload;
        default:
            return state;
    }
}