import React from 'react';
import PropTypes from "prop-types";
import { faLink, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  dateFormater } from '../../Utils/utils';
import './newsCard.styles.css';

import './newsCard.styles.css'
const NewsCard = ({ title, description, content, url, urlToImage, source, publishedAt }) => {
    return (
        <div className="news-card-container" style={{ backgroundImage: `url(${urlToImage})` }}>
            <div className="news-subCars-container">
                <div className="news-title"><FontAwesomeIcon className="title-icon" icon={faNewspaper} />{title}</div>
                <div className="news-publishedAt">{dateFormater(publishedAt)}</div>
                <hr />
                <div className="news-description">{description}</div>
                <hr />
                <div className="news-content">{content}</div>
                <div className="card-footer row">
                    <div className="news-source">{source}</div>
                    <a className="news-link" href={url}>
                        <FontAwesomeIcon className="" icon={faLink} />
                    </a>
                </div>
            </div>
        </div>
    );
}
NewsCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    content: PropTypes.string,
    url: PropTypes.string.isRequired,
    urlToImage: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
};
export default NewsCard;