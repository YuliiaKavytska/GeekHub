export interface IPhone {
    id: number
    number: string
}

export type IContact<A = string> = {
    [key: string]: any
    id: number
    name: string
    avatar: A
    email: string
    address: string
    comment: string
    phones: Array<IPhone>
}

export interface IUser {
    id: number
    email: string
    name: string
    favorites: Array<number> | null
    contacts: Array<IContact>
}

export interface IError {
    message: string
}

export type methodsTypes = 'GET' | 'POST' | 'PUT' | 'DELETE'