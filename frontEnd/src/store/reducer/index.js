import {combineReducers} from 'redux'

// reducers 
import {alert,auth,mode,tab,form} from './utility'

const  globalReducer= combineReducers({
    alert,
    auth,
    mode,
    tab,
    form
})

export default globalReducer;