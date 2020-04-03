import React from 'react';
import {Redirect} from 'react-router-dom';
import {Row, Col} from 'styled-bootstrap-grid';
import background from './Assets/news-image.png';
import './login.styles.css';
const LoginPage = ({isLoggedin}) => {
    
    if(isLoggedin) return <Redirect to="/home" />
    return ( 
        <div className="login-page-container container-fluid">
            <Row>
                <Col lg={6} >
                    <div className="forms-container">

                    </div>
                </Col>
                <Col lg={6} >
                    <div className="image-container d-none d-lg-block">
                        <img className="col-12 img-fluid" src={background} />
                    </div>
                </Col>
            </Row>
        </div>
        
     );
}
 
export default LoginPage;