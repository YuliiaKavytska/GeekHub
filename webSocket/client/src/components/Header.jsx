import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addItem, addNewTodoTC, changeLastTask, setErrorResponse, updateLastMessageTC} from "../store/todoReducer";
import s from './Header.module.css';
import socket from "../webSocket";

const Header = () => {
    const {lastTask, error} = useSelector(state => state.toDo);
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('newTodo:wasChanged', ({task, success, ...data}) => {
            success
                ? dispatch(changeLastTask({task}))
                : dispatch(setErrorResponse({error: data.message}));
        });

        socket.on('newTodo:wasAdded', ({success, task, ...data}) => {
            success
                ? dispatch(addItem({task}))
                : dispatch(setErrorResponse({error: data.message}));
        })
    }, [dispatch]);

    const onKey = useCallback(e => {
        if (e.key === "Enter") addNewTodoTC(lastTask);
    }, [dispatch, lastTask]);

    const Input = useCallback(e => {
        updateLastMessageTC(e.target.value);
    }, [dispatch]);

    return <header className={`header ${s.header}`}>
        <h1>todos</h1>
        {error && <p className={s.error}>Server error: {error}</p>}
        <input className="new-todo"
               placeholder="What needs to be done?"
               value={lastTask}
               onInput={Input}
               onKeyPress={onKey}
               autoFocus
        />
    </header>
}

export default Header;