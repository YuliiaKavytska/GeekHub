import {createSlice, PayloadAction, ThunkAction} from '@reduxjs/toolkit'
import {FilterType, todoType} from "../types/types"

let initialState = {
    list: [] as Array<todoType>,
    lastTask: '',
    countOfActiveTasks: 0,
    filter: 'all' as FilterType,
    filterResult: [] as Array<todoType>,
    error: null as string | null | undefined
}

type StateType = typeof initialState

export const toDoSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        setTodos: (state: StateType, action: PayloadAction<{ list: Array<todoType>, lastTask: string }>): void => {
            const {list, lastTask} = action.payload
            state.list = list
            state.lastTask = lastTask
            state.filterResult = list
            state.countOfActiveTasks = list.filter((e: todoType) => e.status === 'active').length
            state.error = null
        },
        changeItemStatus: (state: StateType, action: PayloadAction<{ id: number }>): void => {
            const element = state.list.findIndex(e => e.id === action.payload.id)
            if (state.list[element].status === 'active') {
                state.list[element].status = 'completed'
            } else {
                state.list[element].status = 'active'
            }
            state.countOfActiveTasks = state.list.filter(e => e.status === 'active').length
            state.filterResult = state.list
            state.filter = 'all'
            state.error = null
        },
        changeEditing: (state: StateType, action: PayloadAction<{ caseType?: boolean, id: number | null }>): void => {
            const {id, caseType} = action.payload
            const item = state.list.find(e => e.id === id)
            // рассматриваем случай. мы тыкнули в другом месте или сделали двойной клик?
            // если в другом месте, то это false, а если двойной то нулл
            // если мы тыкнули два раза, тогда мы меняем статус редактирования
            // но если мы тыкнули в другом месте то в этом лучаем мы ВСЕГДА просто ВЫКЛЮЧАЕМ редактирование
            if (item) {
                item.editing = caseType && !item.editing
            }
            state.filterResult = state.list
        },
        setChangedTask: (state: StateType, action: PayloadAction<{ id: number, task: string }>): void => {
            const {id, task} = action.payload
            state.list = state.list.map(e => e.id === id ? {...e, task} : e)
            state.filterResult = state.list
        },
        changeItemTask: (state: StateType, action: PayloadAction<{ id: number, task: string }>): void => {
            const {id, task} = action.payload
            const item = state.list.find(e => e.id === id)
            if (item) {
                item.task = task
            }
            state.filterResult = state.list
            state.error = null
        },
        addItem: (state: StateType, action: PayloadAction<{ task: string }>): void => {
            if (state.lastTask) {
                let {task} = action.payload
                const id = state.list.length > 0 ? state.list[state.list.length - 1].id + 1 : 1
                state.list.push({id, task, status: 'active', editing: false})
                state.lastTask = ''
                state.countOfActiveTasks += 1
                state.filterResult = state.list
                state.filter = 'all'
            }
            state.error = null
        },
        deleteItem: (state: StateType, action: PayloadAction<{ id: number }>): void => {
            state.list = state.list.filter(e => e.id !== action.payload.id)
            state.countOfActiveTasks = state.list.filter(e => e.status === 'active').length
            state.filterResult = state.list
            state.filter = 'all'
            state.error = null
        },
        deleteCompleted: (state: StateType): void => {
            state.list = state.list.filter(e => e.status !== 'completed')
            state.filterResult = state.list
            state.error = null
        },
        changeLastTask: (state: StateType, action: PayloadAction<{ task: string }>): void => {
            state.lastTask = action.payload.task
            state.error = null
        },
        completedAll: (state: StateType): void => {
            const foundActive = state.list.every(item => item.status === 'active') ||
                state.list.some(item => item.status === 'active')
            if (foundActive) {
                state.list.forEach((item) => {
                    item.status = 'completed'
                })
                state.countOfActiveTasks = 0
            } else {
                state.list.forEach((item) => {
                    item.status = 'active'
                })
                state.countOfActiveTasks = state.list.length
            }
            state.filterResult = state.list
            state.error = null
        },
        changeFilter: (state: StateType, action: PayloadAction<{ filter: FilterType, id: number | null }>): void => {
            switch (action.payload.filter) {
                case 'all' :
                    state.filterResult = state.list
                    state.filter = 'all'
                    break
                case 'active' :
                    state.filterResult = state.list.filter(el => el.status !== 'completed')
                    state.filter = 'active'
                    break
                case 'completed' :
                    state.filterResult = state.list.filter(el => el.status !== 'active')
                    state.filter = 'completed'
                    break
                case 'item' :
                    state.filterResult = state.list.filter(el => el.id === action.payload.id)
                    state.filter = 'all'
                    break
                default:
                    return
            }
            state.countOfActiveTasks = state.list.filter(el => el.status === 'active').length
            state.error = null
        },
        setErrorResponse: (state: StateType, action: PayloadAction<{ error: string | null | undefined }>): void => {
            state.error = action.payload.error
        }
    }
})

export const getUsersTC = (filter: FilterType, id: null | number = null, editingMode: boolean | null = null):
    ThunkAction<void, StateType, unknown, any> => (dispatch) => {
    ajax('/api/all', 'GET').then(response => {
        const resultPromise = response.json()
        if (response.status === 200) {
            resultPromise.then(data => {
                dispatch(setTodos({list: data.list, lastTask: data.lastTask}))
                dispatch(changeFilter({filter, id}))
                if (editingMode) {
                    dispatch(changeEditing({id}))
                }
            })
        } else {
            resultPromise.then(data => {
                dispatch(setErrorResponse({error: data.message}))
            })
        }
    })
}

export const updateLastMessageTC = (text: string): void => {
    ajax('/api/lastTask', 'PUT', {text})
}

export const completeAllTC = (): void => {
    ajax('/api/completeAll', 'GET')
}

export const changeStatusTC = (id: number): void => {
    ajax('/api/changeTodo', 'PUT', {id})
}

export const deleteTodoTC = (id: number): void => {
    ajax('/api/changeTodo', 'DELETE', {id})
}

export const addNewTodoTC = (lastTask: string): void => {
    ajax('/api/newTodo', 'POST', {task: lastTask})
}

export const deleteCompletedTC = (): void => {
    ajax('/api/deleteCompleted', 'DELETE')
}

export const changeTodoTC = (id: number, task: string): void => {
    ajax('/api/changeTodo', 'POST', {id, task})
}

type HttpMethodsType = 'GET' | 'PUT' | 'POST' | 'DELETE'

interface SettingsType {
    method: HttpMethodsType
    headers: { "X-Requested-With": "XMLHttpRequest", "Content-Type": "application/json" }

    [body: string]: { [key: string]: string | number } | string
}

let ajax = (url: string, method: HttpMethodsType, body = {}): Promise<Response> => {
    let settings: SettingsType = {
        method,
        headers: {"X-Requested-With": "XMLHttpRequest", "Content-Type": "application/json"}
    }
    if (Object.keys(body).length !== 0) {
        settings['body'] = JSON.stringify(body)
    }
    return fetch(url, settings)
}

export const {
    setTodos,
    changeItemStatus,
    changeItemTask,
    changeEditing,
    setChangedTask,
    addItem,
    deleteItem,
    deleteCompleted,
    changeLastTask,
    completedAll,
    changeFilter,
    setErrorResponse
} = toDoSlice.actions
