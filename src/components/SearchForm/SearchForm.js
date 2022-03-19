import React from 'react';
import searchIcon from '../../images/search-icon.svg';

function SearchForm() {
  return (
    <section className="search">
      <form className="search__form">
        <fieldset className="search__box">
        <img className="search__icon" src={searchIcon} alt="Лупа"/>
          <input
            className="search__input"
            type="movie-name"
            name="movie-name"
            placeholder="Фильм"
            required
          />
          <button className="search__button" type="submit"></button>
        </fieldset>
        <fieldset className="search__filter">
        <label className="search__checkbox">
          <input type="checkbox"/>
          <span className="search__checkbox_switch"></span>
        </label>
          <span className="search__filter_text">Короткометражки</span>
        </fieldset>
      </form>
    </section>
  );
}

export default SearchForm;