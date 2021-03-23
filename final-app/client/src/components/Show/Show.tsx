import React from 'react';
import {IContact} from "../../types/types";
import anonim from '../../assets/image/anonim.png';
import { NavLink } from 'react-router-dom';

interface IState {
    user: IContact
}

const Show: React.FC<IState> = ({user}) => {
    return <div className="card border-primary mb-3 mt-4">
        <div className="card-header"><p className="h4">{user.name}</p></div>
        <div className="card-body text-primary">
            <div className="form-group d-flex">
                <img src={user.avatar || anonim} width="100" height="100" className="rounded float-left mr-3"
                     alt="..."/>
                <div>
                    <Field fieldName={'Email'} value={user.email} />
                    <Field fieldName={'Address'} value={user.address} />
                    <Field fieldName={'Comment'} value={user.comment} />
                    <div>
                        <p className="card-title font-weight-bold">Phones: </p>
                        {user.phones.map(e => <a key={e.id} href={'tel:' + e.number} className="d-block">{e.number}</a>)}
                    </div>
                </div>
            </div>
            <NavLink to='/contacts' className='btn btn-primary float-right px-5' >Back</NavLink>
        </div>
    </div>
}

interface IFieldState {
    fieldName: string
    value: string | null
}

const Field: React.FC<IFieldState> = ({fieldName, value}) => {
    return <p className="card-title font-weight-bold">{fieldName}:
        <span className='font-weight-normal'> {value || 'Doesn`t set'}</span>
    </p>
}

export default Show