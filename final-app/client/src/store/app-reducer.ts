import {BaseThunkType, InferActionsTypes} from "."
import {IError, IRegisterDate} from "../types/types"
import {getUserTC} from "./profile-reducer"
import {ajax} from "./commonFunktion";

let initialState = {
    initialized: false,
    isFetching: true,
    error: null as IError | null,
    isAuth: false
}

const appReducer = (state = initialState, action: ActionsType): StateType => {
    switch (action.type) {
        case "CA/APP/SET_INITIALIZED":
            return {
                ...state,
                initialized: action.event
            }
        case "CA/APP/SET_ERROR":
            return {
                ...state,
                error: action.err
            }
        case "CA/PROFILE/SET_AUTHORIZED":
            return {
                ...state,
                isAuth: action.event
            }
        default:
            return state
    }
}

export const actions = {
    setInitialized: (event: boolean) => ({type: 'CA/APP/SET_INITIALIZED', event} as const),
    setError: (err: IError | null) => ({type: 'CA/APP/SET_ERROR', err} as const),
    setAuthorized: (event: boolean) => ({type: 'CA/PROFILE/SET_AUTHORIZED', event} as const)
}

export const initializeAppTC = (): ThunkType => async (dispatch, getState) => {
    let storage = localStorage.getItem('CA/user')
    if (storage) {
        let userData = JSON.parse(storage)
        if (userData.hasOwnProperty('email') && userData.hasOwnProperty('password')) {
            console.log(userData)
            let response = await dispatch(getUserTC(userData))
            console.log(response)
            if (response) {
                dispatch(actions.setAuthorized(true))
            }
        } else {
            await dispatch(ShowErrorTC({message: 'Your data is incorrect. Log In with correct login and password'}))
        }
    }
    if (!getState().app.initialized) dispatch(actions.setInitialized(true))

}

export const RegisterTC = (data: IRegisterDate): ThunkType<Promise<boolean>> => async (dispatch) => {
    await localStorage.setItem('CA/user', JSON.stringify({email: data.email, password: data.password}))
    let response = await ajax('/api/register', 'POST', data)

    if (response.status === 200) {
        return true
    } else {
        let data = await response.json()
        await dispatch(ShowErrorTC(data))
        return false
    }
}

export const LogInTC = (data: { email: string, password: string }): ThunkType => async (dispatch) => {
    localStorage.setItem('CA/user', JSON.stringify({email: data.email, password: data.password}))
    await dispatch(initializeAppTC())
}

export const ShowErrorTC = (err: IError, time: number = 3000): ThunkType => async (dispatch) => {
    dispatch(actions.setError(err))
    setTimeout(() => dispatch(actions.setError(null)), time)
}

type StateType = typeof initialState
export type ActionsType = InferActionsTypes<typeof actions>
type ThunkType<T = Promise<void>> = BaseThunkType<ActionsType, T>
export default appReducer