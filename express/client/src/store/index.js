import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {toDoSlice} from "./todoReducer";

const rootReducer = combineReducers({
    toDo: toDoSlice.reducer,
});

const middleware = getDefaultMiddleware({thunk: true})

export const store = configureStore({
    reducer: rootReducer,
    middleware
});

store.subscribe(() => {
    localStorage['lastTodo'] = JSON.stringify(store.getState().toDo.lastTask);
})


window.store = store;
