import React from 'react';
import './input.styles.css';

const Input = ({id, name, label,type, value,error, onChange,focus, placeholder,rows,classes}) => {
    
    return (
        <div className="form-group">
            <label htmlFor={name} >{label}</label>
            <input id={id} value={value} onChange={onChange} className={`form-control ${classes}`} name={name} type={type} placeholder={placeholder} rows={rows} autoFocus={focus} />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default Input;