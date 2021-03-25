import React, {useEffect} from 'react';
import {NavLink, Redirect} from "react-router-dom";
import AppError from "../common/AppError";
import {StoreType} from "../../store";
import {ShowErrorTC} from "../../store/app-reducer";
import {IError} from "../../types/types";
import {connect} from "react-redux";
import HelloCard from "../common/HelloCard";

const SignUp: React.FC<StateType> = ({error, ShowErrorTC, isAuth}) => {
    // useEffect(() => {
    //     ShowErrorTC({message: 'something'}, 4000)
    // }, [ShowErrorTC])

    if (isAuth) return <Redirect to='/contacts' />

    return <div className="mt-4">
        <HelloCard title='Sign Up' />
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
                <label htmlFor="exampleDropdownFormEmail1">Name and Surname</label>
                <input type="email" className="form-control" id="exampleDropdownFormEmail1"
                       placeholder="Anatoliy Anatoliev"/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleDropdownFormPassword1">Password</label>
                <input type="password" className="form-control" id="exampleDropdownFormPassword1"
                       placeholder="Password"/>
            </div>
            <button type="submit" className="btn btn-primary">Log In</button>
        </form>
        <hr />
        <NavLink to='/login' className="dropdown-item">Have an account? Log in</NavLink>
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

export default connect(mapState, dispatchState)(SignUp)