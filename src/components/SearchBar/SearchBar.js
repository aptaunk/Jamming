import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
  }
  handleSearch(event) {
    this.props.searchSpotify(this.state.query);
    event.preventDefault();
  }
  handleQueryChange(event) {
    this.setState({
      query: event.target.value
    });
  }
  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleQueryChange} placeholder="Enter A Song Title" />
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
