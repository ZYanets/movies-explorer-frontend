import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../../images/profile-icon.svg';

function Navigation(props) {
  const location = useLocation();
  const navigationClassName = (
    `navigation ${props.isOpened ? '' : 'navigation__invisible'}`
  )

  React.useEffect(() => {
    if (!props.isOpened) return;

    function handleEsc(e) {
      if (e.key === 'Escape') {
        props.onClose()
      }
    };

    document.addEventListener("keydown", handleEsc)

    return () => {
      document.removeEventListener("keydown", handleEsc);
    }
  });

  return (
    <section className={navigationClassName}>
      <button className="navigation__button-close" type="button" onClick={props.onClose}></button>
      <div className="navigation__links">
        <Link to="/" className={`navigation__link ${location.pathname === "/" ? 'navigation__link_active' : ''}`}>Главная</Link>
        <Link to="/movies" className={`navigation__link ${location.pathname === "/movies" ? 'navigation__link_active' : ''}`}>Фильмы</Link>
        <Link to="/saved-movies" className={`navigation__link ${location.pathname === "/saved-movies" ? 'navigation__link_active' : ''}`}>Сохранённые фильмы</Link>     
      </div>
      <Link to="/profile" className="navigation__link navigation__link_type_profile">
          <img className="navigation__profile_icon" src={profileIcon} alt="А"/>
          <p className="navigation__profile_text">Аккаунт</p>
        </Link>
    </section>
  );
}

export default Navigation;