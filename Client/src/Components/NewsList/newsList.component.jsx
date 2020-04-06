import React from 'react';
import {Col} from 'styled-bootstrap-grid';
import NewsCard from '../NewsCard/newsCard.component';

const NewsList = ({news}) => {
    return ( 
        <div className="news-container row">
            {news.map(news => {
                const {title, description, content, url, urlToImage, source, publishedAt} = news;
                return (
                    <Col col={12} xs={12} sm={12} md={12} lg={6} xl={4} key={news.title}>
                        <NewsCard
                            title={title}
                            description={description}
                            content={content}
                            url={url}
                            urlToImage={urlToImage}
                            source={source.name}
                            publishedAt={publishedAt}
                        />
                    </Col>
                )
            })}
        </div>
     );
}
 
export default NewsList;