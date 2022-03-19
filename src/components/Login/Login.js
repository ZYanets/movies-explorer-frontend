import React from 'react';
import headerLogo from '../../images/header-logo.svg';
import { Link, useHistory } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const history = useHistory();

   function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onLogin({
      email, password
    })
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
            value={email}
            onChange={handleChangeEmail}
            className="login__input login__input_type_email"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
          />
          <span id="email-error" className="login__error">Что-то пошло не так...</span>
        </div>
        <div className="login__form_field">
          <label className="login__label">Пароль</label>
          <input
            value={password}
            onChange={handleChangePassword}
            className="login__input login__input_type_password"
            type="password"
            id="password"
            name="password"
            placeholder="Пароль"
            minLength="6"
            maxLength="20"
            required/>
          <span id="password-error" className="login__error">Что-то пошло не так...</span>
          </div>
      </form>
      <button className="button login__button" type="submit">Войти</button>
      <p className="login__text">Ещё не зарегистрированы?
        <Link to="/signup" className="login__link"> Регистрация</Link>
      </p>
    </div> 
  )
}

export default Login;