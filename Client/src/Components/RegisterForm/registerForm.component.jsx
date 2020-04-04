import React from 'react';
import Joi from 'joi-browser';
import Form from '../Common/Form/form.component';
import Input from '../Common/Input/input.component';
import {register} from '../../Services/user.service';
import {loginWithJwt} from '../../Services/auth.service';
import './registerForm.styles.css';

class LoginForm extends Form {
    constructor(props) {
        super(props);
        this.state = {
            data:{
                name: '',
                email: '',
                password: ''
            },
            errors:{}
        }

        this.schema = {
            name: Joi.string().required().label('Name'),
            email: Joi.string().required().email().label('Email'),
            password: Joi.string().min(6).max(12).required().label('Password'),
        }
    }
    doSubmit = async () =>{
        // Call the Server
        console.log(this.state)
		try {
			const {name, email, password} = this.state.data;
            const response = await register({name, email, password});
            loginWithJwt(response.headers['x-auth-token']);
			window.location='/';

			
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors ={...this.state.errors};
				errors.email = ex.response.data.message;
				this.setState({errors});
			}
		}
		
	}
    render() { 
        const {data, errors} = this.state;
        return ( 
            <div className="register-form-container container-fluid">
                <div className="register-form-title col-12">Register</div>
                <form onSubmit={this.handleSubmit} className="login-form">
                    <Input onChange={this.handleChange} id="name" type="text" label="Name" name="name" value={data.name} error={errors.name} focus={true} placeholder="Please Enter Your Name"></Input>
                    <Input onChange={this.handleChange} id="email" type="email" label="Email" name="email" value={data.email} error={errors.email} placeholder="Please Enter Your Email"></Input>
                    <Input onChange={this.handleChange} id="password" type="password" label="Password" name="password" value={data.password} error={errors.password}  placeholder="Please Enter Your Password"></Input>
                    <button type="submit">Register</button>
                </form>
            </div>
         );
    }
}
 
export default LoginForm;