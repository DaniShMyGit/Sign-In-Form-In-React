import React from 'react';
import { FormValidation } from '../FormValidation/formValidation';
import { withRouter } from 'react-router-dom';
class SignUpForm extends React.Component {


    constructor() {
        super();

        this.state = {
            email: '',
            first: '',
            last: '',
            formErrors: { email: '', first: '', last: '' },
            isEmailValid: false,
            isFirstNameValid: false,
            isLastNameValid: false,
            isFormValid: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name]: value
        }, () => {
            this.validateField(name, value)
        });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let isEmailValid = this.state.isEmailValid;
        let isFirstNameValid = this.state.isFirstNameValid;
        let isLastNameValid = this.state.isLastNameValid;

        switch (fieldName) {
            case 'email':
                isEmailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = isEmailValid ? '' : ' is invalid';
                break;
            case 'first':
                isFirstNameValid = value.match(/^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/i);
                fieldValidationErrors.first = isFirstNameValid ? '' : ' must have 2-20 letters';
                break;
            case 'last':

                isLastNameValid = value.match(/^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/i);
                fieldValidationErrors.last = isLastNameValid ? '' : ' must have 2-20 letters';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            isEmailValid: isEmailValid,
            isFirstNameValid: isFirstNameValid,
            isLastNameValid: isLastNameValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            isFormValid: this.state.isEmailValid &&
                this.state.isFirstNameValid &&
                this.state.isLastNameValid
        });


    }

    handleSubmit(e) {
        e.preventDefault();

        let { history } = this.props;
        history.push({
            pathname: '/user/' + this.state.first + '_' + this.state.last
        });

    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    disabledSignUpButton() {
        return (!this.state.isFormValid ? 'disabled' : 'false');

    }

    render() {
        return (

            <div className="container-fluid col-sm-5">

                <form onSubmit={this.handleSubmit}>
                    <div className={`form-group row ${this.errorClass(this.state.formErrors.first)}`}>
                        <label className="col-sm-2 col-form-label" htmlFor="firstName">First Name: </label>
                        <div className="col-sm-10">
                            <input type="text" required class="form-control" id="firstName" value={this.state.first} onChange={this.handleChange} maxLength="20" minLength="2" placeholder="Enter your first Name" name="first" />
                        </div>
                    </div>
                    <div className={`form-group row ${this.errorClass(this.state.formErrors.last)}`}>
                        <label className="col-sm-2 col-form-label" htmlFor="lastName">Last Name: </label>
                        <div className="col-sm-10">
                            <input type="text" required class="form-control" id="lastName" value={this.state.last} onChange={this.handleChange} maxLength="20" minLength="2" placeholder="Enter your last Name" name="last" />
                        </div>
                    </div>
                    <div className={`form-group row ${this.errorClass(this.state.formErrors.email)}`}>
                        <label className="col-sm-2 col-form-label" htmlFor="email">email: </label>
                        <div className="col-sm-10">
                            <input type="email" required class="form-control" id="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter your email address" name="email" />
                        </div>
                    </div>

                    <div className="form-group">
                        <button class="btn btn-primary" disabled={!this.state.isFormValid} type="submit" >Sign-Up</button>
                    </div>

                </form>
                <div className="panel panel-default text-danger">
                    <FormValidation formErrors={this.state.formErrors} />
                </div>

            </div>



        );
    }
}

export default withRouter(SignUpForm);