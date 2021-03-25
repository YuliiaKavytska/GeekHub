import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Header from './components/Header/Header';
import {connect, Provider} from "react-redux"
import store, {StoreType} from './store';
import Contacts from './components/Contacts/Contacts';
import NotFound from './components/404/NotFound';
import NewContact from './components/NewContact/NewContact';
import ShowContainer from "./components/Show/ShowContainer";
import {initializeAppTC} from "./store/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import EditContainer from './components/Edit/EditContainer'
import {withSuspense} from './components/HOC/withSuspence';

const Login = React.lazy(() => import("./components/Login/Login"))
const SuspendedLogin = withSuspense(Login)

const SignUp = React.lazy(() => import("./components/SignUp/SignUp"))
const SuspendedSignUp = withSuspense(SignUp)

const App: React.FC<StateType> = ({initialized, initializeAppTC}) => {
    useEffect(() => {
        initializeAppTC()
    }, [initializeAppTC])

    return <div>
        <Header/>
        <main className={'container'}>
            {!initialized ? <Preloader/> : <Switch>
                <Route path='/' exact render={() => <SuspendedLogin/>}>
                    <Redirect to='/contacts'/>
                </Route>
                <Route path='/login' exact render={() => <SuspendedLogin/>}/>
                <Route path='/signup' exact render={() => <SuspendedSignUp/>}/>
                <Route path='/contacts' exact render={() => <Contacts/>}/>
                <Route path='/newContact' render={() => <NewContact/>}/>
                <Route path='/show/:id?' render={() => <ShowContainer/>}/>
                <Route path='/edit/:id?' render={() => <EditContainer/>}/>
                <Route path='/*' render={() => <NotFound/>}/>
            </Switch>
            }
        </main>
    </div>
}

const mapState = (state: StoreType) => ({
    initialized: state.app.initialized
})

const dispatchState = {
    initializeAppTC
}

type StateType = ReturnType<typeof mapState> & { initializeAppTC: () => void }
const AppConnected = connect(mapState, dispatchState)(App)

const AppContainer: React.FC<any> = () => {
    return <Provider store={store}>
        <BrowserRouter>
            <AppConnected/>
        </BrowserRouter>
    </Provider>
}

export default AppContainer;
