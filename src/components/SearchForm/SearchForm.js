import React from 'react';
import searchIcon from '../../images/search-icon.svg';
import { useFormWithValidation } from '../../utils/useFormWithValidation';

function SearchForm(props) {
  const [error, setError] = React.useState('');
  const { values, isValid, handleChange } = useFormWithValidation({
    search: '',
  })

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      props.onSearchMovies(values.search);
    } else {
      setError("Нужно ввеcти ключевое слово")
    }
  }

  function handleSavedSubmit(e) {
    e.preventDefault();
    if (isValid) {
      props.onSearchSavedMovies(values.search);
    } else {
      setError("Нужно ввеcти ключевое слово")
    }
    
  }

  function handleFilter(e) {
    props.onCheckbox(e.target.checked);
  }
 
  return (
    <section className="search">
      <form className="search__form" onSubmit={props.isSaved ? handleSavedSubmit : handleSubmit} noValidate>
        <fieldset className="search__box">
        <img className="search__icon" src={searchIcon} alt="Лупа"/>
          <input
            className="search__input"
            type="text"
            id="search"
            name="search"
            placeholder="Фильм"
            onChange={handleChange}
            value={values.search || ''}
            autoComplete="off"
            required
          />
          <button
            className="search__button"
            type="submit"
            ></button>
        </fieldset>
        <fieldset className="search__filter">
        <label className="search__checkbox">
          <input
            type="checkbox"
            onChange={handleFilter}/>
          <span className="search__checkbox_switch"></span>
        </label>
          <span className="search__filter_text">Короткометражки</span>
        </fieldset>
      </form>
      <span className="search__error">
        {isValid ? '' : `${error}`}
      </span>
    </section>
  );
}

export default SearchForm;