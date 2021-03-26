import React, {useCallback} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {StoreType} from "../../store";
import AppError from "../common/AppError";
import {LogInTC} from "../../store/app-reducer";
import HelloCard from "../common/HelloCard";
import {Form, Formik} from "formik";
import * as yup from 'yup';
import FormField from "../Edit/FormField";

const Login: React.FC<StateType> = ({error, isAuth, LogInTC}) => {

    const loginSchema = yup.object({
        email: yup.string().email('Incorrect email').required('Email is required'),
        password: yup.string()
            .trim()
            .min(8)
            .max(50)
            .matches(/\d+/, 'Password should include one number')
            .matches(/[a-zа-щієїґюьяыёъ]+/, 'Password should include one lowercase later')
            .matches(/[A-ZА-ЩІЄЇҐЮЬЯЫЁЪ]+/, 'Password should include one uppercase later')
            .required('Password is required')
    })

    let onSubmit = useCallback((values) => {
        LogInTC(values)
    }, [LogInTC])

    if (isAuth) return <Redirect to='/contacts'/>
    return <div className="mt-4">
        <HelloCard title='Log In'/>
        {error && <AppError message={error.message}/>}
        <Formik initialValues={{email: '', password: ''}}
                validationSchema={loginSchema}
                onSubmit={onSubmit}>
            <Form className={'py-3'}>
                <FormField name='email' />
                <FormField name='password' type='password' />
                <button type="submit" className="btn btn-primary">Log In</button>
            </Form>
        </Formik>
        <hr/>
        <NavLink to='/signUp' className="dropdown-item">New around here? Sign up</NavLink>
    </div>
}

const mapState = (state: StoreType) => ({
    error: state.app.error,
    isAuth: state.app.isAuth
})
const dispatchState = {
    LogInTC
}

interface IDispatch {
    LogInTC: (data: { email: string, password: string }) => void
}

type StateType = ReturnType<typeof mapState> & IDispatch

export default connect(mapState, dispatchState)(Login)

