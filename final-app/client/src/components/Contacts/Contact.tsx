import React from 'react';
import {NavLink} from "react-router-dom";
import anonim from "../../assets/image/anonim.png";
import EditingIcon from '../common/EditingIcon';
import PhoneIcon from '../common/PhoneIcon';
import StarIcon from "../common/StarIcon";
import {IContact} from "../../types/types";

interface IState {
    contact: IContact
}

const Contact: React.FC<IState> = ({contact}) => {
    return <li className="media list-group-item list-group-item-action d-flex align-items-center">
        <NavLink to={'/show/' + contact.id} className="d-flex mr-auto">
            <img src={contact.avatar || anonim} className="mr-3" width="64" height="64" alt="..."/>
        </NavLink>
        <div className="media-body mr-auto">
            <NavLink to={'/show/' + contact.id} className="d-flex mr-auto">
                <h5 className="mt-0 mb-1">{contact.name}</h5>
            </NavLink>
            {contact.phones.map(e => <a key={e.id} className="d-block" href={"tel:" + e.number}>{e.number}</a>)}
        </div>
        <div className="btn-group" role="group" aria-label="Basic example">
            <a href={"tel:" + contact.phones[0].number} className='btn btn-success'>
                <PhoneIcon/> Call
            </a>
            <button className='btn btn-warning'>
                <StarIcon size={18}/>
            </button>
            <NavLink to={'/edit/' + contact.id} type='button' className='btn btn-danger'>
                <EditingIcon/>Edit
            </NavLink>
        </div>
    </li>
}

export default Contact