import React from 'react';
import headerLogo from '../../images/header-logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import { EMAIL_PATTERN } from '../../utils/constants';

function Register(props) {
  const history = useHistory();
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    name: '',
    email: '',
    password: '',
  });
  
  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      props.onRegister(
        { name: values.name, email: values.email, password: values.password }
      )
    }
  }

  function handleRedirectMainPage() {
    history.push('/')
  }

  return (
    <div className="register">
      <img className="register__logo" src={headerLogo} alt="Лого" onClick={handleRedirectMainPage}/>
      <h2 className="register__header">
        Добро пожаловать!
      </h2>
      <form onSubmit={handleSubmit} className="register__form">
        <div className="register__form_field">
          <label className="register__label">Имя</label>
          <input
            value={values.name || ''}
            onChange={handleChange}
            className="register__input register__input_type_username"
            type="name"
            id="name"
            name="name"
            minLength="2"
            maxLength="40"
            placeholder="Имя"
            required
          />
          <span id="register__error" className="register__error">{errors.name}</span>
        </div>
        <div className="register__form_field">
          <label className="register__label">E-mail</label>
          <input
            value={values.email || ''}
            onChange={handleChange}
            className="register__input register__input_type_email"
            type="email"
            id="email"
            name="email"
            placeholder="Электронная почта"
            pattern={EMAIL_PATTERN}
            required
          />
          <span id="register__error" className="register__error">{errors.email}</span>
        </div>
        <div className="register__form_field">
          <label className="register__label">Пароль</label>
          <input
            value={values.password || ''}
            onChange={handleChange}
            className="register__input register__input_type_password"
            type="password"
            id="password"
            name="password"
            minLength="6"
            maxLength="20"
            placeholder="Пароль"
            required/>
          <span id="register__error" className="register__error">{errors.password}</span>
        </div>
        <p className="profile__edit_status">{props.registerError}</p>
        <button
          className={`button register__button ${!isValid && 'register__button_disabled'}`}
          disabled={!isValid}
          type="submit">Зарегистрироваться</button>
      </form>
      <p className="register__text">Уже зарегистрированы?
        <Link to="/signin" className="register__link"> Войти</Link>
      </p>
    </div> 
  )
}

export default Register;