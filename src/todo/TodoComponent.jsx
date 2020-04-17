import React, { Component } from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik'

class TodoComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: 1,
            description: 'Learn forms Now',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validateTodo=this.validateTodo.bind(this);
    }
    onSubmit(values) {
       
    }

    validateTodo(values) {
        let errors = {}
        if (!values.description) {
            errors.description = "Enter a Description"
        } else if (values.description.length<5) {
            errors.description = "enter atleast 5 chracters in description"
        }

        if (!moment(values.targetDate).isValid) {
            errors.targetDate = "Enter a valid date"
        }
    }
    render() {
        let { description, targetDate } = this.state;

        return (
            <div>
                <h1>Todo</h1>
                <div class="container">
                    <Formik initialValues={{ description: description, targetDate: targetDate }} onSubmit={this.onSubmit} validate={this.validateTodo}>
                        {(props) => (
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description"></Field>
                                </fieldset>

                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field className="form-control" type="date" name="targetdate"></Field>
                                </fieldset>
                                <button type="submit" className="btn  btn-success">Save</button>
                            </Form>
                        )}
                    </Formik>

                </div>
            </div>
        )
    }
}

export default TodoComponent