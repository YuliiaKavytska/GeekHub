import React, {useCallback} from "react";
import {IContact} from "../../types/types";
import Contact from "./Contact";
import {AllContacts} from "./ContactsType";

interface IState {
    contacts: Array<IContact>
    toggleFavoriteUser: (id: number, event: boolean) => void
}

const ContactsList: React.FC<IState> = ({contacts, toggleFavoriteUser}) => {
    const deleteFromFavorite = useCallback((id: number) => {
        toggleFavoriteUser(id, true)
    }, [])
    return <>
        {contacts.length > 0 && <AllContacts/>}
        {contacts.map(e => <Contact key={e.id} contact={e} toggleFavoriteUser={deleteFromFavorite} />)}
    </>
}

export default ContactsList