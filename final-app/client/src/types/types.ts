export interface IPhone {
    _id: number
    number: string
}

export type IContact<A = string> = {
    [key: string]: any
    _id: number
    name: string
    avatar: A
    email: string
    address: string
    comment: string
    isFavorite: boolean
    phones: Array<IPhone>
}

export interface IUser {
    _id: number
    email: string
    name: string
    contacts: Array<IContact> | null
}

export interface IError {
    message: string
}

export interface IRegisterData {
    name: string
    email: string
    password: string
}

export interface ILogin {
    email: string
    password: string
}

export type methodsTypes = 'GET' | 'POST' | 'PUT' | 'DELETE'