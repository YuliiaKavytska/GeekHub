import React from 'react';
import {NavLink} from 'react-router-dom';

const Login: React.FC<any> = (props) => {
    return <div className="mt-4">
        <div>
            <h1 className="display-4">Hello! This is Log In.</h1>
            <p className="lead">This is a simple contacts APP. Authorize or create an account to use all possibility</p>
            <hr className="my-4" />
        </div>
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
        <div className="dropdown-divider"></div>
        <NavLink to='/signUp' className="dropdown-item">New around here? Sign up</NavLink>
    </div>
}

export default Login

