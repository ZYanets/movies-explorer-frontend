import React from 'react';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import {moviesApi} from '../../utils/MoviesApi';
import {mainApi} from '../../utils/MainApi';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import * as auth from '../../utils/auth.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { Redirect } from 'react-router-dom';

function App() {
  const history = useHistory();
  const location = useLocation()

  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [allMovies, setAllMovies] = React.useState([]); //все фильмы
  const [savedMovies, setSavedMovies] = React.useState([]); // сохранённые фильмы
  const [allShortMovies, setAllShortMovies] = React.useState([]); //короткометражки
  const [savedShortMovies, setSavedShortMovies] = React.useState([]); //сохранённые короткометражки
  const [searchAllMovies, setSearchAllMovies] = React.useState([]); //поиск среди всех фильмов по ключевому слову
  const [searchSavedMovies, setSearchSavedMovies] = React.useState([]); //поиск среди сохранённых фильмов по ключевому слову

  const [isShortAll, setIsShortAll] = React.useState(false); //фильтрация короткометражек
  const [isShortSaved, setIsShortSaved] = React.useState(false); //фильтрация короткометражек
  const [isPreloader, setIsPreloader] = React.useState(false);
  const [registerError, setRegisterError] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  const [profileError, setProfileError] = React.useState('');
  const [notFoundError, setNotFoundError] = React.useState(false);
  const [serverError, setServerError] = React.useState(false);

  function clearErrors() {
    setIsPreloader(false)
    setRegisterError('');
    setLoginError('');
    setProfileError('');
    setNotFoundError(false);
    setServerError(false);
  }

  function handleCheckbox() {
    setIsShortAll(!isShortAll);
    localStorage.setItem('isShort', !isShortAll);
  }

  React.useEffect(() => {
    handleToken();
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMoviesList(), moviesApi.getMoviesList()])
      .then(([userData, savedMoviesData, allMoviesData]) => {
        setCurrentUser(userData);
        const userSavedMovies = savedMoviesData.filter((movie) => {
          return movie.owner === userData._id;
        });
        setSavedMovies(userSavedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(userSavedMovies));
        setAllMovies(allMoviesData);
        localStorage.setItem('allMovies', JSON.stringify(allMoviesData));
      })
        .catch((err) => console.log(err))
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (location.pathname === '/movies') {
      const keyword = localStorage.getItem('keyword');
      const searchResult = JSON.parse(localStorage.getItem('searchResult'));
      const isShort = JSON.parse(localStorage.getItem('isShort'));
      if (keyword) {
        setSearchAllMovies(searchResult);
        if (isShort) {
          setIsShortAll(true);
          setAllShortMovies(filterShortMovies(searchResult));
        }
      }
    }
  }, [location])

  React.useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setSearchSavedMovies(savedMovies);
    }
  }, [location])

  React.useEffect(() => {
    setNotFoundError(false);
    if (isShortAll) {
      if (location.pathname === '/movies') {
        if (allMovies.length > 0) {
          const result = filterShortMovies(searchAllMovies);
          if (result.length > 0) {
            setNotFoundError(false);
          } else {
            setNotFoundError(true);
          }
          setAllShortMovies(result);
        }
      }
      setIsShortAll(localStorage.getItem('isShort'));
    }
    if (isShortSaved) {
      if (location.pathname === '/saved-movies') {
        const result = filterShortMovies(searchSavedMovies);
        if (result.length > 0) {
          setNotFoundError(false);
        } else {
          setNotFoundError(true);
        }
        setSavedShortMovies(result);
      }
    
  }}, [isShortAll, isShortSaved])

  

  /* -------------------Блок работы с данными пользователя------------------------ */

  function handleToken() {
    const jwt = localStorage.getItem('jwt');
    const allMovies = localStorage.getItem('allMovies');
    const savedMovies = localStorage.getItem('savedMovies')
    if (jwt) {
      if (allMovies) {
        const res = JSON.parse(allMovies)
        setAllMovies(res);
      }
      if (savedMovies) {
        const result = JSON.parse(savedMovies);
        setSavedMovies(result);
        setSearchSavedMovies(result)
      }
      auth.checkToken(jwt)
        .then((res) => {
          setCurrentUser(res);
          setIsLoggedIn(true);
          history.push(location.pathname)
        })
        .catch(err => console.log(err))
    }
  };
 
  function handleRegister ({ name, email, password }) {
    auth.register(name, email, password)
      .then((response) => {
        setCurrentUser(response.user);
        handleLogin({ email, password });
      })
      .catch((err) => {
        console.log(err)
        if (err === 'Ошибка: 409') {
          setRegisterError('Пользователь с такой электронной почтой уже существует');
        } else {
          setRegisterError('При регистрации пользователя произошла ошибка. Пожалуйста, попробуйте позже');
        }
      })
  };

  function handleLogin ({ email, password }) {
    auth.authorize(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setIsLoggedIn(true)
        history.push('/movies');
      })
      .catch((err) => {
        console.log(err)
        if (err === 'Ошибка: 401') {
          setLoginError('Вы ввели неправильный логин или пароль');
        } else {
          setLoginError(
            'При авторизации пользователя произошла ошибка. Пожалуйста, попробуйте позже'
          )
        }
      })
  };

  function handleEditProfile ({ name, email }) {
    mainApi.setUserInfo(name, email)
      .then((userData) => {
        setCurrentUser(userData);
        setProfileError(`Данные пользователя успешно изменены`);
      })
      .catch((err) => {
        console.log(err)
        if (err === 'Ошибка: 409') {
          setProfileError(`Пользователь с такой электронной почтой уже существует`);
        } else {
          setProfileError(
            'При изменении данных пользователя произошла ошибка. Пожалуйста, попробуйте позже'
          );
        }
      })
  };

  function handleSignout() {
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentUser({});
    setAllMovies([]);
    setSavedMovies([]);
    setAllShortMovies([]);
    setSavedShortMovies([]);
    setSearchAllMovies([]);
    setSearchSavedMovies([]);
    setIsShortAll(false);
    setIsShortSaved(false);
    clearErrors();
    history.push('/');
  };

  /* -------------------Блок работы с фильмами------------------------ */
  
  /* ----- Поиск среди всех фильмов ----- */
  function handleSearchMovie(keyword) {
    setServerError(false);
    setIsPreloader(true);
    const searchResult = searchMovies(allMovies, keyword);
    if (searchResult.length > 0) {
      setNotFoundError(false);
    } else {
      setNotFoundError(true);
    }
    setSearchAllMovies(searchResult);
    localStorage.setItem('searchResult', JSON.stringify(searchResult))
    localStorage.setItem('keyword', keyword)
    if (isShortAll) {
      const shortMovies = filterShortMovies(allMovies);
      const searchResult = searchMovies(shortMovies, keyword);
      if (searchResult.length > 0) {
        setNotFoundError(false);
      } else {
        setNotFoundError(true);
      }
      setAllShortMovies(searchResult);
      
    }
    setTimeout(() => {
      setIsPreloader(false);
    }, 1000)
  }

  /* ----- Поиск среди сохранённых фильмов ----- */

  function handleSearchSavedMovie(keyword) {
    setServerError(false);
    setIsPreloader(true);
    const searchResult = searchMovies(savedMovies, keyword)
    if (searchResult.length > 0) {
      setNotFoundError(false);
    } else {
      setNotFoundError(true);
    }
    setSearchSavedMovies(searchResult);
    if (isShortSaved) {
      const shortMovies = filterShortMovies(savedMovies);
      const searchResult = searchMovies(shortMovies, keyword);
      if (searchResult.length > 0) {
        setNotFoundError(false);
      } else {
        setNotFoundError(true);
      }
      setSavedShortMovies(searchResult);
    }
    setTimeout(() => {
      setIsPreloader(false);
    }, 1000)
  }

    /* ----- Функция поиска по ключевому слову ----- */
  function searchMovies(movies, keyword) {
    let searchResult = [];
    movies.forEach((movie) => {
      if (movie.nameRU.toLowerCase().includes(keyword.toLowerCase())) {
        searchResult.push(movie)
      }
    })
    return searchResult;
  }

  /* ----- Фильтрация короткометражек  ----- */
  function filterShortMovies(movies) {
    let filterResult = [];
    movies.forEach((movie) => {
      if (movie.duration <= 40) {
        filterResult.push(movie);
      }
    })
    return filterResult;
  }

  /* ----- Сохранение фильма ----- */
  function handleSaveMovie (movie) {
    setIsPreloader(true);
    mainApi.saveMovie(movie)
      .then((res) => {
        const movies = [...savedMovies, res];
        localStorage.setItem('savedMovies', JSON.stringify(movies));
        setSavedMovies(list => [...list, res]);
        if (isShortAll) {
          setSavedShortMovies(list => [...list, res]);
          setSearchSavedMovies(list => [...list, res]);
        } else {
          setSearchSavedMovies(list => [...list, res]);
        }
      })
      .catch((err) => {
        console.log(err)
        setServerError(true)})
    setTimeout(() => {
      setIsPreloader(false);
    }, 1000)
  }

  /* ----- Удаление фильма ----- */
  function handleDeleteMovie(id) {
    setIsPreloader(true);
    mainApi.deleteMovie(id)
      .then(() => {
        const deleteResult = filterMovieId(savedMovies, id);
        setSavedMovies(deleteResult);
        localStorage.setItem('savedMovies', JSON.stringify(deleteResult));
        setSearchSavedMovies(filterMovieId(searchSavedMovies, id))
        setSavedShortMovies(filterMovieId(savedShortMovies, id))
      })
      .catch((err) => {
        console.log(err)
        setServerError(true)})
    setTimeout(() => {
      setIsPreloader(false);
    }, 1000)
  }
  
  function filterMovieId (movies, id){
    return movies.filter((movie) => {
      return movie._id !== id
    });
  }

  return (
  <div className="app">
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path='/'>
          <Main
            isLoggedIn={isLoggedIn}
            clearErrors={clearErrors}/>
        </Route>
        <Route path='/signin'>
          {isLoggedIn ? <Redirect to="/movies" /> : ''}
          <Login 
            onLogin={handleLogin}
            loginError={loginError}/>
        </Route>
        <Route path='/signup'>
          {isLoggedIn ? <Redirect to="/movies" /> : ''}
          <Register
            onRegister={handleRegister}
            registerError={registerError}/>
        </Route>
        <ProtectedRoute
          path='/movies'
          component={Movies}
          isLoggedIn={isLoggedIn}
          isPreloader={isPreloader}
          movies={isShortAll ? allShortMovies : searchAllMovies}
          savedMovies={savedMovies}
          onSearchMovies={handleSearchMovie}
          onSaveMovie={handleSaveMovie}
          onSearchSavedMovies={handleSearchSavedMovie}
          onDeleteMovie={handleDeleteMovie}
          onCheckbox={handleCheckbox}
          isShortAll={isShortAll}
          notFoundError={notFoundError}
          serverError={serverError}
          clearErrors={clearErrors}/>
        <ProtectedRoute
          path='/saved-movies'
          component={SavedMovies}
          isLoggedIn={isLoggedIn}
          isPreloader={isPreloader}
          movies={isShortSaved ? savedShortMovies : searchSavedMovies}
          savedMovies={savedMovies}
          onSearchMovies={handleSearchMovie}
          onSaveMovie={handleSaveMovie}
          onSearchSavedMovies={handleSearchSavedMovie}
          onDeleteMovie={handleDeleteMovie}
          onCheckbox={setIsShortSaved}
          isShortSaved={isShortSaved}
          notFoundError={notFoundError}
          serverError={serverError}
          clearErrors={clearErrors}/>
        <ProtectedRoute
          path='/profile'
          component={Profile}
          isLoggedIn={isLoggedIn}
          onEditProfile={handleEditProfile}
          onSignout={handleSignout}
          profileError={profileError}/>
        <Route path='*'>
          <PageNotFound/>
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  </div>
  );
}

export default App;