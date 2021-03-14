/* eslint-disable no-nested-ternary */
import React from "react";
import "./MoviesCardList.css";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";


function MoviesCardList({ 
    movies, 
    visibilityMoviesList, 
    renderedFilms, setRenderedFilms, 
    handleMoreRenderFilms, 
    countInitCards, 
    addMovie,
    removeMovie,
    savedMovies}) {
  const { pathname } = useLocation();
  const [visibilityBtnYet, setVisibilityBtnYet] = React.useState('')
  const [visibilityNotFound, setVisibilityNotFound] = React.useState('')
  
  React.useEffect(() => {
    // Определяем сколько фильмов нужно отрисовать в зависимости от ширины экрана
    const cards = countInitCards();
    
    setRenderedFilms(movies.slice(0, cards));
    

    if (pathname === "/saved-movies") {
      setVisibilityBtnYet('movies__button_hidden');
      setVisibilityNotFound('movies__button_hidden')
    } else {
      setVisibilityBtnYet('');
      setVisibilityNotFound('')
    }

  }, [movies, setRenderedFilms, pathname])

  // Расчёт длительности фильма
    function parseDurationMovie(durationMinutes) {
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    const durationHours = `${hours}ч ${minutes}м`
    return durationHours;
  }

  return (
    <section className={`movies ${visibilityMoviesList}`}>
      {pathname === "/movies" 
        ? 
        (movies.length > 0 ? '' : <p className={`movies__not-found ${visibilityNotFound}`}>Ничего не найдено</p>)
        :
        (savedMovies.length > 0 ? '' : <p className={`movies__not-found ${visibilityNotFound}`}>Ничего не найдено</p>)}
      {/* {movies.length > 0 ? '' : <p className={`movies__not-found ${visibilityNotFound}`}>Ничего не найдено</p>} */}
      <ul className="movies__list">
        {pathname === "/movies" ? 
        renderedFilms.map((movie) => (
          <MoviesCard
            movie={movie}
            key={movie.id}
            cardName={movie.nameRU}
            cardDuration={parseDurationMovie(movie.duration)}
            imageLink={movie.image ? `https://api.nomoreparties.co${movie.image.url}` : "https://thumbnailer.mixcloud.com/unsafe/900x900/extaudio/c/e/e/5/95df-f97e-4e8b-a1d5-94f3ceb4f5ea"}
            trailerLink={movie.trailerLink}
            addMovie={addMovie}
            removeMovie={removeMovie}
            savedMovies={savedMovies}
          />
          )) 
          :
          savedMovies.map((movie) => (
            <MoviesCard
              movie={movie}
              key={movie._id}
              cardName={movie.nameRU}
              cardDuration={parseDurationMovie(movie.duration)}
              imageLink={movie.image ? movie.image : "https://thumbnailer.mixcloud.com/unsafe/900x900/extaudio/c/e/e/5/95df-f97e-4e8b-a1d5-94f3ceb4f5ea"}
              trailerLink={movie.trailerLink}
              addMovie={addMovie}
              removeMovie={removeMovie}
              savedMovies={savedMovies}
            />
          )) }
      </ul>
      {movies.length > renderedFilms.length || pathname !== "/saved-movies" ? <button className={`movies__button ${visibilityBtnYet}`} type="button" onClick={handleMoreRenderFilms}>Ещё</button> : ''}
    </section>
  );
}

export default MoviesCardList;
