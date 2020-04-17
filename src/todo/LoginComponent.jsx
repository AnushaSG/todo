import React, { Component } from 'react';
import AuthenticationService from './AuthenticationService.js';


class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showSuccessMessage: false,
            hasLoginFailed: false
        }

        //this.handleUsernameChange=this.handleNameChange.bind(this);
        // this.handlePasswordChange=this.handlePasswordChange.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    loginClicked() {
        /*AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
            .then(
                () => {
                    this.props.history.push(`/welcome/${this.state.username}`)
                    AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
                }
            ).catch(() => {
                this.setState({ showSuccessMessage: false, hasLoginFailed: true });
            }
            )*/
           
        AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                console.log(response.data.token)
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token);
                this.props.history.push(`/welcome/${this.state.username}`)
            }
            ).catch(() => {
                this.setState({ showSuccessMessage: false, hasLoginFailed: true });
            }
            )


    }


    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container"></div>
                {  /* <ShowLoginSuccess showSuccessMessage={this.state.showSuccessMessage}></ShowLoginSuccess>
                <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed} ></ShowInvalidCredentials>*/}

                {this.state.showSuccessMessage && <div>Login successful</div>}
                {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid credentials</div>}
                User Name: <input id="username" type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                <button className="btnbtn" onClick={this.loginClicked}>Login</button>
            </div>
        )
    }
}
export default LoginComponent;