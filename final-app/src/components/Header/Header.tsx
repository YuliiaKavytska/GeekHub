import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/image/logo.png';

const Header: React.FC<any> = (props) => {
    return <nav className="navbar navbar-dark bg-primary sticky-top ">
        <NavLink to='/' className="navbar-brand mr-auto">
            <img src={logo} width="35" height="35"
                 className="d-inline-block align-top mr-3" alt="" loading="lazy" />
                Contacts APP
        </NavLink>
        <NavLink to='/contacts' className="btn btn-success my-2 my-sm-0 mr-3">Contacts</NavLink>
        <NavLink to='/login' className="btn btn-success my-2 my-sm-0 mr-3">Log In</NavLink>
        <NavLink to='/signUp' className="btn btn-info my-2 my-sm-0">Sign Up</NavLink>
    </nav>
}

export default Header