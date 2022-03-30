import { MAIN_API } from './constants'

class MainApi {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
  
    getAppInfo() {
      return Promise.all([this.getUserInfo(), this.getCardList()])
    }
  
    /* ---------------------- Загрузка необходимой информации с сервера ----------------------*/
    _getInfo() {
      return (res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }
  
    _getAuthorization() {
      const jwt = localStorage.getItem('jwt');
      return {
        'Authorization': `Bearer ${jwt}`,
        ...this._headers
      }
    }
  
    /* ---------------------- Получение карточек с сервера ----------------------*/
    getSavedMoviesList() {
      return fetch(`${this._baseUrl}/movies`, {
        method: 'GET',
        headers: this._getAuthorization(),
      })
        .then(this._getInfo());
    }
  
    /* ---------------------- Получение данных пользователя на сервер ----------------------*/
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: this._getAuthorization(),
      })
        .then(this._getInfo());
    }
  
    /* ---------------------- Отправка данных пользователя на сервер ----------------------*/
    setUserInfo(name, email) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._getAuthorization(),
        body: JSON.stringify({
          name: name,
          email: email
        })
      })
        .then(this._getInfo());
    }
  
    /* ---------------------- Добавление карточки на сервер ----------------------*/
    saveMovie(movieData) {
      return fetch(`${this._baseUrl}/movies`, {
        method: 'POST',
        headers: this._getAuthorization(),
        body: JSON.stringify({
          country: movieData.country,
          director: movieData.director,
          duration: movieData.duration,
          year: movieData.year,
          description: movieData.description,
          image: movieData.image,
          trailerLink: movieData.trailerLink,
          thumbnail: movieData.thumbnail,
          movieId: movieData.movieId,
          nameRU: movieData.nameRU,
          nameEN: movieData.nameEN,
        })
      })
        .then(this._getInfo());
    }
  
    /* ---------------------- Удаление карточки из сервера ----------------------*/
    deleteMovie(movie) {
      return fetch(`${this._baseUrl}/movies/${movie}`, {
        method: 'DELETE',
        headers: this._getAuthorization(),
      })
        .then(this._getInfo());
    }
  }
  
  const mainApi = new MainApi({
    baseUrl: MAIN_API,
    headers: {
      'Content-Type': 'application/json'
    },
  });
  
  export {mainApi};
  