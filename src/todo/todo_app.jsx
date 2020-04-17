import React, { Component } from 'react';
import './todo_app.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute';
import WelcomeComponent from './WelcomeComponent';
import ListTodosComponent from './TodosComponent';
import LoginComponent from './LoginComponent';
import LogoutComponent from './LogoutComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import TodoComponent from './TodoComponent';

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <HeaderComponent></HeaderComponent>
                    <Switch>
                        <Route path="/" exact component={LoginComponent} />
                        <Route path="/login" component={LoginComponent} />
                        <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent} />
                        <AuthenticatedRoute path="/todos" component={ListTodosComponent} />
                        <AuthenticatedRoute path="/todo/:id" component={TodoComponent}/>
                        <Route path="/logout" component={LogoutComponent} />
                        <Route component={ErrorComponent} />
                    </Switch>
                    <FooterComponent></FooterComponent>
                </Router>
            </div>
        )
    }
}

function ErrorComponent() {
    return <div>An error occured</div>
}

export default TodoApp;