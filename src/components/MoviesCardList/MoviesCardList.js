import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { DESKTOP_WIDTH, TABLET_WIDTH } from '../../utils/constants';

function MoviesCardList(props) {
  const [lastCard, setIsLastCard] = React.useState(0);
  const moviesList = props.movies.slice(0, lastCard);

  function showsnumberList() {     
    if (window.innerWidth < TABLET_WIDTH) {
        return setIsLastCard(5)
    } if (window.innerWidth >= TABLET_WIDTH && window.innerWidth <= DESKTOP_WIDTH) {
        return setIsLastCard(8)
    } if (window.innerWidth > DESKTOP_WIDTH) {
        return setIsLastCard(12)
    }
  }

  React.useEffect(() => {
    showsnumberList()
  }, [props.movies]);

  function handleLoadMore() {
      if (window.innerWidth < TABLET_WIDTH) {
          return setIsLastCard(lastCard + 2)
      } if (window.innerWidth >= TABLET_WIDTH && window.innerWidth <= DESKTOP_WIDTH) {
          return setIsLastCard(lastCard + 2)
      } if (window.innerWidth > DESKTOP_WIDTH) {
          return setIsLastCard(lastCard + 3)
      }
  }

  function handleLoadButton() {
      if (moviesList.length === props.movies.length) {
          return true
      } else {
          return false
      }
  }

  return (
    <section className="movies-list">
      <Preloader isPreloader={props.isPreloader}/>
      <span className='movies__error'>
        {props.notFoundError ? 'Ничего не найдено' : '' }
        {props.serverError ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз' : ''}</span>
      <section className="movies-list__grid">
        {moviesList.map((movie) => {
          return (
            <MoviesCard
              movie={movie}
              key={props.isSaved ? movie.movieId : movie.id}
              savedMovies={props.savedMovies}
              isSaved = {props.isSaved}
              onSaveMovie={props.onSaveMovie}
              onDeleteMovie={props.onDeleteMovie}/>
          )     
        })}
      </section>
      <button
        onClick={handleLoadMore}
        className={handleLoadButton() ? 'movies__button movies__button_invisible' : 'movies__button'}
        >Ещё</button>
    </section>
  );
}

export default MoviesCardList;