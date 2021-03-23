import React, {useEffect} from 'react';
import {NavLink} from "react-router-dom";
import AppError from "../common/AppError";
import {StoreType} from "../../store";
import {ShowErrorTC} from "../../store/app-reducer";
import {IError} from "../../types/types";
import {connect} from "react-redux";

const SignUp: React.FC<StateType> = ({error, ShowErrorTC}) => {
    useEffect(() => {
        ShowErrorTC({message: 'something'}, 4000)
    }, [ShowErrorTC])

    return <div className="mt-4">
        <div>
            <h1 className="display-4">Hello! This is Sign Up.</h1>
            <p className="lead">This is a simple contacts APP. Authorize or create an account to use all possibility</p>
            <hr className="my-4" />
        </div>
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
        <div className="dropdown-divider"></div>
        <NavLink to='/login' className="dropdown-item">Have an account? Log in</NavLink>
    </div>
}

const mapState = (state: StoreType) => ({
    error: state.app.error
})
const dispatchState = {
    ShowErrorTC
}

type StateType = ReturnType<typeof mapState> & {ShowErrorTC: (err: IError, time?: number) => void}

export default connect(mapState, dispatchState)(SignUp)