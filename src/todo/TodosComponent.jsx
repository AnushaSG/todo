import React, { Component } from 'react';
import TodoDataService from './TodoDataService.js';
import AuthenticationService from './AuthenticationService.js';


class ListTodosComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [
            ],
            message: null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
    }

    componentDidMount() {
        this.refreshTodos();

    }
    refreshTodos() {
        let username = AuthenticationService.getLoggedinUserName();
        TodoDataService.retriveAllTodos(username)
            .then(
                response => {
                    this.setState({ todos: response.data })
                }
            )
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedinUserName();
        TodoDataService.deleteTodo(username, id)
            .then(
                response => {
                    this.setState({ message: `Delete of ${id} is successful` })
                    this.refreshTodos();
                }
            )
        
    }

    updateTodoClicked(id){
        this.props.history.push(`/todo/${id}`)
        let username = AuthenticationService.getLoggedinUserName();
        TodoDataService.deleteTodo(username, id)
            .then(
                response => {
                    this.setState({ message: `Delete of ${id} is successful` })
                    this.refreshTodos();
                }
            )
       
    }
    render() {
        return (
            <>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <h1>List Todos</h1>
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Description</th>
                                    <th>Is Completed</th>
                                    <th>Target Date</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.todos.map(todo =>
                                        <tr key={todo.id}>
                                            <td>{todo.id}</td>
                                            <td>{todo.description}</td>
                                            <td>{todo.done.toString()}</td>
                                            <td>{todo.targetDate.toString()}</td>
                                            <td ><button className="btn btn-warning" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                            <td><button className="btn btn-danger" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </>)
    }
}
export default ListTodosComponent;
