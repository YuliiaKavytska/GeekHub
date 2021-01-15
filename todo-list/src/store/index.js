import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {toDoSlice} from "./todoReducer";

const rootReducer = combineReducers({
    toDo: toDoSlice.reducer,
})

export const store = configureStore({
    reducer: rootReducer
})

window.store = store;

// store.dispatch(incremented())