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
import Item from "./Item";

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
                fetch('/all').then((res) => {
                    console.log('res ' + res.json());
                    return res.json();
                }).then(data => {
                    console.log('data' + data)
                });
                dispatch(changeFilter({filter: 'all'}));
                break;
            default:
                fetch('/' + filter).then((res) => {
                    console.log('res ' + res.json());
                    return res;
                }).then(data => {
                    console.log('data' + data)
                });
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



export default Main;