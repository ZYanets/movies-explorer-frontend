import React from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
//import {CurrentUserContext} from '../../contexts/CurrentUserContext';

function Profile(props) {
  /*const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setUsername(currentUser.username);
    setEmail(currentUser.email);
  }, [currentUser, props.isOpen]); */

  const username = 'Яна';
  const email = 'zyanets@yandex.ru';

  function handleChangeUsername(e) {
    //setUsername(e.target.value);
  }

  function handleChangeEmail(e) {
    //setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateUser({
      username: username,
      email: email,
    })
  }

  return (
    <div className="profile">
      <Header/>
      <h1 className="profile__header">Привет, Яна!</h1>
      <form onSubmit={handleSubmit} className="profile__form">
          <div className="profile__form_field">
            <label className="profile__label">Имя</label>
            <input
              value={username}
              onChange={handleChangeUsername}
              className="profile__input profile__input_type_username"
              type="text"
              minLength="2"
              maxLength="40"
              required/>
          </div>
          <div className="profile__form_field">
            <label className="profile__label">E-mail</label>
            <input
              value={email}
              onChange={handleChangeEmail}
              className="profile__input profile__input_type_email"
              type="email"
              required/>
          </div>   
      </form>
      <button className="profile__edit-button" type="submit">Редактировать</button>
      <Link to="/signin" className="profile__signout">Выйти из аккаунта</Link>  
    </div>
  );
}

export default Profile;