import React, {ChangeEvent, KeyboardEventHandler, useCallback, useEffect} from "react"
import {connect, useDispatch} from "react-redux"
import {addItem, addNewTodoTC, changeLastTask, setErrorResponse, updateLastMessageTC} from "../store/todoReducer"
import s from './Header.module.css'
import socket from "../webSocket"
import {StateType} from "../store"
import {mainRespType} from "../types/types"

const Header: React.FC<PropsType> = (props) => {
    const dispatch = useDispatch()
    const {addItem, changeLastTask, setErrorResponse, lastTask, error} = props

    useEffect((): void => {
        socket.on('newTodo:wasChanged', ({task, success, ...data}: Omit<mainRespType, 'id'>): void => {
            success
                ? dispatch(changeLastTask({task}))
                : dispatch(setErrorResponse({error: data.message}))
        })

        socket.on('newTodo:wasAdded', ({success, task, ...data}: Omit<mainRespType, 'id'>): void => {
            success
                ? dispatch(addItem({task}))
                : dispatch(setErrorResponse({error: data.message}))
        })
    }, [dispatch])

    const onKey = useCallback((event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === "Enter") addNewTodoTC(lastTask)
    }, [dispatch, lastTask])

    const Input = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        updateLastMessageTC(event.target.value)
    }, [dispatch])

    return <header className={`header ${s.header}`}>
        <h1>todos</h1>
        {error && <p className={s.error}>Server error: {error}</p>}
        <input className="new-todo"
               placeholder="What needs to be done?"
               value={lastTask}
               onInput={Input}
               onKeyDown={onKey}
               autoFocus
        />
    </header>
}

const mapStateToProps = (state: StateType) => ({
    lastTask: state.toDo.lastTask,
    error: state.toDo.error
})

const mapDispatchToProps = {addItem, changeLastTask, setErrorResponse}

type StatePropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = typeof mapDispatchToProps

type PropsType = StatePropsType & DispatchPropsType

export default connect<StatePropsType, DispatchPropsType, null, StateType>(
    mapStateToProps,
    mapDispatchToProps
)(Header)

