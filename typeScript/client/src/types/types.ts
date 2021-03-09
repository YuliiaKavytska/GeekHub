export interface todoType {
    id: number
    task: string
    status: "active" | "completed"
    editing: boolean | undefined
}

export interface mainRespType {
    success: boolean
    message?: string
    task: string
    id: number
}

export type FilterType = 'all' | 'todo' | 'item' | "active" | "completed"
