import React from 'react';
import PropTypes from "prop-types";
import Switch from "react-switch";
import { faLink, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './sourceCard.styles.css';
const SourceCard = ({ name, description, category, url, language, country, isSubscribed ,handleSubcribeChange}) => {
    return (
        <div className="source-card-container" >
            <div className="source-name">
                    <FontAwesomeIcon className="source-name-icon" icon={faNewspaper} />
                    <a href={url}>{name}</a>
                </div>
            <div className="upper-container">
                
                <div className="source-description-container">
                    <div className="source-description">{description}</div>
                </div>
                <div className="source-data-container">
                    <div className="source-data">
                        <div className="source-category"><span>Category:</span> {category.toUpperCase()}</div>
                        <div className="source-language"><span>Language:</span> {language.toUpperCase()}</div>
                        <div className="source-country"><span>Country:</span> {country.toUpperCase()}</div>
                    </div>
                </div>
            </div>
            
            
            <div className="source-subCard-container">
                <div className="source-card-footer row">
                    <div className="source-link-container ">
                        <a className="source-link" href={url}>
                            <FontAwesomeIcon className="" icon={faLink} />
                        </a>
                        <span>Visit</span>
                    </div>
                    <div className="subscribe-toggeler-container">
                        <Switch onChange={handleSubcribeChange} checked={isSubscribed} onColor="#fd4d62" offColor="#c9c9c9" />
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
SourceCard.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    handleSubcribeChange: PropTypes.func.isRequired,
    isSubscribed: PropTypes.bool.isRequired
};
export default SourceCard;