import React from 'react';
import NewsList from '../../Components/NewsList/newsList.component'
import Pagination from "react-js-pagination";
import Loader from '../../Components/Common/SpinningLoader/spinningLoader.component';
import Message from '../../Components/Message/newsMessage.component';
import Error from '../../Components/Error/error.component';
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
        document.title = "Newsify | Home"
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
            else this.setState({isLoading: false, error: 'SomeThing Wrong happened, Please check your connection try again'});
        })
        .catch(err => this.setState({isLoading: false, error: "SomeThing Wrong happened, Please check your connection try again..."}));
    }
    render() { 
        const {news, currentPage, totalNewsCount, pageSize, isLoading, error} = this.state;
        return ( 
            <div className="home-container">
                { !news &&  <Message {...this.props}/> }
                {error !== '' && <Error error={error} /> }
                {isLoading && <Loader/>}
                {!isLoading && error === '' && news?.length > 0 &&
                    <NewsList news={news} />
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