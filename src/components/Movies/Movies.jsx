import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesApi from "../../utils/MoviesApi";
import { definitionSizeScreen, coefficientScreen } from "../../utils/definitionScreen";

function Movies() {
  const [movies, setMoviesList] = React.useState([]); // Стейт с найденными по ключевому слову фильмами
  const [renderedFilms, setRenderedFilms] = React.useState([]); // Отрисованные карточки
  const [countClickMoreFilms, setCountClickMoreFilms] = React.useState(1); // Счетчик нажатий кнопки "еще"
  const [searchValue, setSearchValue] = React.useState('');
  const [inputError, setInputError] = React.useState('');
  const [visibilityMoviesList, setVisibilityMoviesList] = React.useState('');
  const [isPreloaderOpen,  setIsPreloaderOpen] = React.useState('');

  // Считаем сколько карточек нужно отрисовать при поиске
  function countInitCards() {
    const width = definitionSizeScreen();
    if (width >= 1280) {
      return 12;
    } if (width >= 757) {
      return 8;
    } return 5;
  }

  // Добавляем фильмы по клику на кнопку "Ещё"
  function handleMoreRenderFilms() {
    const cards = countInitCards();
    // Отрисовываем текущие + новые(в зависимости от ширины экрана)
    setRenderedFilms(movies.slice(0, cards + countClickMoreFilms * coefficientScreen()))
    setCountClickMoreFilms(countClickMoreFilms+1)
  }

  // Фильруем фильмы по ключевому слову
  function filterMoviesFromLS(moviesList) {
    setMoviesList(moviesList.filter(movie => movie.nameRU.includes(searchValue)))
  }
  // Получаем фильмов по ключевому слову по клику на Поиск
  function handleSearch(evt) {
    evt.preventDefault();
    if (searchValue === '') {
      setInputError('Нужно ввести ключевое слово')
      return;
    }
    // показываем прелоадер, скрываем фильмы (ранее найденные)
    setIsPreloaderOpen('preloader_active')
    setVisibilityMoviesList('')
    MoviesApi.getMovies()
      .then(moviesList => {
        localStorage.setItem('moviesList', JSON.stringify(moviesList));
      })
        .then(() => {
          filterMoviesFromLS(JSON.parse(localStorage.moviesList))
          setVisibilityMoviesList('movies_visibility')
          setIsPreloaderOpen('')
        })
  }

  return (
    <>
      <SearchForm
        onSubmit={handleSearch}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        inputError={inputError}
        setInputError={setInputError}
      />
      <Preloader isPreloaderOpen={isPreloaderOpen} />
      <MoviesCardList 
        movies={movies}
        visibilityMoviesList={visibilityMoviesList}
        renderedFilms={renderedFilms}
        setRenderedFilms={setRenderedFilms}
        handleMoreRenderFilms={handleMoreRenderFilms}
        countInitCards={countInitCards}
      />
    </>
  );
}

export default Movies;
