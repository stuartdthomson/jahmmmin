import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {term:''};

    this.search = this.search.bind(this);
    this.handleChangeTerm = this.handleChangeTerm.bind(this);
  }

  search () {
    this.props.onSearch(this.state.term);
  }

  handleChangeTerm (e){
    this.setState({term:e.target.value});
  }

  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleChangeTerm} placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}
export default SearchBar;
