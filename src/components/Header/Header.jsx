import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../images/header-logo.svg";

function Header({ bgColor, textColor }) {
  const { pathname } = useLocation();
  const text = `${pathname === "/" ? "Регистрация" : "Аккаунт"}`;

  return (
    <header className={`header header_bg-color_${bgColor}`}>
      <div className="header__container">
        <div className="header__wrapper">
          <img className="header__logo" src={logo} alt="Логотип" />
          {pathname === "/" ? (
            ""
          ) : (
            <>
              <Link className="header__movies" to="/movies">
                Фильмы
              </Link>
              <Link className="header__saved-movies" to="/saved-movies">
                Сохранённые фильмы
              </Link>
            </>
          )}
        </div>
        <div className="header__wrapper">
          <Link
            className={`header__sign-text header__sign-text_color_${textColor}`}
            to={`${pathname === "/" ? "/movies" : "/profile"}`}
          >
            {text}
          </Link>
          {pathname === "/" ? (
            <button className="header__btn-signin" type="button">
              Войти
            </button>
          ) : (
            <button className="header__btn-account" type="button" />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
