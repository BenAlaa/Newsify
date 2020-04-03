  
import React from 'react';

export default function(ComposedComponenet, isAuthorized) {
    class ProtectedRout extends React.Component {
        componentDidMount(){
            if(!isAuthorized) this.props.history.push('/login');
        }
        render = () => ( <ComposedComponenet {...this.props} /> );
    }
    return ProtectedRout;
}