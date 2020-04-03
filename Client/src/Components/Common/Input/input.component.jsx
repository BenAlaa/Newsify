import React from 'react';
import './input.css';

const Input = ({id, name, label,type, value,error, onChange,focus, placeholder,rows,className}) => {
    
    return (
        <div className="form-group">
            <label htmlFor={name} >{label}</label>
            <input id={id} value={value} onChange={onChange} className={`form-control ${className}`} name={name} type={type} placeholder={placeholder} rows={rows} autoFocus={focus} />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default Input;