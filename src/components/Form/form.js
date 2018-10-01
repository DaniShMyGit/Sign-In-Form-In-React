import React from 'react';
import { FormValidation } from '../FormValidation/formValidation';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class SignUpForm extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            first: '',
            last: '',
            formErrors: { first: '', last: '' },
            isFirstNameValid: false,
            isLastNameValid: false,
            isFormValid: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

     handleChange = e => {
        const target = e.target;
        const value = target.value;
        const fieldName = target.name;

        this.setState({
            [fieldName]: value
        }, () => {
            this.validateField(fieldName, value)
        });
    }

    validateField = (fieldName, value) => {
        const fieldValidationErrors = this.state.formErrors;
        let isFirstNameValid = this.state.isFirstNameValid;
        let isLastNameValid = this.state.isLastNameValid;

        switch (fieldName) {
            case 'first':
                isFirstNameValid = value.match(/^[a-zA-Z][a-zA-Z]{1,20}$/i);
                fieldValidationErrors.first = isFirstNameValid ? '' : ' must have 2-20 letters';
                break;
            case 'last':
                isLastNameValid = value.match(/^[a-zA-Z][a-zA-Z]{1,20}$/i);
                fieldValidationErrors.last = isLastNameValid ? '' : ' must have 2-20 letters';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            isFirstNameValid: isFirstNameValid,
            isLastNameValid: isLastNameValid
        }, this.validateForm);
    }



    validateForm = () => {
        this.setState({
            isFormValid: 
                this.state.isFirstNameValid &&
                this.state.isLastNameValid
        });


    }

    handleSubmit = e => {
        e.preventDefault();

        let { history } = this.props;

        history.push('/user/', {
            firstName: this.state.first,
            lastName: this.state.last,
            isValid: this.state.isFormValid 
        });

    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }


    render() {
        const {first, last, formErrors, isFormValid} = this.state;
        return (
            
                <form className="container-fluid col-sm-5" onSubmit={this.handleSubmit}>
                    <div className={`form-group row ${this.errorClass(formErrors.first)}`}>
                        <label className="col-sm-2 col-form-label" htmlFor="firstName">First Name: </label>
                        <div className="col-sm-10">
                            <input type="text" required class="form-control" id="firstName" value={first} onChange={this.handleChange} maxLength="20" minLength="2" placeholder="Enter your first Name" name="first" />
                        </div>
                    </div>

                    <div className={`form-group row ${this.errorClass(formErrors.last)}`}>
                        <label className="col-sm-2 col-form-label" htmlFor="lastName">Last Name: </label>
                        <div className="col-sm-10">
                            <input type="text" required class="form-control" id="lastName" value={last} onChange={this.handleChange} maxLength="20" minLength="2" placeholder="Enter your last Name" name="last" />
                        </div>
                    </div>


                    <div className="form-group">
                        <button class="btn btn-primary" disabled={!isFormValid} type="submit" >Continue</button>
                    </div>


                    <div className="panel panel-default text-danger">
                        <FormValidation formErrors={formErrors} />
                    </div>

                </form>

        );
    }
}

SignUpForm.PropTypes = {
    first: PropTypes.string,
    last: PropTypes.string,
    formErrors: PropTypes.arrayOf(PropTypes.string),
    isEmailValid: PropTypes.bool,
    isFirstNameValid: PropTypes.bool,
    isLastNameValid: PropTypes.bool,
    isFormValid: PropTypes.bool

};

export default withRouter(SignUpForm);
