import React, {useCallback, useEffect} from 'react';
import {
    changeEditing,
    changeFilter,
    changeItemStatus,
    changeItemTask,
    completedAll,
    deleteItem
} from "../store/todoReducer";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom';

const Main = () => {
    const {filterResult} = useSelector(state => state.toDo);
    const dispatch = useDispatch();

    const {filter, num, edit} = useParams();

    useEffect(() => {
        switch (filter) {
            case 'todo':
                if (edit) {
                    dispatch(changeEditing({id: Number(num)}));
                } else if (num) {
                    dispatch(changeFilter({filter: 'item', id: Number(num)}));
                } else {
                    dispatch(changeFilter({filter: 'all'}));
                }
                break;
            case undefined:
                dispatch(changeFilter({filter: 'all'}));
                break;
            default:
                dispatch(changeFilter({filter}));
        }
    }, [filter])

    const completedAllCall = useCallback(() => {
        dispatch(completedAll());
    }, []);

    const changeEditingCall = useCallback((id, itemCase) => {
        dispatch(changeEditing({id, case: itemCase}));
    }, []);

    const changeItemStatusCall = useCallback((id) => {
        dispatch(changeItemStatus({id}));
    }, []);

    const deleteItemCall = useCallback((id) => {
        dispatch(deleteItem({id}))
    }, []);

    const changeItemTaskCall = useCallback((id, task) => {
        dispatch(changeItemTask({id, task}));
    }, []);

    return (
        <section className="main">
            <input id="toggle-all"
                   className="toggle-all"
                   type="checkbox"
                   onClick={completedAllCall}
            />
            <label htmlFor="toggle-all"> Mark all as complete
            </label>
            <ul className="todo-list">
                {filterResult.map((item) => (
                    <Item key={item.id}
                          item={item}
                          changeEditingCall={changeEditingCall}
                          changeItemStatusCall={changeItemStatusCall}
                          deleteItemCall={deleteItemCall}
                          changeItemTaskCall={changeItemTaskCall}
                    />
                ))}
            </ul>
        </section>
    );
}

const Item = ({item, changeEditingCall, changeItemStatusCall, deleteItemCall, changeItemTaskCall}) => {

    return <li className={item.status === 'completed'
        ? (item.editing ? 'completed editing' : 'completed')
        : (item.editing ? 'editing' : undefined)}
               onDoubleClick={() => changeEditingCall(item.id)}
    >
        <div className="view">
            <input className="toggle"
                   type="checkbox"
                   checked={item.status === "completed"}
                   onChange={() => changeItemStatusCall(item.id)}
            />
            <label>{item.task}</label>
            <button className="destroy"
                    onClick={() => deleteItemCall(item.id)}
            >
            </button>
        </div>
        <input className="edit"
               value={item.task}
               onInput={e => changeItemTaskCall(item.id, e.currentTarget.value)}
               onBlur={() => changeEditingCall(item.id, false)}
               ref={input => input && input.focus()}
        />
    </li>
}

export default Main;