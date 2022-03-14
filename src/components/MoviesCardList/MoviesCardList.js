import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({movies}) {
  const [noOfElement, setNoOfElement] = React.useState(12);
  function loadMore() {
    setNoOfElement(noOfElement + 3);
  }

  const slice = movies.slice(0, noOfElement);

  return (
    <section className="movies-list">
        <section className="movies-list__grid">
            {slice.map((movie) => (
            <MoviesCard
                movie={movie}
                key={movie.id}
                />
            ))}
        </section>
        {movies.length > 12
            ? (<button className="movies__button_visible" onClick={loadMore}>Ещё</button>)
            : (<div className="movies__button_invisible"></div>)}
    </section>
  );
}

export default MoviesCardList;
