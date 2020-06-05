import React from 'react';
import './App.css';
import Book from './Book';
import BookForm from './BookForm';

class App extends React.Component{

  constructor( props ){
    super( props );
    this.state = {
      results: [],
      loading: undefined
    }
    this.searchBooks = this.searchBooks.bind(this)
  }

  searchBooks(term) {
    this.setState({ loading: true })
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${term}`)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
      })
      .then(res => {
        console.log(res)
        return res
      })
      .then(res => res.items ? res.items.map(r => ({
        id: r.id,
        thumbnail: r.volumeInfo.imageLinks ? r.volumeInfo.imageLinks.smallThumbnail : "",
        authors: r.volumeInfo.authors,
        title: r.volumeInfo.title,
        snippet: r.searchInfo ? r.searchInfo.textSnippet : ""
      })) : [])
      .then(results => {
        this.setState({ results, loading: false })
      })
      .catch(err => {
        this.setState({ results: [], loading: false })
      })
  }

  render(){
    const { results, loading } = this.state
    return(
      <div>
        <BookForm onSearch={this.searchBooks} />
        {results && results.map(b =>
          <Book
            key={b.id}
            thumbnail={b.thumbnail}
            authors={b.authors}
            title={b.title}
            snippet={b.snippet} />)}
        {loading === false && results && results.length === 0 &&
          <span>No results were found</span>}
      </div>
    )
  }

}

export default App;
