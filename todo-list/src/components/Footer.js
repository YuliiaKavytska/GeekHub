import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeFilter, deleteCompleted} from "../store/todoReducer";

const Footer = () => {

    let {countOfActiveTasks, filter} = useSelector(state => state.toDo);
    let dispatch = useDispatch();

    return (
        <footer className="footer">
            <span className="todo-count"><strong>{countOfActiveTasks}</strong> item left</span>
            <ul className="filters">
                <li>
                    <a className={filter === 'all' ? "selected" : undefined}
                       onClick={() => dispatch(changeFilter({filter: 'all'}))}
                    >All</a>
                </li>
                <li>
                    <a className={filter === 'active' ? "selected" : undefined}
                       onClick={() => dispatch(changeFilter({filter: 'active'}))}
                    >Active</a>
                </li>
                <li>
                    <a className={filter === 'completed' ? "selected" : undefined}
                       onClick={() => dispatch(changeFilter({filter: 'completed'}))}
                    >Completed</a>
                </li>
            </ul>
            <button
                className="clear-completed"
                onClick={() => dispatch(deleteCompleted())}
            >Clear completed
            </button>
        </footer>
    );
}

export default Footer;
