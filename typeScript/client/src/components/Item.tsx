import React, {ChangeEvent, useCallback, useEffect} from 'react'
import {todoType} from "../types/types"

interface PropsType {
    item: todoType
    changeEditingCall: (id: number, itemCase: boolean | null, task: string, editing: boolean) => void
    changeItemStatusCall: (id: number) => void
    deleteItemCall: (id: number) => void
    changeItemTaskCall: (id: number, task: string) => void
}

const Item: React.FC<PropsType> = ({item, changeEditingCall, changeItemStatusCall, deleteItemCall, changeItemTaskCall}) => {
    const input = React.createRef<HTMLInputElement>()

    const changeEditing = useCallback((e: React.MouseEvent<HTMLInputElement>): void => {
        changeEditingCall(item.id, null, e.currentTarget.value, item.editing)
    }, [changeEditingCall, item])

    const changeItemStatus = useCallback((): void => {
        changeItemStatusCall(item.id)
    }, [changeItemStatusCall, item])

    const deleteItem = useCallback((): void => {
        deleteItemCall(item.id)
    }, [deleteItemCall, item])

    const changeItemTask = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
        changeItemTaskCall(item.id, e.currentTarget.value)
    }, [changeItemTaskCall, item])

    const changeEditingBlurCase = useCallback((e: React.FocusEvent<HTMLInputElement>): void => {
        // это случай нажатия в другом месте.
        changeEditingCall(item.id, false, e.currentTarget.value, item.editing)
    }, [changeEditingCall, item])

    useEffect((): void => {
        if (input.current) input.current.focus()
    }, [input])

    return <li className={item.status === 'completed'
        ? (item.editing ? 'completed editing' : 'completed')
        : (item.editing ? 'editing' : undefined)}>
        <div className="view">
            <input className="toggle"
                   type="checkbox"
                   checked={item.status === "completed"}
                   onChange={changeItemStatus}
            />
            <label>{item.task}</label>
            <button className="destroy" onClick={deleteItem}></button>
        </div>
        <input className="edit"
               value={item.task}
               onInput={changeItemTask}
               onBlur={changeEditingBlurCase}
               ref={input}
               onDoubleClick={changeEditing}
        />
    </li>
}

export default Item