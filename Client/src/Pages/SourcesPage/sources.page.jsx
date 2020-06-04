import React, { Component } from 'react';
import SourcesList from '../../Components/SourcesList/sourcesList.component';
import Pagination from "react-js-pagination";
import Loader from '../../Components/Common/SpinningLoader/spinningLoader.component';
import Error from '../../Components/Error/error.component';
import {getSources, editSubscription} from '../../Services/source.service';
import './sources.styles.css';

class SourcesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sources:[],
            currentPage: 1,
            pageSize: 12,
            totalSourcesCount: 0,
            isLoading: true,
            error: ''
        }
    }
    async componentDidMount() {
        document.title = "Newsify | Sources"
        this.loadSources();
    }
    handlePageChange = page => {
        this.setState({currentPage: page, isLoading:true}, () => {
            this.loadSources(page)
        });
    };
    handleSubcribeChange = async (source) => {
       await editSubscription(source)
                .then(response => {
                    if(response.status === 200) {
                        const {sources} = this.state
                        sources[sources.indexOf(source)].isSubscribed = !source.isSubscribed;
                        this.setState({sources});
                    }
                })
                .catch(err => console.log(err));
    }
    async loadSources(page) {
        const {currentPage, pageSize} = this.state;
        page = page ? page : currentPage;
        getSources(currentPage, pageSize)
        .then(response => {
            if(response.data.status === 200) 
                this.setState({
                    sources: response.data.data.sources,
                    totalSourcesCount: response.data.data.totalCount, 
                    currentPage: page,
                    isLoading: false
                });
            else this.setState({isLoading: false, error: 'SomeThing Wrong happened, Please check your connection try again'});
        })
        .catch(err => this.setState({isLoading: false, error: 'SomeThing Wrong happened, Please check your connection try again'})) ; 
    }
    render() { 
        const {sources, currentPage, totalSourcesCount, pageSize, isLoading, error} = this.state
        return ( 
            <div className="sources-page-container">
                {error !== '' && <Error error={error} />}
                {isLoading &&  <Loader /> }
                {!isLoading && error === '' && <SourcesList sources={sources} handleSubcribeChange={this.handleSubcribeChange} />}
                <div className="pagination-container">
                    {!isLoading && error === '' && 
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={pageSize}
                            totalItemsCount={totalSourcesCount}
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
 
export default SourcesPage;