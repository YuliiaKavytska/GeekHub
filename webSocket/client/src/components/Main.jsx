import React, {useCallback, useEffect} from 'react';
import {
    changeEditing,
    changeItemStatus,
    changeItemTask,
    changeStatusTC,
    changeTodoTC,
    completeAllTC,
    completedAll,
    deleteItem,
    deleteTodoTC,
    getUsersTC,
    setChangedTask,
    setErrorResponse
} from "../store/todoReducer";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom';
import Item from "./Item";
import socket from "../webSocket";

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
    }, [dispatch, edit, num, filter]);

    useEffect(() => {
        socket.on('all:wasCompleted', ({success, ...data}) => {
            success
                ? dispatch(completedAll())
                : dispatch(setErrorResponse({error: data.message}));
        });

        socket.on('todo:wasDeleted', ({id, success, ...data}) => {
            success
                ? dispatch(deleteItem({id}))
                : dispatch(setErrorResponse({error: data.message}));
        });

        socket.on('todoStatus:wasChanged', ({id, success, ...data}) => {
            success
                ? dispatch(changeItemStatus({id}))
                : dispatch(setErrorResponse({error: data.message}));
        });

        socket.on('todo:wasChanged', ({success, id, task, ...data}) => {
            success
                ? dispatch(setChangedTask({id, task}))
                : dispatch(setErrorResponse({error: data.message}));
        })
    }, [dispatch]);

    const completedAllCall = useCallback(() => {
        completeAllTC();
    }, []);

    const deleteItemCall = useCallback((id) => {
        deleteTodoTC(id);
    }, []);

    const changeItemStatusCall = useCallback((id) => {
        changeStatusTC(id);
    }, []);

    const changeEditingCall = useCallback((id, itemCase, task, editing) => {
        // мы передаем статус редактирования (editing), чтобы понять, мы его в данный момент выключаем или включаем
        // если мы его включаем тогда просто меняем статус редактирования (на влючено)
        //  но если мы его выключаем то тогда мы делаем запрос на изменения данных на сервере (сохранение)
        if (editing) {
            changeTodoTC(id, task);
            // выключаем редактирование у себя
            dispatch(changeEditing({id, case: itemCase}));
        } else {
            dispatch(changeEditing({id, case: itemCase}));
        }
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