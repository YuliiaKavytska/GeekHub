import React, {ComponentType, useCallback} from 'react';
import {compose} from "redux";
import {withAuthRedirect} from "../HOC/withAuthRedirect";
import Edit from "../Edit/Edit";
import {IContact} from "../../types/types";
import {StoreType} from "../../store";
import {newContactTC} from "../../store/profile-reducer";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";

const NewContact: React.FC<StateType> = ({contacts, error, newContactTC}) => {
    let lastId
    if (contacts && contacts.length > 0) {
        lastId = contacts[contacts.length - 1].id
    } else {
        lastId = 0
    }

    let newContact: IContact = {
        id: lastId + 1,
        name: '',
        avatar: '',
        email: '',
        address: '',
        comment: '',
        phones: [{id: 1, number: ''}]
    }

    let history = useHistory()
    const editContact = useCallback((data: IContact) => {
        let result = newContactTC(data)

        result.then(result => {
            if (result) {
                history.push('/contacts')
            }
        })
    }, [newContactTC, history])

    return <Edit contact={newContact} editContact={editContact} error={error}/>
}

const mapState = (state: StoreType) => ({
    contacts: state.profile.profile?.contacts,
    error: state.app.error
})

const mapDispatch = {
    newContactTC
}

interface IDispatch {
    newContactTC: (data: IContact) => Promise<boolean>
}

type StateType = ReturnType<typeof mapState> & IDispatch

export default compose<ComponentType>(
    connect(mapState, mapDispatch),
    withAuthRedirect,
)(NewContact)