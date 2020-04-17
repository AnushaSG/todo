import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import HelloWorldService from '../apis/todo/HelloWorldService.js';

class WelcomeComponent extends Component {

    constructor(props) {
        super(props);
        this.retriveWelcomeMessage = this.retriveWelcomeMessage.bind(this);
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
        this.state = { welcomeMessage: '' }
        this.handleError=this.handleError.bind(this);
    }
    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container">Welcome {this.props.match.params.name}
                    You can manage your todos
                    <Link to="/todos">here</Link>
                </div><br /><br />
                <div className="container">Click here to get customized page
                    <button className="btn btn-success" onClick={this.retriveWelcomeMessage}>Get Welcome message</button>
                </div>
                <div className='container'>
                    {this.state.welcomeMessage}
                </div>
            </>
        )
    }

    retriveWelcomeMessage() {
        //  HelloWorldService.executeHelloWorldBeanService().
        //      then(response => this.handleSuccessfulResponse(response));

        HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name).
            then(response => this.handleSuccessfulResponse(response)).
            catch(error=> this.handleError(error));
    }

    handleSuccessfulResponse(response) {
        this.setState({ welcomeMessage: response.data.message })
    }

    handleError(error){
        console.log(error.response)
        let errorMessage='';
        if(error.message){
            errorMessage+=errorMessage;
        }
        if(error.response && error.response.data){
            errorMessage+=error.response.data.message
        }
        this.setState({welcomeMessage:errorMessage});
    }
}

export default WelcomeComponent;