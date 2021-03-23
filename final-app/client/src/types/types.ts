export interface IPhone {
    id: number
    number: string
}
export interface IContact {
    id: number
    name: string
    avatar: string | null
    email: string | null
    address: string | null
    comment: string | null
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