import { Component } from 'react';
import {logout} from '../../Services/auth.service';

class Logout extends Component {
    state = {  }
    componentDidMount() {
        logout();
        this.props.history.push('/');
    }
    render() { 
        return null;
    }
}
 
export default Logout;