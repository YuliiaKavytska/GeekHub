export interface todoType {
    id: number
    task: string | undefined
    status: "active" | "completed"
    editing: boolean
}

export interface mainRespType {
    success: boolean
    message?: string
    task: string
    id: number
}

export type FilterType = 'all' | 'todo' | 'item' | "active" | "completed"
