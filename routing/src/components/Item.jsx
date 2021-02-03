import React from 'react';

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

export default Item;