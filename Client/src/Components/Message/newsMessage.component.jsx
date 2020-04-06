import React from 'react';
import './newsMessage.styles.css'
const NewsMessage = (props) => {
    return ( 
        <div className="message-container  row">
            <div className="warrning col-12">You didn't subscribe to any source!, Please subcribe first</div>
            <div className="go-to-sources-btn" onClick={() => props.history.push('/sources')} >Go to Sources</div>
        </div>
     );
}
 
export default NewsMessage;