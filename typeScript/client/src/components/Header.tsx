import React, {ChangeEvent, useCallback, useEffect} from "react"
import {connect} from "react-redux"
import {addItem, addNewTodoTC, changeLastTask, setErrorResponse, updateLastMessageTC} from "../store/todoReducer"
import s from './Header.module.css'
import socket from "../webSocket"
import {StateType} from "../store"
import {mainRespType} from "../types/types"

const Header: React.FC<PropsType> = (props) => {
    const {addItem, changeLastTask, setErrorResponse, lastTask, error} = props

    useEffect((): void => {
        socket.on('newTodo:wasChanged', ({task, success, ...data}: Omit<mainRespType, 'id'>): void => {
            if (success) {
                changeLastTask({task})
            } else {
                setErrorResponse({error: data.message})
            }
        })

        socket.on('newTodo:wasAdded', ({success, task, ...data}: Omit<mainRespType, 'id'>): void => {
            if (success) {
                addItem({task})
            } else {
                setErrorResponse({error: data.message})
            }
        })
    }, [])

    const onKey = useCallback((event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === "Enter") {
            addNewTodoTC(lastTask)
        }
    }, [lastTask])

    const Input = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        updateLastMessageTC(event.target.value)
    }, [])

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
    mapStateToProps, mapDispatchToProps)(Header)

