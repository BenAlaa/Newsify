import React from 'react';
import './spinningLoader.styles.css';
const SpinningLoader = () => {
    return ( 
        <div className="loader-container">
            <div className="spinner-border text-secondary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
     );
}
 
export default SpinningLoader;