import React from 'react';
import {Redirect} from 'react-router-dom';
import './login.styles.css';
const LoginPage = ({isLoggedin}) => {
    
    if(isLoggedin) return <Redirect to="/home" />
    return ( 
        <h1>Login Page</h1>
     );
}
 
export default LoginPage;