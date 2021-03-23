import React from "react";
import {Favorite} from "./ContactsType";
import {IContact} from "../../types/types";
import Contact from "./Contact";

interface IState {
    favorites: Array<number>
    contacts: Array<IContact>
}

const FavoriteContacts: React.FC<IState> = ({favorites, contacts}) => {
    const favoriteFilter = contacts.filter(e => favorites.includes(e.id))
    return <>
        <Favorite/>
        {favoriteFilter.map(e => <Contact key={e.id} contact={e} />)}
    </>
}

export default FavoriteContacts