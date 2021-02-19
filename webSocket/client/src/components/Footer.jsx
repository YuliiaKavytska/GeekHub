import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteCompleted, deleteCompletedTC, setErrorResponse} from "../store/todoReducer";
import {NavLink} from "react-router-dom";
import socket from "../webSocket";

const Footer = () => {

    let {countOfActiveTasks} = useSelector(state => state.toDo);
    let dispatch = useDispatch();

    useEffect(() => {
        socket.on('completed:wasDeleted', ({success, ...data}) => {
            success
                ? dispatch(deleteCompleted())
                : dispatch(setErrorResponse({error: data.message}));
        })
    }, [dispatch]);

    const completeAll = useCallback(() => {
        deleteCompletedTC();
    }, [dispatch]);

    return (
        <footer className="footer">
            <span className="todo-count"><strong>{countOfActiveTasks}</strong> item left</span>
            <ul className="filters">
                <li>
                    <NavLink activeClassName="selected" to='/todo'>All</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="selected" to='/active'>Active</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="selected" to='/completed'>Completed</NavLink>
                </li>
            </ul>
            <button className="clear-completed"
                    onClick={completeAll}
            >Clear completed
            </button>
        </footer>
    );
}

export default Footer;
