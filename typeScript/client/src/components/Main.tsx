import React, {useCallback, useEffect} from 'react'
import {
    changeEditing,
    changeItemStatus,
    changeItemTask,
    changeStatusTC,
    changeTodoTC,
    completeAllTC,
    completedAll,
    deleteItem,
    deleteTodoTC,
    getUsersTC,
    setChangedTask,
    setErrorResponse
} from "../store/todoReducer"
import {connect} from "react-redux"
import {useParams} from 'react-router-dom'
import Item from "./Item"
import socket from "../webSocket"
import {StateType} from "../store"
import {FilterType, mainRespType, todoType} from "../types/types"

interface IUri {
    filter: FilterType
    num: string
    edit: 'edit'
}

const Main: React.FC<PropsType> = (props) => {
    const {
        filterResult, changeEditing, changeItemStatus, changeItemTask,
        completedAll, deleteItem, getUsersTC, setChangedTask, setErrorResponse
    } = props

    const {filter, num, edit} = useParams<IUri>()

    useEffect((): void => {
        switch (filter) {
            case 'todo':
                if (num && !edit) {
                    getUsersTC('item', Number(num))
                } else if (num && edit) {
                    getUsersTC('item', Number(num), true)
                } else {
                    getUsersTC('all')
                }
                break
            case undefined:
                getUsersTC('all')
                break
            default:
                getUsersTC(filter)
        }
    }, [edit, num, filter])

    useEffect((): void => {
        socket.on('all:wasCompleted', ({success, ...data}: Omit<mainRespType, 'task' | 'id'>) => {
            success
                ? completedAll()
                : setErrorResponse({error: data.message})
        })

        socket.on('todo:wasDeleted', ({id, success, ...data}: Omit<mainRespType, 'task'>) => {
            success
                ? deleteItem({id})
                : setErrorResponse({error: data.message})
        })

        socket.on('todoStatus:wasChanged', ({id, success, ...data}: Omit<mainRespType, 'task'>) => {
            success
                ? changeItemStatus({id})
                : setErrorResponse({error: data.message})
        })

        socket.on('todo:wasChanged', ({success, id, task, ...data}: mainRespType) => {
            success
                ? setChangedTask({id, task})
                : setErrorResponse({error: data.message})
        })
    }, [])

    const completedAllCall = useCallback((): void => {
        completeAllTC()
    }, [])

    const deleteItemCall = useCallback((id: number): void => {
        deleteTodoTC(id)
    }, [])

    const changeItemStatusCall = useCallback((id: number): void => {
        changeStatusTC(id)
    }, [])

    const changeEditingCall = useCallback((id: number,
                                           itemCase: boolean | null,
                                           task: string,
                                           editing: boolean): void => {
        // мы передаем статус редактирования (editing), чтобы понять, мы его в данный момент выключаем или включаем
        // если мы его включаем тогда просто меняем статус редактирования (на влючено)
        //  но если мы его выключаем то тогда мы делаем запрос на изменения данных на сервере (сохранение)
        if (editing) {
            changeTodoTC(id, task)
            // выключаем редактирование у себя
            changeEditing({id, case: itemCase})
        } else {
            changeEditing({id, case: itemCase})
        }
    }, [])

    const changeItemTaskCall = useCallback((id: number, task: string): void => {
        changeItemTask({id, task})
    }, [])

    return (
        <section className="main">
            <input id="toggle-all"
                   className="toggle-all"
                   type="checkbox"
                   onClick={completedAllCall}
            />
            <label htmlFor="toggle-all"> Mark all as complete
            </label>
            <ul className="todo-list">
                {filterResult.map((item: todoType) => (
                    <Item key={item.id}
                          item={item}
                          changeEditingCall={changeEditingCall}
                          changeItemStatusCall={changeItemStatusCall}
                          deleteItemCall={deleteItemCall}
                          changeItemTaskCall={changeItemTaskCall}/>
                ))}
            </ul>
        </section>
    )
}

const mapStateToProps = (state: StateType): StateToProps => ({
    filterResult: state.toDo.filterResult
})
type StateToProps = { filterResult: [] | Array<todoType> }

const mapDispatchToProps = {
    changeEditing, changeItemStatus, changeItemTask,
    changeStatusTC, changeTodoTC, completeAllTC, deleteTodoTC, getUsersTC,
    completedAll, deleteItem, setChangedTask, setErrorResponse
}

type ChangeEditingTypeObj = { case?: boolean | null, id: number | null }
type changeItemStatusTypeObj = { id: number }
type changeItemTaskTypeObj = { id: number, task: string }
type setErrorResponseTypeObj = { error: string | undefined }

type DispatchToPropsType = {
    changeEditing: ({}: ChangeEditingTypeObj) => void
    changeItemStatus: ({}: changeItemStatusTypeObj) => void
    changeItemTask: ({}: changeItemTaskTypeObj) => void
    completedAll: () => void
    deleteItem: ({}: changeItemStatusTypeObj) => void
    getUsersTC: (filter: FilterType, id?: number, editingMode?: boolean) => void
    setChangedTask: ({}: changeItemTaskTypeObj) => void
    setErrorResponse: ({}: setErrorResponseTypeObj) => void
}
type PropsType = StateToProps & DispatchToPropsType

export default connect<StateToProps, DispatchToPropsType, null, StateType>(mapStateToProps, mapDispatchToProps)(Main)