import './App.css';
import React from "react";
import './css/index.css';
import './css/base.css';
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
    return (
        <section className="todoapp">
            <header className="header">
                <h1>todos</h1>
                <input className="new-todo" placeholder="What needs to be done?" autoFocus />
            </header>
            <Main/>
            <Footer/>
        </section>
    );
}

export default App;
