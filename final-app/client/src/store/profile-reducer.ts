import {BaseThunkType, InferActionsTypes} from "."
import {IContact, IUser, methodsTypes} from "../types/types"
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
        case "CA/CONTACTS/TOGGLE_FAV_USER":
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
        case "CA/CONTACTS/DELETE_CONTACT":
            return {
                ...state,
                profile: {
                    ...state.profile,
                    contacts: state.profile?.contacts.filter(e => e.id !== action.id)
                } as IUser
            }
        case "CA/CONTACTS/EDIT_USER_DATA":
            const updatedContacs = state.profile?.contacts.map((e) => e.id === action.data.id ? action.data : e)
            return {
                ...state,
                profile: {
                    ...state.profile,
                    contacts: updatedContacs
                } as IUser
            }
        default:
            return state
    }
}

export const actions = {
    setProfile: (profile: IUser | null) => ({type: 'CA/PROFILE/SET_PROFILE', profile} as const),
    toggleFavoriteUser: (id: number, event: boolean) => ({type: 'CA/CONTACTS/TOGGLE_FAV_USER', id, event} as const),
    deleteContact: (id: number) => ({type: 'CA/CONTACTS/DELETE_CONTACT', id} as const),
    addContact: (contact: IContact) => ({type: 'CA/CONTACTS/ADD_CONTACT', contact} as const),
    editUserData: (data: IContact) => ({type: 'CA/CONTACTS/EDIT_USER_DATA', data} as const)
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

export const changeFavoriteUserTC = (contactId: number, event: boolean): ThunkType => async (dispatch, getState) => {
    dispatch(actions.toggleFavoriteUser(contactId, event))
    const userId = getState().profile.profile?.id
    let response
    if (event) {
        response = await ajax('/api/user/favorite', 'PUT', {userId, id: contactId})
    } else {
        response = await ajax('/api/user/favorite', 'DELETE', {userId, id: contactId})
    }
    if (response.status !== 200) {
        dispatch(actions.toggleFavoriteUser(contactId, !event))
        if (response.status === 500) {
            const data = await response.json()
            dispatch(ShowErrorTC(data))
        } else  {
            dispatch(ShowErrorTC({message: 'Server error. Something wrong'}))
        }
    }
}

export const deleteContactTC = (id: number): ThunkType => async (dispatch, getState) => {
    const userId = getState().profile.profile?.id
    const deletedContact = getState().profile.profile?.contacts.find(e => e.id === id)
    dispatch(actions.deleteContact(id))
    let response = await ajax('/api/user/contact', 'DELETE', {userId, id})
    if (response.status !== 200) {
        if (deletedContact) {
            dispatch(actions.addContact(deletedContact))
        }
        if (response.status === 500) {
            const data = await response.json()
            dispatch(ShowErrorTC(data))
        } else  {
            dispatch(ShowErrorTC({message: 'Server error. Something wrong, user cant be deleted'}))
        }
    }
}

export const LogOutTC = (): ThunkType => async (dispatch) => {
    dispatch(appActions.setAuthorized(false))
    dispatch(actions.setProfile(null))
    localStorage.removeItem('CA/userID')
}

export const editContactDataTC = (data: IContact): ThunkType => async (dispatch, getState) => {
    const userId = getState().profile.profile?.id
    const currentContactState = getState().profile.profile?.contacts.find(e => e.id === data.id);
    dispatch(actions.editUserData(data))
    let response = await ajax('/api/user/contact/edit', 'PUT', {userId, contact: data})
    if (response.status !== 200) {
        dispatch(actions.editUserData(currentContactState as IContact))
        if (response.status === 500) {
            const data = await response.json()
            dispatch(ShowErrorTC(data))
        } else  {
            dispatch(ShowErrorTC({message: 'Server error. Something wrong, user`s info can`t be changed'}))
        }
    }
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