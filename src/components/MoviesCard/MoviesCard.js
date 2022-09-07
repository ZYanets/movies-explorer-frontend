import React from 'react';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesCard(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isMovieSaved, setIsMovieSaved] = React.useState(false);
  const savedMovie = props.savedMovies.find((item) => item.nameRU === props.movie.nameRU && item.owner === currentUser._id);
  const movieLikeButtonClassName = (
    `movie__button movie__button_type_like ${isMovieSaved ? 'movie__button_type_like_active' : ''}`
  )

  const movie = {
    country: props.movie.country || 'Данные отсутствуют',
    director: props.movie.director || 'Данные отсутствуют',
    duration: props.movie.duration || 'Данные отсутствуют',
    year: props.movie.year || 'Данные отсутствуют',
    description: props.movie.description || 'Данные отсутствуют',
    image: props.isSaved ? props.movie.image : `https://api.nomoreparties.co${props.movie.image.url}`,
    trailerLink: props.isSaved ? props.movie.trailer : props.movie.trailerLink,
    nameRU: props.movie.nameRU || 'Данные отсутствуют',
    nameEN: props.movie.nameEN || 'Данные отсутствуют',
    thumbnail: props.isSaved ? props.movie.thumbnail : `https://api.nomoreparties.co${props.movie.image.formats.thumbnail.url}`,
    movieId: props.isSaved ? props.movie._id : props.movie.id,
  }

  function handleMovieLike(){
    if(isMovieSaved) {
      const likedMovie = props.savedMovies.find((item) => item.movieId === props.movie.id);
      props.onDeleteMovie(likedMovie._id);
    } else { 
      props.onSaveMovie(movie);
    }
    setIsMovieSaved(!isMovieSaved);
  };

  function handleDeleteMovie(){
    props.onDeleteMovie(props.movie._id);
  }

  function handleDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
  };

  function handleTrailer() {
    window.open(`${props.movie.trailerLink}`);
  };
  
  React.useEffect(() => {
    if(savedMovie) {
      setIsMovieSaved(true);
    }
  }, [savedMovie])
  
  return (
    <article className="movie" id={props.isSaved ? props.movie._id : props.movie.id}>
      <img
        className="movie__poster"
        alt={props.movie.nameRU}
        src={props.isSaved ? props.movie.image : `https://api.nomoreparties.co${props.movie.image.url}`}
        onClick={handleTrailer}/>
      <div className="movie__info">
        <div className="movie__description">
          <h2 className="movie__title">{props.movie.nameRU}</h2>
          <span className="movie__duration">{handleDuration(props.movie.duration)}</span>
        </div>
      {!props.isSaved
      ?
        <div className="movie__like">
          <button
            className={movieLikeButtonClassName}
            type="button"
            onClick={handleMovieLike}></button>
        </div>
      :
        <div className="movie__delete">
          <button
            className="movie__button movie__button_type_delete"
            type="button"
            onClick={handleDeleteMovie}></button>
        </div>   
      }
      </div>
    </article>
  );
}

export default MoviesCard;