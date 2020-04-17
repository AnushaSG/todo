import React, { Component } from 'react';
import AuthenticationService from './AuthenticationService.js';
import './todo_app.css';
import { BrowserRouter as Router, Route, Switch,Link} from 'react-router-dom';
import {withRouter} from 'react-router';

class HeaderComponent extends Component {
    render() {
        const isUserLoggedInApp = AuthenticationService.isUserLoggedIn()
        // console.log(isUserLoggedInApp)
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="http://www.in28minutes.com" className="navbar-brand">in28min</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedInApp && <li><Link className="nav-link" to="/welcome/in28min">Home</Link></li>}
                        {isUserLoggedInApp && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedInApp && <li><Link className="nav-link" to="/login">Login</Link> </li>}
                        {isUserLoggedInApp && <li><Link className="nav-link" onClick={AuthenticationService.logout} to="/logout">Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default withRouter(HeaderComponent);