import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { savedMovies } from '../../utils/movies';

function SavedMovies() {
  return (
    <div className="movies">
      <Header/>
      <SearchForm/>
      <MoviesCardList movies={ savedMovies }/>
      <Footer/>
    </div>
  );
}

export default SavedMovies;