import React, {ComponentType} from 'react';
import {Redirect, useParams } from 'react-router-dom';
import Show from './Show';
import {connect} from "react-redux";
import {StoreType} from "../../store";
import {ShowErrorTC} from "../../store/app-reducer";
import {IContact, IError} from "../../types/types";
import {compose} from "redux";
import {withAuthRedirect} from "../HOC/withAuthRedirect";

const ShowContainer: React.FC<StateType> = ({contacts, ShowErrorTC}) => {
    const uri = useParams<{[key: string] : string}>();
    const user = contacts.find(e => e.id === Number(uri.id))
    if (!user) {
        ShowErrorTC({message: 'User wasn`t found'})
        return <Redirect to='/contacts' />
    } else {
        return <Show user={user} />
    }
}

const mapState = (state: StoreType) => ({
    contacts: state.profile.profile?.contacts as Array<IContact>
})
const dispatchState = {
    ShowErrorTC
}

type StateType = ReturnType<typeof mapState> & {ShowErrorTC: (err: IError, time?: number) => void}

export default compose<ComponentType>(
    connect(mapState, dispatchState),
    withAuthRedirect
)(ShowContainer)