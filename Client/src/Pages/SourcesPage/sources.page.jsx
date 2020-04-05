import React, { Component } from 'react';
import { Row, Col} from 'styled-bootstrap-grid';
import Pagination from "react-js-pagination";
import SourceCard from '../../Components/SourceCard/sourceCard.component';
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
            else this.setState({isLoading: false, error: 'SomeThing Wrong happened, Please try again'});
        })
        .catch(err => this.setState({isLoading: false, error: 'SomeThing Wrong happened, Please try again'})) ; 
    }
    render() { 
        const {sources, currentPage, totalSourcesCount, pageSize, isLoading, error} = this.state
        return ( 
            <div className="sources-page-container">
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
                {!isLoading && error === '' &&
                    <div className="sources-container">
                        <Row>
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
                                            handleSubcribeChange={() => this.handleSubcribeChange(source)}
                                        />
                                    </Col>
                                    
                                )
                            })}
                        </Row>
                    </div>
                }
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