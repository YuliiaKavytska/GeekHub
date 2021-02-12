import React from "react";
import './css/index.css';
import './css/base.css';
import Main from "./components/Main";
import Footer from "./components/Footer";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from "react-redux";
import {store} from "./store";
import Header from "./components/Header";


const App = () => {
    return <section className="todoapp">
        <Header/>
        <Route path={'/:filter(active|all|completed|todo)?/:num?/:edit?'} render={() => <Main/>}/>
        <Footer/>
    </section>
}

const MainApp = () => {
    return <Router>
        <Provider store={store}>
            <App/>
        </Provider>
    </Router>
}

export default MainApp;
