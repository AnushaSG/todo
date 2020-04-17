import axios from 'axios';

class TodoDataService {

    retriveAllTodos(name) {
        return axios.get(`http://localhost:4040/users/${name}/todos`);
    }

    deleteTodo(name, id) {
        return axios.delete(`http://localhost:4040/users/${name}/todos/${id}`);
    }

}

export default new TodoDataService()