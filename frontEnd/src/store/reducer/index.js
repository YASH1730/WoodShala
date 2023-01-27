import { combineReducers } from 'redux'

// reducers 
import { alert, auth, mode, tab, form, refresh } from './utility'

const globalReducer = combineReducers({
    alert,
    auth,
    mode,
    tab,
    form,
    refresh
})

export default globalReducer;