import {BaseThunkType, InferActionsTypes} from "."
import {IUser, methodsTypes} from "../types/types"
import {actions as appActions, ShowErrorTC, ActionsType as appActionsTypes} from './app-reducer';

let initialState = {
    profile: null as IUser | null
}

const profileReducer = (state = initialState, action: ActionTypes): StateType => {
    switch (action.type) {
        case "CA/PROFILE/SET_PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "CA/PROFILE/TOGGLE_FAV_USER":
            let favList
            if (action.event) {
                if (!state.profile?.favorites) {
                    favList = [action.id]
                } else {
                    favList = [...state.profile.favorites, action.id]
                }
            } else {
                favList = state.profile?.favorites?.filter(e => e !== action.id)
            }
            return {
                ...state,
                profile: {
                    ...state.profile,
                    favorites: favList
                } as IUser
            }
        case "CA/PROFILE/LOG_OUT":
            return {
                ...state,
                profile: null
            }
        default:
            return state
    }
}

export const actions = {
    setProfile: (profile: IUser | null) => ({type: 'CA/PROFILE/SET_PROFILE', profile} as const),
    toggleFavoriteUser: (id: number, event: boolean) => ({type: 'CA/PROFILE/TOGGLE_FAV_USER', id, event} as const),
    clearProfile: () => ({type: 'CA/PROFILE/LOG_OUT'} as const)
}

export const getUserTC = (id: number): ThunkType<Promise<boolean>> => async (dispatch) => {
    let response = await ajax('/api/getUser','POST', {id})
    let jsonResp = await response.json()
    if (response.status === 200) {
        const profile = jsonResp.data
        dispatch(actions.setProfile(profile))
        return Promise.resolve(true)
    } else {
        dispatch(ShowErrorTC(jsonResp))
        return Promise.resolve(false)
    }
}

export const LogOutTC = (): ThunkType => async (dispatch) => {
    dispatch(appActions.setAuthorized(false))
    dispatch(actions.clearProfile())
    localStorage.removeItem('CA/userID')
}

export const changeFavoriteUserTC = (userId: number, contactId: number, event: boolean): ThunkType => async (dispatch) => {
    const data = await ajax('/')
}

const ajax = (url: string, method: methodsTypes, body = {}): Promise<any> => {
    let settings: any = {
        method,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": 'http://localhost:8000/'
        }
    }
    if (Object.keys(body).length > 0) {
        settings["body"] = JSON.stringify(body)
    }
    return fetch( url, settings)
}

type StateType = typeof initialState
export type ActionTypes = InferActionsTypes<typeof actions>
type ThunkType<P = Promise<void>> = BaseThunkType<ActionTypes | appActionsTypes, P>
export default profileReducer