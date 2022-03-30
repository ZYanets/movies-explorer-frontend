import React from 'react';
import headerLogo from '../../images/header-logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import { EMAIL_PATTERN } from '../../utils/constants';

function Login(props) {
  const history = useHistory();
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    email: '',
    password: '',
  }); 
  
  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      props.onLogin(
        { email: values.email, password: values.password }
      )
    }   
  }

  function handleRedirectMainPage() {
    history.push('/')
  }

  return (
    <div className="login">
      <img className="login__logo" src={headerLogo} alt="Лого" onClick={handleRedirectMainPage}/>
      <h2 className="login__header">
        Рады видеть!
      </h2>
      <form onSubmit={handleSubmit} className="login__form">
        <div className="login__form_field">
          <label className="login__label">E-mail</label>
          <input
            value={values.email || ''}
            onChange={handleChange}
            className="login__input login__input_type_email"
            type="email"
            id="email"
            name="email"
            placeholder="Электронная почта"
            pattern={EMAIL_PATTERN}
            required
          />
          {isValid ? '' : <span id="profile__error" className="profile__error">{errors.email}</span>}
        </div>
        <div className="login__form_field">
          <label className="login__label">Пароль</label>
          <input
            value={values.password || ''}
            onChange={handleChange}
            className="login__input login__input_type_password"
            type="password"
            id="password"
            name="password"
            minLength="6"
            maxLength="20"
            placeholder="Пароль"
            required/>
          {isValid ? '' : <span id="profile__error" className="profile__error">{errors.password}</span>}
        </div>
        <p className="profile__edit_status">{props.loginError}</p>
        <button
          className={`button login__button ${!isValid && 'login__button_disabled'}`}
          disabled={!isValid}
          type="submit">Войти</button>
      </form>
      <p className="login__text">Ещё не зарегистрированы?
        <Link to="/signup" className="login__link"> Регистрация</Link>
      </p>
    </div> 
  )
}

export default Login;