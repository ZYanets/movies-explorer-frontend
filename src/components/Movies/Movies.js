import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies(props) {
  
  React.useEffect(() => {
    props.clearErrors();
  }, [])

  return (
    <div className="movies">
      <Header isLoggedIn={props.isLoggedIn}/>
      <SearchForm
        isSaved={false}
        onSearchMovies={props.onSearchMovies}
        onSearchSavedMovies={props.onSearchSavedMovies}
        onCheckbox={props.onCheckbox}
        />
      <MoviesCardList
        isSaved={false}
        isPreloader={props.isPreloader}
        movies={props.movies}
        savedMovies={props.savedMovies}
        onSaveMovie={props.onSaveMovie}
        onDeleteMovie={props.onDeleteMovie}
        notFoundError={props.notFoundError}
        serverError={props.serverError}
        />
      <Footer/>
    </div>
  );
}

export default Movies;