import React from 'react';
import headerLogo from '../../images/header-logo.svg';
import profileIcon from '../../images/profile-icon.svg';
import navigationIcon from '../../images/navigation-icon.svg';
import Navigation from '../Navigation/Navigation';
import { Link, useLocation, useHistory } from 'react-router-dom';

function Header() {
  const [isOpened, setIsOpened] = React.useState(false);
  
  const location = useLocation();
  const history = useHistory();

  function handleRedirectMainPage() {
    history.push('/')
  }

  function handleNavigation() {
    setIsOpened(!isOpened);
  }

  const navigationClassName = (
    `navigation ${isOpened ? '' : 'navigation__invisible'}`
  )

  return (
    <div className="header__settings">
      {location.pathname === '/' &&
        (<header className="header">
          <img className="header__logo" src={headerLogo} alt="Лого" onClick={handleRedirectMainPage}/>
          <div className="header__container">
            <Link to="/signup" className="header__link header__link_type_signup">
              Регистрация
            </Link>
            <Link to="/signin" className="header__link header__link_type_signin">
              Войти
            </Link>
          </div>
        </header>)}
        {(location.pathname === '/movies' ||
        location.pathname === '/saved-movies' ||
        location.pathname === '/profile') &&
        (<header className="header header__movies">
          <img className="header__logo" src={headerLogo} alt="Лого" onClick={handleRedirectMainPage}/>
          <div className="header__container header__container_type_movies">
            <Link to="/movies" className="header__link header__link_type_movies">
              Фильмы
            </Link>
            <Link to="/saved-movies" className="header__link header__link_type_movies">
              Сохранённые фильмы
            </Link>
          </div>
          <div className="header__profile">
            <Link to="/profile" className="header__link header__link_type_profile">
              <img className="header__profile_icon" src={profileIcon} alt="А"/>
              <p className="header__profile_text">Аккаунт</p>
            </Link>
          </div>
          <button className="header__navigation" type="button" onClick={handleNavigation}>
            <img className="header__navigation_icon" src={navigationIcon} alt="А"/>
          </button>
          <section className={navigationClassName}>
            <Navigation isOpened={isOpened} onClose={handleNavigation}/>
          </section>
        </header>)}
    </div>);
}

export default Header;