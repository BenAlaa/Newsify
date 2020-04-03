import { Component } from 'react';
import Joi from 'joi-browser';

class Form extends Component {
    state = { 
        data:{},
        errors:{}
    };
    validate = () => {
		const options = { abortEarly: false };
		const { error } = Joi.validate(this.state.data, this.schema, options);
		if (!error) return null; 

		const errors = {};
		for (let item of error.details) {
			errors[item.path[0]] = item.message;
		}
		return errors;
	};
	validateProperty = ({ name, value }) => {
		const obj = { [name]: value };
		const schema = { [name]: this.schema[name] };
		const { error } = Joi.validate(obj, schema);
		return error ? error.details[0].message : null;

    };
    handleSubmit = e => {
		e.preventDefault();

	                                               

		this.doSubmit();
    };
    handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		if (errors[input.name]) {
			const errorMessage = this.validateProperty(input);
			if (errorMessage) errors[input.name] = errorMessage;
			else delete errors[input.name];
		}
		const data = { ...this.state.data };
		data[input.name] = input.value;
		this.setState({ data, errors });
	};

}
 
export default Form;