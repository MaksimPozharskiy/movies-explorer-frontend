import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import testCard from "../../images/test-card.jpg";
import moviesIconCard from "../../images/added-card-icon.svg";
import moviesSavedCardIcon from "../../images/delete-card-icon.svg";
import saveCardIcon from "../../images/save-card-icon.svg"

function MoviesCard() {
  const { pathname } = useLocation();
  const isAdded = true; // Поменять на false для проверки
  // Если фильм добавлен в избранное 
  const moviesIcon = (isAdded ? moviesIconCard : saveCardIcon)
  // Если на странице общего поиска, то берем иконку определенную на строчке выше, если нет, то иконку удаления
  const cardIcon = (pathname === "/movies" ? moviesIcon : moviesSavedCardIcon)

  return (
    <li className="card">
      <div className="card__wrap">
        <img className="card__image" src={testCard} alt="Тестовая карточка" />
        <img className="card__icon" src={cardIcon} alt="Тестовая иконка" />
      </div>
      <div className="card__description">
        <p className="card__name">33 слова о дизайне</p>
        <p className="card__duration">1ч 17м</p>
      </div>
    </li>
  );
}

export default MoviesCard;
