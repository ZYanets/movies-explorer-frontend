class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
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

  /* ---------------------- Получение фильмов с сервера ----------------------*/
  getMoviesList() {
    return fetch(`${this._baseUrl}`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._getInfo());
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  },
});
  
export {moviesApi};
  