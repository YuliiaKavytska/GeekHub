import React, {useCallback} from 'react';

const Item = ({item, changeEditingCall, changeItemStatusCall, deleteItemCall, changeItemTaskCall}) => {

    const changeEditing = useCallback((e) => {
        changeEditingCall(item.id);
    }, [item]);

    const changeItemStatus = useCallback(() => {
        changeItemStatusCall(item.id);
    }, [item]);

    const deleteItem = useCallback(() => {
        deleteItemCall(item.id)
    }, [item]);

    const changeItemTask = useCallback((e) => {
        changeItemTaskCall(item.id, e.currentTarget.value)
    }, [item]);

    const changeEditingBlurCase = useCallback(() => {
        changeEditingCall(item.id, false)
    }, [item]);

    const focusInput = useCallback(input =>
        input && input.focus(),
        [item]);


    return <li className={item.status === 'completed'
        ? (item.editing ? 'completed editing' : 'completed')
        : (item.editing ? 'editing' : undefined)}
               onDoubleClick={changeEditing}>
        <div className="view">
            <input className="toggle"
                   type="checkbox"
                   checked={item.status === "completed"}
                   onChange={changeItemStatus}
            />
            <label>{item.task}</label>
            <button className="destroy"
                    onClick={deleteItem}
            >
            </button>
        </div>
        <input className="edit"
               value={item.task}
               onInput={changeItemTask}
               onBlur={changeEditingBlurCase}
               ref={focusInput}/>
    </li>
}

export default Item;