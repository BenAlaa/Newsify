import React from 'react';
import Joi from 'joi-browser';
import Form from '../Common/Form/form.component';
import Input from '../Common/Input/input.component';
import {login} from '../../Services/auth.service';
import './loginForm.styles.css';

class LoginForm extends Form {
    constructor(props) {
        super(props);
        this.state = {
            data:{
                email: '',
                password: ''
            },
            errors:{}
        }
        this.schema = {
            email: Joi.string().required().email().label('Email'),
            password: Joi.string().min(6).max(12).required().label('Password'),
        }
    }
    doSubmit = async () =>{
        // Call the Server
		try {
			const {email, password} = this.state.data;
			await login(email, password);
            this.props.history.push('/home');
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors ={...this.state.errors};
				errors.email = ex.response.data.message;
				errors.password = ex.response.data.message;
				this.setState({errors});
			}
		}
		
	}
    render() { 
        const {data, errors} = this.state;
        return ( 
            <div className="login-form-container container-fluid">
                <div className="login-form-title col-12">Login</div>
                <form onSubmit={this.handleSubmit} className="login-form">
                    <Input onChange={this.handleChange} id="email" type="email" label="Email" name="email" value={data.email} error={errors.email} focus={true} placeholder="Please Enter Your Email"></Input>
                    <Input onChange={this.handleChange} id="password" type="password" label="Password" name="password" value={data.password} error={errors.password}  placeholder="Please Enter Your Password"></Input>
                    <button type="submit">Login</button>
                </form>
            </div>
         );
    }
}
 
export default LoginForm;