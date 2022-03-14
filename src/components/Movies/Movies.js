import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { movies } from '../../utils/movies';

function Movies() {
  return (
    <div className="movies">
      <Header/>
      <SearchForm/>
      <MoviesCardList movies={ movies }/>
      <Footer/>
    </div>
  );
}

export default Movies;