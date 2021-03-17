export function shortMoviesSearchHandle(movies) {
  return movies.reduce((result, movieInfo) => {
    if(movieInfo.duration <= 40) {
      result.push(movieInfo);
    }
    return result;
  },[])
}

export function moviesSearchHandle(movies, searchValue){
  return movies.filter((movie) => movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()));
}
