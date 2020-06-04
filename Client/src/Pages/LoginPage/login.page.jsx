import React from 'react';
import {Redirect} from 'react-router-dom';
import {Container, Row, Col} from 'styled-bootstrap-grid';
import LoginForm from '../../Components/LoginForm/loginForm.component';
import RegisterForm from '../../Components/RegisterForm/registerForm.component';
import background from './Assets/news-image.png';
import './login.styles.css';
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            isRegister: false
        }
    }
    componentDidMount(){
        document.title = "Newsify | Login - Register";
    }
    handleTapChange(tap) {
        let {isLogin, isRegister} = this.state
        switch(tap) {
            case 'login':
                isLogin = true;
                isRegister = false;
                break;
            case 'register' :
                isLogin = false;
                isRegister = true;
                break;
            default:
                break;
        }
        this.setState({isLogin, isRegister});
    }
    render() { 
        const {isLoggedin} = this.props;
        if(isLoggedin) return <Redirect to="/home" />
        const {isLogin, isRegister} = this.state;
        return ( 
            <div className="login-page-container container-fluid">
                <Row>
                    <Col lg={12} xl={6} >
                        <div className="left-section ">
                            <Container>
                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={10} xl={8} mdOffset={0} lgOffset={1} xlOffset={2}>
                                        <div className="forms-container">
                                            <Row>
                                                <Col col={5}>
                                                    <div className='login-tap' onClick={() => this.handleTapChange('login')}>Login</div>
                                                </Col>
                                                <Col col={5} offset={2}>
                                                    <div className='register-tap' onClick={() => this.handleTapChange('register')}>Register</div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col col={12}>
                                                    {isLogin && 
                                                        <div className="login-form-content">
                                                            <LoginForm {...this.props} />
                                                        </div>
                                                    }
                                                    {isRegister && 
                                                        <div className="register-form-content">
                                                            <RegisterForm {...this.props}/>
                                                        </div>
                                                    }
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                            

                        </div>
                    </Col>
                    <Col xl={6} >
                        <div className="right-section d-lg-none d-xl-block">
                            <img className="col-12 img-fluid" src={background} alt="logo"/>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
 
export default LoginPage;