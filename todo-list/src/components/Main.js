import React, {useEffect} from 'react';
import {
    addItem,
    changeEditing,
    changeItemStatus,
    changeItemTask,
    changeLastTask,
    completedAll,
    deleteItem
} from "../store/todoReducer";
import {useDispatch, useSelector} from "react-redux";

const Main = (props) => {
    useEffect(() => {
        document.addEventListener("keydown", onKey);
        document.addEventListener("input", Input);

        return () => {
            document.removeEventListener("keydown", onKey);
            document.removeEventListener("input", Input);
        };
    }, []);

    let {filterResult, lastTask} = useSelector(state => state.toDo);
    let dispatch = useDispatch();

    let onKey = e => {
        if (e.key === "Enter") {
            dispatch(addItem());
            console.log(lastTask);
        }
    }

    let Input = e => {
        dispatch(changeLastTask({task: e.target.value}));
    }

    return (
        <section className="main">
            <input
                id="toggle-all"
                className="toggle-all"
                type="checkbox"
                value={lastTask}
                onInput={e => Input(e)}
                onKeyPress={e => onKey(e)}
            />
            <label
                htmlFor="toggle-all"
                onClick={() => dispatch(completedAll())}
            >
                Mark all as complete
            </label>
            <ul className="todo-list">
                {filterResult.map((item) => (
                    <li
                        key={item.id}
                        className={item.status === 'completed'
                            ? (item.editing ? 'completed editing' : 'completed')
                            : (item.editing ? 'editing' : undefined)}
                        onDoubleClick={() => dispatch(changeEditing({id: item.id}))}
                    >
                        <div className="view">
                            <input
                                className="toggle"
                                type="checkbox"
                                checked={item.status === "completed"}
                                onInput={() => dispatch(changeItemStatus({id: item.id}))}
                            />
                            <label>{item.task}</label>
                            <button className="destroy" onClick={() => dispatch(deleteItem({id: item.id}))}></button>
                        </div>
                        <input
                            className="edit"
                            value={item.task}
                            onInput={e => dispatch(changeItemTask({id: item.id, task: e.currentTarget.value}))}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Main;