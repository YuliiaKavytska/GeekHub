import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteCompleted} from "../store/todoReducer";
import {NavLink} from "react-router-dom";

const Footer = () => {

    let {countOfActiveTasks, filter} = useSelector(state => state.toDo);
    let dispatch = useDispatch();

    return (
        <footer className="footer">
            <span className="todo-count"><strong>{countOfActiveTasks}</strong> item left</span>
            <ul className="filters">
                <li>
                    <NavLink activeClassName="selected" to='/'>All</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="selected" to='/active'>Active</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="selected" to='/completed'>Completed</NavLink>
                </li>
            </ul>
            <button className="clear-completed"
                    onClick={() => dispatch(deleteCompleted())}>Clear completed
            </button>
        </footer>
    );
}

export default Footer;
