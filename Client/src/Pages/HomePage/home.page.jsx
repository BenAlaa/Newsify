import React from 'react';
import { Row, Col} from 'styled-bootstrap-grid';
import NewsCard from '../../Components/NewsCard/newsCard.component';
import {getNews} from '../../Services/news.service';
import './home.styles.css';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news:[],
            currentPage: 1,
            pageSize: 20,
            isLoading: true,
            error: ''
        }
    }
    async componentDidMount() {
        this.loadNews();
    }
    // shouldComponentUpdate(){
    //     return false;
    // }
    async loadNews() {
        getNews()
        .then(response => {
            if(response.data.status === 200) 
                this.setState({news: response.data.data.articles, isLoading: false});
            this.setState({error: 'SomeThing Wrong happened, Please try again'});
        })
        .catch(err => this.setState({error: "Could not load news, Check your connection.."})) ; 
    }
    render() { 
        const {news} = this.state
        return ( 
            <div className="home-container">
                <div className="news-container">
                    <Row>
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
                    </Row>
                    
                </div>
            </div>
        );
    }
}
 
export default HomePage;