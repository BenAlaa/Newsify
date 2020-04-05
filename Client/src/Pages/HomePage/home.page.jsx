import React from 'react';
import { Row, Col} from 'styled-bootstrap-grid';
import NewsCard from '../../Components/NewsCard/newsCard.component';
import Pagination from "react-js-pagination";
import {getNews} from '../../Services/news.service';
import './home.styles.css';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news:[],
            currentPage: 1,
            pageSize: 12,
            totalNewsCount: 0,
            isLoading: true,
            error: ''
        }
    }
    async componentDidMount() {
        this.loadNews();
    }
    handlePageChange = page => {
        this.setState({currentPage: page, isLoading:true}, () => {
            this.loadNews(page)
        });
    };
    async loadNews(page) {
        const {currentPage, pageSize} = this.state;
        page = page ? page : currentPage;
        getNews(currentPage, pageSize)
        .then(response => {
            if(response.data.status === 200) 
                this.setState({
                    news: response.data.data.articles,
                    totalNewsCount: response.data.data.totalResults, 
                    currentPage: page,
                    isLoading: false
                });
            else this.setState({isLoading: false, error: 'SomeThing Wrong happened, Please try again'});
        })
        .catch(err => this.setState({isLoading: false, error: "SomeThing Wrong happened, Please try again..."}));
    }
    render() { 
        const {news, currentPage, totalNewsCount, pageSize, isLoading, error} = this.state;
        return ( 
            <div className="home-container">
                { !news && 
                    <div className="message-container row">
                        <Col col={12}>
                            <div className="warrning ">You didn't subscribe to any source!, Please subcribe first</div>
                        </Col>
                        
                        <div className="go-to-sources-btn" onClick={() => this.props.history.push('/sources')} >Go to Sources</div>
                    </div>
                }
                {error !== '' && 
                    <div className="error-container">{error}</div>
                }
                {isLoading && 
                    <div className="loader-container">
                        <div className="spinner-border text-secondary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                }
                {!isLoading && error === '' && news?.length > 0 &&
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
                }
                <div className="pagination-container">
                    {!isLoading && error === '' && news &&
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={pageSize}
                            totalItemsCount={totalNewsCount}
                            pageRangeDisplayed={10}
                            onChange={this.handlePageChange}
                            itemClass="page-item"
                            linkClass="page-link"
                        />
                    }
                </div>
            </div>
        );
    }
}
 
export default HomePage;