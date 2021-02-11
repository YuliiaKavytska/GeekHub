import React, {useCallback, useEffect} from 'react';
import {
    changeEditing,
    changeItemTask,
    changeStatusTC, changeTodoTC,
    completeAllTC,
    deleteTodoTC,
    getUsersTC
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
                if (num && !edit) {
                    dispatch(getUsersTC('item', Number(num)));
                } else if (num && edit) {
                    dispatch(getUsersTC('item', Number(num), true));
                } else {
                    dispatch(getUsersTC('all'));
                }
                break;
            case undefined:
                dispatch(getUsersTC('all'));
                break;
            default:
                dispatch(getUsersTC(filter));
        }
    }, [dispatch, edit, num, filter])

    const completedAllCall = useCallback(() => {
        dispatch(completeAllTC());
    }, [dispatch]);

    const changeEditingCall = useCallback((id, itemCase, task, editing) => {
        editing
            ? dispatch(changeTodoTC(id, itemCase, task))
            : dispatch(changeEditing({id, case: itemCase}));
    }, [dispatch]);

    const changeItemStatusCall = useCallback((id) => {
        dispatch(changeStatusTC(id));
    }, [dispatch]);

    const deleteItemCall = useCallback((id) => {
        dispatch(deleteTodoTC(id))
    }, [dispatch]);

    const changeItemTaskCall = useCallback((id, task) => {
        dispatch(changeItemTask({id, task}));
    }, [dispatch]);

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
                          changeItemTaskCall={changeItemTaskCall}/>
                ))}
            </ul>
        </section>
    );
}

export default Main;