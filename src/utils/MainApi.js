class MainApi {
  constructor({baseUrl, headers}){
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getSavedMovies(){
    return fetch(`${this._baseUrl}/movies`, {headers: this._headers})
    .then(response => this._checkRequestResult(response));
  }

  addMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailer: movie.trailerLink,
        movieId: movie.id.toString(),
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `https://api.nomoreparties.co${movie.image.url}`
      }) 
    })
    .then(response => this._checkRequestResult(response));
  }

  removeMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(response => this._checkRequestResult(response));
  }

  _checkRequestResult(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Возникла ошибка: ${response.status}`)); 
  }

  errorHandler(error) {
    console.log(error);
  }
}

const mainApi = new MainApi({
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDJkN2E5M2I3MmVlMzA4Yzg4MTZjM2EiLCJpYXQiOjE2MTU0MDA0MDcsImV4cCI6MTYxNjAwNTIwN30.43SBNKUWrRwz0Z6TrIukvqGli4hhMXVgx6g0WXRj_Tc"
    // 'Authorization': `${localStorage.getItem('jwt')}`,
  }
}); 

export default mainApi;