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
    const response = await ajax('/api/getUser', 'POST', {id})
    const jsonResp = await response.json()
    if (response.status === 200) {
        const profile = jsonResp.data
        dispatch(actions.setProfile(profile))
        return true
    }
    await dispatch(ShowErrorTC(jsonResp))
    return false
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
            await dispatch(ShowErrorTC(data))
        } else {
            await dispatch(ShowErrorTC({message: 'Server error. Something wrong'}))
        }
    }
}

export const deleteContactTC = (id: number): ThunkType => async (dispatch, getState) => {
    const deletedContact = getState().profile.profile?.contacts.find(e => e.id === id)
    dispatch(actions.deleteContact(id))
    const userId = getState().profile.profile?.id
    const response = await ajax('/api/user/contact', 'DELETE', {userId, id})
    if (response.status !== 200) {
        if (deletedContact) {
            dispatch(actions.addContact(deletedContact))
        }
        if (response.status === 500) {
            const data = await response.json()
            await dispatch(ShowErrorTC(data))
        } else {
            await dispatch(ShowErrorTC({message: 'Server error. Something wrong, user cant be deleted'}))
        }
    }
}

export const LogOutTC = (): ThunkType => async (dispatch) => {
    dispatch(appActions.setAuthorized(false))
    dispatch(actions.setProfile(null))
    localStorage.removeItem('CA/userID')
}

export const editContactDataTC = (data: IContact<string | File>): ThunkType<Promise<boolean>> => async (dispatch, getState) => {
    const currentContactState = getState().profile.profile?.contacts.find(e => e.id === data.id);

    let formData = new FormData();
    for (let key in data) {
        if (data.hasOwnProperty(key) && typeof data[key] !== 'string' && key !== 'avatar') {
            formData.append(key, JSON.stringify(data[key]))
        } else {
            formData.append(key, data[key])
        }
    }
    const userId = getState().profile.profile?.id
    if (userId) {
        formData.append('userId', userId.toString())
    }

    if (typeof data.avatar === 'object') {
        data.avatar = '/' + data.avatar.name
    }
    dispatch(actions.editUserData(data as IContact))

    let response = await fetch('/api/user/contact/edit', {method: "POST", body: formData})
    if (response.status === 200) return true

    dispatch(actions.editUserData(currentContactState as IContact))
    if (response.status === 500) {
        const data = await response.json()
        await dispatch(ShowErrorTC(data))
    } else {
        await dispatch(ShowErrorTC({message: 'Server error. Something wrong, user`s info can`t be changed'}))
    }
    return false
}

const ajax = (url: string, method: methodsTypes, body = {}): Promise<any> => {
    let settings: ISettings = {
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
    return fetch(url, settings)
}

interface  ISettings {
    [key: string]: string | object
    headers: {[key: string]: string}
    method: methodsTypes
}

type StateType = typeof initialState
export type ActionTypes = InferActionsTypes<typeof actions>
type ThunkType<P = Promise<void>> = BaseThunkType<ActionTypes | appActionsTypes, P>
export default profileReducer