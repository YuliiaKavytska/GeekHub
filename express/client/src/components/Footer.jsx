import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteCompletedTC} from "../store/todoReducer";
import {NavLink} from "react-router-dom";

const Footer = () => {

    let {countOfActiveTasks} = useSelector(state => state.toDo);
    let dispatch = useDispatch();

    const completeAll = useCallback(() => {
        dispatch(deleteCompletedTC());
    }, [dispatch])

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
                    onClick={completeAll}>Clear completed
            </button>
        </footer>
    );
}

export default Footer;
