import React, { Component } from 'react'
import { Link } from 'gatsby'
 
class Search extends Component {
  state = {
    query: '',
    results: [],
  }

  render() {
    return (
      <div className={this.props.classNames}>
        <span className="SearchBox-SearchIcon"></span>
        <input className="SearchBox-input"
          type='text' 
          value={this.state.query} 
          onChange={this.search} 
          placeholder={"What type of spec do you need?"}
        />
        <ul className='search__list'>
          {this.state.results.map((page) => (
          <li key={page.url}>
            <Link className='search__list_white search__list_non-decoration'
              to={page.url}>
              {page.title}
            </Link>
          </li>
          ))}
        </ul>
      </div>
    )
  }

  getSearchResults(query) {
    if (!query || !window.__LUNR__) return []
    const results = window.__LUNR__.index.search(query)
    return results.map(({ ref }) => window.__LUNR__.store[ref])
  }

  search = event => {
    const query = event.target.value
    const results = this.getSearchResults(query)
    this.setState({ results, query })
  }
}

export default Search