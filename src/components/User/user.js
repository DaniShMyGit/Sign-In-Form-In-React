import React from "react";
import { FormValidation } from '../FormValidation/formValidation';
import PropTypes from 'prop-types';

export class userPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            emailErrors: '',
            isEmailValid: false,
            userDetails: []

        };

        this.validateField = this.validateField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        
    }

    validateField = e => {
        const emailInput = e.target.value;
        let isEmailValid = emailInput.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        const emailValidationErrors = isEmailValid ? '' : ' is invalid';
               
        this.setState({
            emailErrors: emailValidationErrors,
            isEmailValid: isEmailValid,
            email: emailInput
        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            userDetails:  [{firstName: this.props.location.state.firstName,
            lastName: this.props.location.state.lastName,
            email: this.state.email}]
            
             });
        }

    

    render() {
       const formErrors = {email: this.state.emailErrors};
       const {email, isEmailValid,userDetails} = this.state;

   
        return (
            <form className="container-fluid col-sm-5" onSubmit={this.handleSubmit}>
                <div className={`form-group row ${this.errorClass(email)}`}>
                        <label  className="col-sm-2 col-form-label" htmlFor="email">email: </label>
                        <div className="col-sm-10">
                            <input type="email" required class="form-control" id="email" value={email} onChange={this.validateField} placeholder="Enter your email address" name="email" />
                        </div>
                    </div>

                    <div className="form-group">
                        <button class="btn btn-primary" disabled={!isEmailValid} type="submit" >Submit</button>
                    </div>

                    <div className="panel panel-default text-danger">
                        <FormValidation formErrors={formErrors} />
                    </div>
                     
                     <label hidden={!userDetails.length}>{JSON.stringify(userDetails)}</label>
            </form>
        );
    }
}

userPage.PropsType = {
    email: PropTypes.string,
    userDetails: PropTypes.arrayOf(PropTypes.string),
    isEmailValid: PropTypes.bool,
    emailErrors: PropTypes.string
};

export default userPage;