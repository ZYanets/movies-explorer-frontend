import React from 'react';
import headerLogo from '../../images/header-logo.svg';
import { Link, useHistory } from 'react-router-dom';

function Register(props) {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const history = useHistory();

  function handleChangeUsername(e) {
    setUsername(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onRegister({
      username, email, password
    })
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
            value={username}
            onChange={handleChangeUsername}
            className="register__input register__input_type_username"
            type="username"
            id="username"
            name="username"
            placeholder="Имя"
            required
          />
          <span id="email-error" className="register__error">Что-то пошло не так...</span>
        </div>
        <div className="register__form_field">
          <label className="register__label">E-mail</label>
          <input
            value={email}
            onChange={handleChangeEmail}
            className="register__input register__input_type_email"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
          />
          <span id="email-error" className="register__error">Что-то пошло не так...</span>
        </div>
        <div className="register__form_field">
          <label className="register__label">Пароль</label>
          <input
            value={password}
            onChange={handleChangePassword}
            className="register__input register__input_type_password"
            type="password"
            id="password"
            name="password"
            placeholder="Пароль"
            minLength="6"
            maxLength="20"
            required/>
          <span id="password-error" className="register__error">Что-то пошло не так...</span>
          </div>
      </form>
      <button className="button register__button" type="submit">Зарегистрироваться</button>
      <p className="register__text">Уже зарегистрированы?
        <Link to="/signin" className="register__link"> Войти</Link>
      </p>
    </div> 
  )
}

export default Register;