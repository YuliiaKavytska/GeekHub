import React, {useEffect} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {StoreType} from "../../store";
import AppError from "../common/AppError";
import {ShowErrorTC} from "../../store/app-reducer";
import {IError} from "../../types/types";
import HelloCard from "../common/HelloCard";

const Login: React.FC<StateType> = ({error, ShowErrorTC, isAuth}) => {
    // useEffect(() => {
    //     ShowErrorTC({api: 'login', message: 'login or password is wrong'}, 4000)
    // }, [ShowErrorTC])
    if (isAuth) return <Redirect to='/contacts' />
    return <div className="mt-4">
        <HelloCard title='Log In' />
        {error && <AppError message={error.message} />}
        <form className={'py-3'}>
            <div className="form-group">
                <label htmlFor="exampleDropdownFormEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleDropdownFormEmail1"
                       placeholder="email@example.com"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                    else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleDropdownFormPassword1">Password</label>
                <input type="password" className="form-control" id="exampleDropdownFormPassword1"
                       placeholder="Password"/>
            </div>
            <button type="submit" className="btn btn-primary">Log In</button>
        </form>
        <hr />
        <NavLink to='/signUp' className="dropdown-item">New around here? Sign up</NavLink>
    </div>
}

const mapState = (state: StoreType) => ({
    error: state.app.error,
    isAuth: state.app.isAuth
})
const dispatchState = {
    ShowErrorTC
}

type StateType = ReturnType<typeof mapState> & {ShowErrorTC: (err: IError, time?: number) => void}

export default connect(mapState, dispatchState)(Login)

