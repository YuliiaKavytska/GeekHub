import React, {useCallback} from 'react';
import {NavLink, Redirect} from "react-router-dom";
import AppError from "../common/AppError";
import {StoreType} from "../../store";
import {initializeAppTC, RegisterTC} from "../../store/app-reducer";
import {IRegisterDate} from "../../types/types";
import {connect} from "react-redux";
import HelloCard from "../common/HelloCard";
import {Form, Formik} from 'formik';
import * as yup from 'yup';
import FormField from "../Edit/FormField";

const SignUp: React.FC<StateType> = ({error, RegisterTC, isAuth, initializeAppTC}) => {

    let SignupSchema = yup.object({
        name: yup.string()
            .min(3)
            .matches(/^[a-zа-щієїґюьяыёъ\s]+$/i, 'Field should contain only characters')
            .required('Name is requires'),
        email: yup.string().trim().email('Invalid email').required('Login is required'),
        password: yup.string()
            .trim()
            .min(8)
            .max(50)
            .matches(/\d+/, 'Password should include one number')
            .matches(/[a-zа-щієїґюьяыёъ]+/, 'Password should include one lowercase later')
            .matches(/[A-ZА-ЩІЄЇҐЮЬЯЫЁЪ]+/, 'Password should include one uppercase later')
            .required('Password is required')
    })
    const onSubmit = useCallback((values) => {
        let result = RegisterTC(values)
        result
            .then(value => {
                if (value) initializeAppTC()
            })
    }, [RegisterTC, initializeAppTC])

    if (isAuth) return <Redirect to='/contacts'/>

    return <div className="mt-4">
        <HelloCard title='Sign Up'/>
        {error && <AppError message={error.message}/>}
        <Formik initialValues={{name: '', email: '', password: ''}}
                validationSchema={SignupSchema}
                onSubmit={onSubmit}>
            <Form className={'py-3'}>
                <FormField name='name'/>
                <FormField name='email'/>
                <FormField name='password' type='password'/>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </Form>
        </Formik>
        <hr/>
        <NavLink to='/login' className="dropdown-item">Have an account? Log in</NavLink>
    </div>
}

const mapState = (state: StoreType) => ({
    error: state.app.error,
    isAuth: state.app.isAuth
})
const dispatchState = {
    RegisterTC,
    initializeAppTC
}

interface IDispatch {
    RegisterTC: (data: IRegisterDate) => Promise<boolean>
    initializeAppTC: () => void
}

type StateType = ReturnType<typeof mapState> & IDispatch

export default connect(mapState, dispatchState)(SignUp)