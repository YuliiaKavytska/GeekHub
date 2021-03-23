import React, {ComponentType, useCallback} from 'react';
import {StoreType} from "../../store";
import {connect} from "react-redux";
import FavoriteContacts from "./FavoriteContacts";
import ContactsList from './ContactsList';
import {NavLink} from "react-router-dom";
import AppError from "../common/AppError";
import {IUser} from "../../types/types";
import {compose} from "redux";
import {withAuthRedirect} from "../HOC/withAuthRedirect";

const Contacts: React.FC<StateType> = ({profile, error, toggleFavoriteUser}) => {
    const toggleFavoriteUser = useCallback((id: number, event: boolean) => {
        toggleFavoriteUser()
    }, [])

    return <>
        <div className='mt-3 d-flex align-items-center justify-content-between'>
            <h2>{profile.name}'s contacts:</h2>
            <NavLink to='/newContact' className='btn btn-success'>Add contact</NavLink>
        </div>
        {error && <AppError message={error.message} />}
        <div className='my-3'>
            <ul className="list-unstyled list-group col-12 pr-0">
                {profile.favorites && <FavoriteContacts favorites={profile.favorites} contacts={profile.contacts}/>}
                <ContactsList contacts={profile.contacts}/>
            </ul>
        </div>
    </>
}

const mapState = (state: StoreType) => ({
    profile: state.profile.profile as IUser,
    error: state.app.error
})
const dispatchProps = {
    toggleFavoriteUser
}

type StateType = ReturnType<typeof mapState> &

export default compose<ComponentType>(
    connect(mapState, dispatchProps),
    withAuthRedirect
)(Contacts)
