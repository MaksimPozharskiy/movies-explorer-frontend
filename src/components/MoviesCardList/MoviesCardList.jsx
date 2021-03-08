import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";


function MoviesCardList({ movies, visibilityMoviesList, renderedFilms, setRenderedFilms, handleMoreRenderFilms, countInitCards }) {
  React.useEffect(() => {
    // Определяем сколько фильмов нужно отрисовать в зависимости от ширины экрана
    const cards = countInitCards();
    setRenderedFilms(movies.slice(0, cards));
  }, [movies, setRenderedFilms])

  // Расчёт длительности фильма
    function parseDurationMovie(durationMinutes) {
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    const durationHours = `${hours}ч ${minutes}м`
    return durationHours;
  }

  return (
    <section className={`movies ${visibilityMoviesList}`}>
      {movies.length > 0 ? '' : <p className="movies__not-found">Ничего не найдено</p>}
      <ul className="movies__list">
        
        { 
          renderedFilms.map((movie) => (
            <MoviesCard
              key={movie.id}
              cardName={movie.nameRU}
              cardDuration={parseDurationMovie(movie.duration)}
              imageLink={movie.image ? `https://api.nomoreparties.co${movie.image.url}` : "https://thumbnailer.mixcloud.com/unsafe/900x900/extaudio/c/e/e/5/95df-f97e-4e8b-a1d5-94f3ceb4f5ea"}
            />
          )) 
        }
      </ul>
      {movies.length > renderedFilms.length ? <button className="movies__button" type="button" onClick={handleMoreRenderFilms}>Ещё</button> : ''}
    </section>
  );
}

export default MoviesCardList;
