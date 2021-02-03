import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {toDoSlice} from "./todoReducer";

const rootReducer = combineReducers({
    toDo: toDoSlice.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
})

store.subscribe(() => {
    localStorage['todo'] = JSON.stringify(store.getState());
})


window.store = store;
