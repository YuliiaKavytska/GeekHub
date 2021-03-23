import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Header from './components/Header/Header';
import {connect, Provider} from "react-redux"
import store, {StoreType} from './store';
import SignUp from "./components/SignUp/SignUp";
import Contacts from './components/Contacts/Contacts';
import Edit from "./components/Edit/Edit";
import NotFound from './components/404/NotFound';
import Login from "./components/Login/Login";
import NewContact from './components/NewContact/NewContact';
import ShowContainer from "./components/Show/ShowContainer";
import {initializeAppTC} from "./store/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";

const App: React.FC<StateType> = ({initialized, initializeAppTC}) => {
    useEffect(() => {
        console.log(initialized)
        initializeAppTC()
        console.log(initialized)
    }, [])

    return <div>
        <Header/>
        <main className={'container'}>
            {!initialized ? <Preloader /> : <Switch>
                <Route path='/' exact render={() => <Login/>}>
                    <Redirect to='/contacts'/>
                </Route>
                <Route path='/login' exact render={() => <Login/>}/>
                <Route path='/signup' exact render={() => <SignUp/>}/>
                <Route path='/contacts' exact render={() => <Contacts/>}/>
                <Route path='/newContact' render={() => <NewContact/>}/>
                <Route path='/show/:id?' render={() => <ShowContainer/>}/>
                <Route path='/edit/:id?' render={() => <Edit/>}/>
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
