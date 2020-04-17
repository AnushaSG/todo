import axios from 'axios';

class HelloWorldService {
    executeHelloWorldService() {
        return axios.get('http://localhost:4040/helloworld');
    }

    executeHelloWorldBeanService() {
        return axios.get('http://localhost:4040/helloworld-bean/');
    }

    executeHelloWorldPathVariableService(name) {

        return axios.get(`http://localhost:4040/helloworld/path-varible/${name}`);
    }


}

export default new HelloWorldService();