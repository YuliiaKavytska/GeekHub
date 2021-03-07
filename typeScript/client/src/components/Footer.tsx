import React, {useCallback, useEffect} from 'react'
import {connect} from "react-redux"
import {deleteCompleted, deleteCompletedTC, setErrorResponse} from "../store/todoReducer"
import {NavLink} from "react-router-dom"
import socket from "../webSocket"
import {mainRespType} from '../types/types'
import {StateType} from "../store"

const Footer: React.FC<PropsType> = (props) => {

    let {countOfActiveTasks, deleteCompleted, setErrorResponse} = props

    useEffect((): void => {
        socket.on('completed:wasDeleted', ({success, ...data}: Omit<mainRespType, 'id' | 'task'>) => {
            success
                ? deleteCompleted()
                : setErrorResponse({error: data.message})
        })
    }, [])

    const completeAll = useCallback((): void => {
        deleteCompletedTC()
    }, [])

    return <footer className="footer">
        <span className="todo-count"><strong>{countOfActiveTasks}</strong> item left</span>
        <ul className="filters">
            <li><NavLink activeClassName="selected" to='/todo'>All</NavLink></li>
            <li><NavLink activeClassName="selected" to='/active'>Active</NavLink></li>
            <li><NavLink activeClassName="selected" to='/completed'>Completed</NavLink></li>
        </ul>
        <button className="clear-completed" onClick={completeAll}>Clear completed</button>
    </footer>
}

const mapStateToProps = (state: StateType) => ({
    countOfActiveTasks: state.toDo.countOfActiveTasks
})

const mapDispatchToProps = {deleteCompleted, setErrorResponse}

type DispatchToPropsType = typeof mapDispatchToProps
type StateToPropsType = ReturnType<typeof mapStateToProps>
type PropsType = StateToPropsType & DispatchToPropsType

export default connect<StateToPropsType, DispatchToPropsType, null, StateType>(
    mapStateToProps,
    mapDispatchToProps)(Footer)
