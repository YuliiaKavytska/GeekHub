import React, {ComponentType, useCallback} from "react";
import {Redirect, useParams} from "react-router-dom";
import {ShowErrorTC} from "../../store/app-reducer";
import {StoreType} from "../../store";
import {deleteContactTC, editContactDataTC} from "../../store/profile-reducer";
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../HOC/withAuthRedirect";
import Edit from "./Edit";
import {IContact} from "../../types/types";

const EditContainer: React.FC<StateType> = ({contacts, deleteContactTC}) => {
    const deleteContact = useCallback((id: number) => {
        deleteContactTC(id)
    }, [])
    const editContact = useCallback((data: IContact) => {
        editContactDataTC(data)
    }, [])
    const param = useParams<{ [key: string]: string }>()
    let contact = contacts?.find(e => e.id === +param.id)
    if (!contact) {
        ShowErrorTC({message: 'Sorry, but user wasn`t found'})
        return <Redirect to='/contacts'/>
    }
    return <Edit contact={contact} deleteContact={deleteContact} editContact={editContact}/>
}

const mapState = (state: StoreType) => ({
    contacts: state.profile.profile?.contacts
})

const mapDispatch = {
    deleteContactTC,
    ShowErrorTC,
    editContactDataTC
}

interface IDispatch {
    deleteContactTC: (id: number) => void
    ShowErrorTC: (err: string, time: number) => void
    editContactDataTC: (data: IContact) => void
}

type StateType = ReturnType<typeof mapState> & IDispatch

export default compose<ComponentType>(
    connect(mapState, mapDispatch),
    withAuthRedirect
)(EditContainer)