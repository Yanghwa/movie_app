import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Movie from "./Movie";

// const movieTitles = [
//   "Matrix",
//   "Full metal jacket",
//   "Oldboy",
//   "Starwars"
// ];

// const movieImages = [
//   "https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/The_Matrix_Poster.jpg/220px-The_Matrix_Poster.jpg", 
//   "https://images-na.ssl-images-amazon.com/images/M/MV5BNzc2ZThkOGItZGY5YS00MDYwLTkyOTAtNDRmZWIwMGRhYTc0L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UY1200_CR79,0,630,1200_AL_.jpg",
//   "http://westernusc.ca/westernfilm/wp-content/uploads/sites/4/2017/07/old-boy-movie-poster.jpg", 
//   "https://i.pinimg.com/736x/78/72/66/78726686611e3c9b6cbe3f1ede601fcf--star-wars-vii-star-trek.jpg"
// ];

class App extends Component {
  //Render : componentWillMount() -> render() -> componentDidMount()
  //Update : componentWillRecieveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> compenent

  state = {
    // greeting: 'Hello!',
  }

  componentDidMount() {
    this._getMovies();
    // setTimeout(()=>{
    //   this.setState({
    //     movies : [
    //       {
    //         title: "Matrix",
    //         poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/The_Matrix_Poster.jpg/220px-The_Matrix_Poster.jpg"
    //       },
    //       {
    //         title: "Full metal jacket",
    //         poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BNzc2ZThkOGItZGY5YS00MDYwLTkyOTAtNDRmZWIwMGRhYTc0L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UY1200_CR79,0,630,1200_AL_.jpg"
    //       },
    //       {
    //         title: "Oldboy",
    //         poster:"http://westernusc.ca/westernfilm/wp-content/uploads/sites/4/2017/07/old-boy-movie-poster.jpg"
    //       },
    //       {
    //         title: "Starwars",
    //         poster:"https://i.pinimg.com/736x/78/72/66/78726686611e3c9b6cbe3f1ede601fcf--star-wars-vii-star-trek.jpg"
    //       },
    //       {
    //         title: "Trainspotting",
    //         poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMzA5Zjc3ZTMtMmU5YS00YTMwLWI4MWUtYTU0YTVmNjVmODZhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UY1200_CR90,0,630,1200_AL_.jpg"
    //       }
    //     ]
    //   });
    // }, 2000);
  }

  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
        return <Movie 
          title={movie.title_english} 
          poster={movie.medium_cover_image} 
          key={movie.id} 
          genres={movie.genres}
          synopsis={movie.synopsis} />;
      });
    return movies;
  }

  _getMovies = async() => {
    const movies = await this._callApi();
    this.setState({
      movies
    })
  }

  _callApi = () => {
    return fetch("https://yts.am/api/v2/list_movies.json?sort_by=rating")
            .then(response => response.json())
            .then(json => json.data.movies)
            .catch(err => console.log(err));
  }

  render() {
    const {movies} = this.state;
    return( 
      <div className={movies ? "App" : "App--loading"}>
        {/* {this.state.greeting} */}
        {movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}

export default App;
