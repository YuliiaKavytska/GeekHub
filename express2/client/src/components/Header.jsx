import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addNewTodoTC, changeLastTask} from "../store/todoReducer";

const Header = () => {
    const {lastTask} = useSelector(state => state.toDo);
    const dispatch = useDispatch();

    const onKey = useCallback(e => {
        if (e.key === "Enter") dispatch(addNewTodoTC(lastTask));
    }, [dispatch, lastTask]);

    const Input = useCallback(e => {
        dispatch(changeLastTask({task: e.target.value}));
    }, [dispatch]);

    return <header className="header">
        <h1>todos</h1>
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