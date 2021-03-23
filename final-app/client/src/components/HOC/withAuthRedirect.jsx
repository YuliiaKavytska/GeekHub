import React from 'react';
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';

const mapState = (state) => ({
    isAuth: state.app.isAuth
})

export const withAuthRedirect = (Component) => {

    const authRedirect = (props) => {
        const {isAuth, ...rest} = props
        if (!props.isAuth) {
            return <Redirect to='/login'/>
        }
        return <Component {...rest}/>
    }

    let authContainer = connect(mapState)(authRedirect)
    return authContainer
}
