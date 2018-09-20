import React from 'react';
import MainPage from './MainPage';
import SearchPage from './SearchPage';

import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  moveShelf = (book, shelf) => {
    update(book, shelf);
  }

  render() {
    return (
      <div className="app">
        <MainPage 
        books={this.state.books}
        moveShelf={this.moveShelf}
        />
      </div>
    )
  }
}

export default BooksApp
