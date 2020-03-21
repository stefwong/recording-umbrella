import React, { Component } from 'react';

class MarketPlaceSearchResults extends Component {
    render() {
        return (
            <div>
                MarketPlaceSearch {this.props.match.params.searchText}
            </div>
        );
    }
}

export default MarketPlaceSearchResults;