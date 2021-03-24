export interface IPhone {
    id: number
    number: string
}

interface IObjectKeys {
    [key: string]: string | number | null | Array<IPhone>
}

export interface IContact extends IObjectKeys {
    id: number
    name: string
    avatar: string
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