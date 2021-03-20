/* eslint-disable no-unused-vars */
import React from "react";
import "./Movies.css";
import { useLocation } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesApi from "../../utils/MoviesApi";
import MainApi from "../../utils/MainApi";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { definitionSizeScreen, coefficientScreen } from "../../utils/definitionScreen";

function Movies({isLogin}) {
  const { pathname } = useLocation();
  const [movies, setMoviesList] = React.useState([]); // Стейт с найденными по ключевому слову фильмами
  const [renderedFilms, setRenderedFilms] = React.useState([]); // Отрисованные карточки
  const [countClickMoreFilms, setCountClickMoreFilms] = React.useState(1); // Счетчик нажатий кнопки "еще"
  const [searchValue, setSearchValue] = React.useState('');
  const [inputError, setInputError] = React.useState('');
  const [visibilityMoviesList, setVisibilityMoviesList] = React.useState('');
  const [isPreloaderOpen,  setIsPreloaderOpen] = React.useState('');
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [visibilityBtnYet, setVisibilityBtnYet] = React.useState('movies__button_hidden')
  

  React.useEffect(() => {

    MainApi.getSavedMovies()
      .then(savedMoviesData => {
        if(savedMoviesData) {
          setSavedMovies(savedMoviesData)
        }
      }).catch(err => {
        console.log(err)
      })

      if (pathname === "/saved-movies") {
        setVisibilityMoviesList('movies_visibility');
      }
      
    }, []);

  React.useEffect(() => {
    if (movies.length === renderedFilms.length) {
      setVisibilityBtnYet('movies__button_hidden');
    }
  }, [movies, renderedFilms])

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
    const films = moviesList.filter(movie => movie.nameRU.includes(searchValue))

    setMoviesList(()=>{
      localStorage.setItem('foundFilms', JSON.stringify(films));
      return films;
    });
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
    if (pathname === "/movies") {
      // Если в localStorage нет фильмов, запросить их
      if (!localStorage.getItem('moviesList')) {
        MoviesApi.getMovies()
          .then(moviesList => {
            localStorage.setItem('moviesList', JSON.stringify(moviesList));
          }).catch(err => console.log(err));
      }
      
      filterMoviesFromLS(JSON.parse(localStorage.moviesList))
      setVisibilityMoviesList('movies_visibility')
      setVisibilityBtnYet('');
      setIsPreloaderOpen('')
      
    } else {
      setSavedMovies(savedMovies.filter(movie => movie.nameRU.includes(searchValue)))
      setVisibilityMoviesList('movies_visibility')
      setIsPreloaderOpen('')
    }

  }

  function addMovie(movie) {

    MainApi.addMovie(movie)
      .then((dataMovie) => {
        setSavedMovies([dataMovie.data, ...savedMovies]);
      }).catch(err => {
        console.log(err)
      })
  }

  function removeMovie(movieId) {

    MainApi.removeMovie(movieId)
      .then(() => {
        const newMovies = savedMovies.filter(movie => movie._id !== movieId);
        setSavedMovies(newMovies);
      }).catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <Header bgColor="light" textColor="black" isLogin={isLogin} />
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
        addMovie={addMovie}
        removeMovie={removeMovie}
        savedMovies={savedMovies}
        setVisibilityMoviesList={setVisibilityMoviesList}
        visibilityBtnYet={visibilityBtnYet}
        setVisibilityBtnYet={setVisibilityBtnYet}
      />
      <Footer />
    </>
  );
}

export default Movies;
