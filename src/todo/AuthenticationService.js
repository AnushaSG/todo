import axios from "axios";

class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        return axios.get("http://localhost:4040/basic-auth", {
            headers: {
                authorization: this.createBasicAuthToken(username, password)
            }
        })
    }


    executeJwtAuthenticationService(username, password) {
        return axios.post(`http://localhost:4040/authenticate`, {
            username,
            password
        })
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin(username, password) {

        sessionStorage.setItem('authenticatedUser', username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem('authenticatedUser', username);
        this.setupAxiosInterceptors(this.createJwtToken(token))
    }

    createJwtToken(token) {
        return 'Bearer ' + token
    }


    setupAxiosInterceptors(basicAuthHeader) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = basicAuthHeader
                }
                return config
            }

        )
    }

    logout(username, password) {
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user === null) {
            return false
        }
        return true
    }

    getLoggedinUserName() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user === null) return ''
        return user;

    }
}
export default new AuthenticationService()