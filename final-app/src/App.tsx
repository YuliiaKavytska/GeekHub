import React from 'react';
import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Header from './components/Header/Header';
import {connect, Provider} from "react-redux"
import store, {StoreType} from './redux';
import SignUp from "./components/SignUp/SignUp";
import Contacts from './components/Contacts/Contacts';
import Show from './components/Show/Show';
import Edit from "./components/Edit/Edit";
import NotFound from './components/404/NotFound';
import Login from "./components/Login/Login";

const App: React.FC<StateType> = ({initialized}) => {
    return <div>
        <Header/>
        <main className={'container'}>
            {/*{initialized ? <Redirect to='/contacts' /> : <Redirect to='/login' />}*/}
            <Switch>
                <Route path='/' exact render={() => <Login/>}>
                    <Redirect to='/contacts' />
                </Route>
                <Route path='/login' exact render={() => <Login/>}/>
                <Route path='/signup' exact render={() => <SignUp/>}/>
                <Route path='/contacts' render={() => <Contacts/>}/>
                <Route path='/show/:id?' render={() => <Show/>}/>
                <Route path='/edit/:id?' render={() => <Edit/>}/>
                <Route path='/*' render={() => <NotFound/>}/>
            </Switch>
        </main>
    </div>
}

const mapState = (state: StoreType) => ({
    initialized: state.app.initialized
})

type mapStateType = ReturnType<typeof mapState>
type StateType = mapStateType
const AppConnected = connect(mapState)(App)

const AppContainer: React.FC<any> = () => {
    return <Provider store={store}>
        <BrowserRouter>
            <AppConnected/>
        </BrowserRouter>
    </Provider>
}

export default AppContainer;
