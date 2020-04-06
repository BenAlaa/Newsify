import React, {useEffect} from 'react';
import { Container, Row, Col } from 'styled-bootstrap-grid';
import logo from './Assets/404.png'
import "./notFound.styles.css";

const NotFound = (props) => {
    useEffect(() => {
        document.title = "Not Found"
    }, []);
    const handelBackToHome = () => {
        props.history.push('/home');
    }
    return (
        <div className="notfound-container">
            <Container>
                <Row>
                    <Col xs={12} sm={10} md={8} lg={8} xl={8} xsOffset={0} smOffset={1} mdOffset={2} lgOffset={2} xlOffset={2}>
                        <img src={logo} alt="404"></img>
                        <h1>Oops! Page Not Be Found</h1>
                        <p>Sorry but the page you are looking for does not exist, have been removed, name changed or is temporarily unavailable</p>
                        <div className="link-container">
                            <div className="back-to-home-btn" onClick={() => handelBackToHome()} >Back to home page</div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default NotFound;