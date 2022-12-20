// This file contains store creation code
import {createStore} from 'redux'
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// global
import globalReducer from './reducer/index'

// initial state in Local-storage
const persistConfig = {
    key : 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig,globalReducer) // saving the states into localstorage for after refresh use 

const store = createStore(persistedReducer) // passing persistedReducer for store  
const persistor = persistStore(store);

export {store ,persistor};