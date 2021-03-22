import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import appReducer from "./app-reducer";
import contactsReducer from "./contacts-reducer";

let reducersBranch = combineReducers({
    app: appReducer,
    contacts: contactsReducer,
})

const store = createStore(reducersBranch, applyMiddleware(thunkMiddleware))

export type StoreType = ReturnType<typeof reducersBranch>

export type inferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<AT extends Action, P = Promise<void>> = ThunkAction<P, StoreType, unknown, AT>

export default store