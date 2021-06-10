import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

const NYT_API_KEY = 'dGpQ5OmGP2SgfvZimlpCUoF4iOag9qzZ';
const URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?'
            + `api-key=${NYT_API_KEY}&query=`;

// Code SearchableMovieReviewsContainer Here

class SearchableMovieReviewsContainer extends Component {

    state = {
        searchTerm: '',
        reviews: []
    }

    handleInputChange = event => {
        this.setState({ searchTerm: event.target.value })
    }

    handleSubmit = event => {
        event.preventDefault()

        fetch(URL.concat(this.state.searchTerm))
        .then(res => res.json())
        .then(data => this.setState({ reviews: data.results }))
    }

    render() {
        return (
            <div className='searchable-movie-reviews'>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='search-input'>Search Movie Reviews</label>
                    <input id='search-input' type='text' onChange={this.handleInputChange} />
                    <button type='submit'>Submit</button>
                </form>
                {typeof this.state.reviews === 'object' && this.state.reviews.length > 0}
                <MovieReviews reviews={this.state.reviews}/>
            </div>
        );
    }
}

export default SearchableMovieReviewsContainer;
