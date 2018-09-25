import React, { Component } from 'react'
import Books from './Books'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchPage extends Component {
  state = {
    query: '',
    foundBooks: []
  }

  updateQuery = (query) => {
    this.setState({
      query: query
    })
    this.updateFoundBooks(query);
  }

  updateFoundBooks = (query) => {
    if (query) {
      BooksAPI.search(query)
      .then((foundBooks) => {
        if (foundBooks.error) {
          this.setState({ foundBooks: [] });
        } else {
          this.setState({ foundBooks: foundBooks });
        }
      })
    } else {
      this.setState({ foundBooks: [] });
    }
  }

  render() {
    return (
        <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
            onClick={() => this.setState({ showSearchPage: false })}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              The search from BooksAPI is limited to a particular set of search terms in here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
            */}
            <input
            type="text"
            placeholder="Search by title or author"
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.foundBooks.map(foundBook => {
              let shelf = "none";

              this.props.books.map(book => (
                book.id === foundBook.id ? shelf = book.shelf : ''
              ));

              return (
                <li key={foundBook.id}>
                  <Books
                  book={foundBook}
                  moveShelf={this.props.moveShelf}
                  currentShelf={shelf}
                  />
                </li>
              );
            })
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;