import React from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import { EMAIL_PATTERN } from '../../utils/constants';

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const nameRef = React.useRef('');
  const emailRef = React.useRef('');
  const { handleChange, errors, isValid } = useFormWithValidation(
    {
      name: nameRef.current.value,
      email: emailRef.current.value,
    }
  );
  
  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      props.onEditProfile({ name, email });
      e.target.reset();
    }
  }

  React.useEffect(() => {
    if (nameRef.current.value === currentUser.name && emailRef.current.value === currentUser.email) {
      setIsUpdate(false);
    } else {
      setIsUpdate(true);
    }
  }, [nameRef.current.value, emailRef.current.value, currentUser.name, currentUser.email]);

  return (
    <div className="profile">
      <Header isLoggedIn={props.isLoggedIn}/>
      <h1 className="profile__header">{`Привет, ${currentUser.name}!`}</h1>
      <form onSubmit={handleSubmit} className="profile__form">
        <div className="profile__form_field">
          <label className="profile__label">Имя</label>
          <input
            values={nameRef.current.value}
            onChange={handleChange}
            className="profile__input profile__input_type_username"
            ref={nameRef}
            defaultValue={currentUser.name}
            type="name"
            id="name"
            name="name"
            minLength="2"
            maxLength="40"
            placeholder="Имя"
            required/>
        </div>
        {isValid ? '' : <span id="profile__error" className="profile__error">{errors.name}</span>}
        <div className="profile__form_field">
          <label className="profile__label">E-mail</label>
          <input
            values={emailRef.current.value}
            onChange={handleChange}
            className="profile__input profile__input_type_email"
            ref={emailRef}
            defaultValue={currentUser.email}
            type="email"
            id="email"
            name="email"
            placeholder="Электронная почта"
            pattern={EMAIL_PATTERN}
            required/>
        </div>
        {isValid ? '' : <span id="profile__error" className="profile__error">{errors.email}</span>}
        <p className="profile__edit_status">{props.profileError}</p>
        <button
          className={`button profile__edit-button ${(!isUpdate || !isValid) && 'profile__edit-button_disabled'}`}
          disabled={!isUpdate || !isValid}
          type="submit">Редактировать</button>
      </form>
      <Link to="/" className="profile__signout" onClick={props.onSignout}>Выйти из аккаунта</Link>
    </div>
  );
}

export default Profile;