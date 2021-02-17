import React, {useCallback, useEffect} from 'react';

const Item = ({item, changeEditingCall, changeItemStatusCall, deleteItemCall, changeItemTaskCall}) => {

    const input = React.createRef();

    const changeEditing = useCallback((e) => {
        changeEditingCall(item.id, null, e.currentTarget.value, item.editing);
    }, [changeEditingCall, item]);

    const changeItemStatus = useCallback(() => {
        changeItemStatusCall(item.id);
    }, [changeItemStatusCall, item]);

    const deleteItem = useCallback(() => {
        deleteItemCall(item.id)
    }, [deleteItemCall, item]);

    const changeItemTask = useCallback((e) => {
        changeItemTaskCall(item.id, e.currentTarget.value)
    }, [changeItemTaskCall, item]);

    const changeEditingBlurCase = useCallback((e) => {
        // это случай нажатия в другом месте.
        changeEditingCall(item.id, false, e.currentTarget.value, item.editing)
    }, [changeEditingCall, item]);

    useEffect(() => {
        if (input.current) input.current.focus();
    }, [input]);

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
                    onClick={deleteItem}>
            </button>
        </div>
        <input className="edit"
               value={item.task}
               onInput={changeItemTask}
               onBlur={changeEditingBlurCase}
               ref={input}/>
    </li>
}

export default Item;