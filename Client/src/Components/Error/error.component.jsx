import React from 'react';
import './error.styles.css';

const Error = ({error}) => {
    return ( 
        <div className="error-container">{error}</div>
     );
}
 
export default Error;