import React from 'react';
import {Col} from 'styled-bootstrap-grid';
import SourceCard from '../SourceCard/sourceCard.component';

const SourcesList = ({sources, handleSubcribeChange}) => {
    return ( 
        <div className="sources-container row">
            {sources.map(source => {
                const {name, description, url, category, language, country, isSubscribed} = source;
                return (
                    <Col col={12} xs={12} sm={12} md={12} lg={6} xl={4} key={source.id}>
                        <SourceCard
                            name={name}
                            description={description}
                            url={url}
                            category={category}
                            language={language}
                            country={country}
                            isSubscribed={isSubscribed}
                            handleSubcribeChange={() => handleSubcribeChange(source)}
                        />
                    </Col>
                )
            })}
        </div>
     );
}
 
export default SourcesList;