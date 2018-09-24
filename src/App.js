import React, {Component} from 'react'
import MainPage from './MainPage'
import SearchPage from './SearchPage'

import {Switch, Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

import './App.css'

class BooksApp extends React.Component {
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
          <Route exact path='/' component={MainPage} />
          <Route exact path='/search' component={SearchPage} /> 
        </Switch>
      </div>
    )
  }
}

export default BooksApp
