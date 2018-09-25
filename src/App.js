import React from 'react'
import {Switch, Route} from 'react-router-dom'

import MainPage from './MainPage'
import SearchPage from './SearchPage'

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
    BooksAPI.update(book, shelf);

    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path='/' render={() => (
            <MainPage
              moveShelf={this.moveShelf}
              books={this.state.books}
            />
          )} />
          <Route path='/search' render={() => (
            <SearchPage
              moveShelf={this.moveShelf}
              books={this.state.books}
            />
          )} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
