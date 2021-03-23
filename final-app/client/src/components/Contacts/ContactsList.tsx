import React from "react";
import {IContact} from "../../types/types";
import Contact from "./Contact";
import {AllContacts} from "./ContactsType";

interface IState {
    contacts: Array<IContact>
}

const ContactsList: React.FC<IState> = ({contacts}) => {
    return <>
        <AllContacts />
        {contacts.map(e => <Contact key={e.id} contact={e} />)}
    </>
}

export default ContactsList