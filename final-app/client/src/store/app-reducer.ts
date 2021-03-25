import {BaseThunkType, InferActionsTypes} from "."
import {IError} from "../types/types"
import {getUserTC} from "./profile-reducer"

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
        case "CA/APP/TOGGLE_FETCHING":
            return {
                ...state,
                isFetching: action.event
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
    toggleFetching: (event: boolean) => ({type: 'CA/APP/TOGGLE_FETCHING', event} as const),
    setError: (err: IError | null) => ({type: 'CA/APP/SET_ERROR', err} as const),
    setAuthorized: (event: boolean) => ({type: 'CA/PROFILE/SET_AUTHORIZED', event} as const)
}

export const initializeAppTC = (): ThunkType => async (dispatch, getState) => {
    if (!getState().app.initialized) {
        let storage = localStorage.getItem('CA/userID')
        if (storage) {
            let id = JSON.parse(storage)
            let response = await dispatch(getUserTC(id))
            if (response) {
                dispatch(actions.setAuthorized(true))
            }
        }
    }
    dispatch(actions.setInitialized(true))
}

export const ShowErrorTC = (err: IError, time: number = 3000): ThunkType => async (dispatch) => {
    dispatch(actions.setError(err))
    setTimeout(() => dispatch(actions.setError(null)), time)
}

type StateType = typeof initialState
export type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
export default appReducer