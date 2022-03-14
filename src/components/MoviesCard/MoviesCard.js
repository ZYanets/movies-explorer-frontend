import React from 'react';
// import Preloader from '../Preloader/Preloader';
import {useLocation} from 'react-router-dom';

function MoviesCard({ movie }) {
  const location = useLocation();

  const [isLiked, setIsLiked] = React.useState(false);
  const movieLikeButtonClassName = (
    `movie__button movie__button_type_like ${isLiked ? 'movie__button_type_like_active' : ''}`
  )

  function handleLikeClick() {
    setIsLiked(!isLiked);
  }

  return (
    <article className="movie">
      <img className="movie__poster" src={movie.image} alt={movie.nameRU}/>
      <div className="movie__info">
        <div className="movie__description">
          <h2 className="movie__title">{movie.nameRU}</h2>
          <span className="movie__duration">{movie.duration}</span>
        </div>
      
      {location.pathname === '/movies' &&
        (<div className="movie__like">
          <button className={movieLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
        </div>)
      }

      {location.pathname === '/saved-movies' &&
        (<div className="movie__delete">
          <button className="movie__button movie__button_type_delete" type="button"></button>
        </div>)
        }

      </div>

    </article>
  );
}

export default MoviesCard;