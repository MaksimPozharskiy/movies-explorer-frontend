import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";
import logo from "../../images/header-logo.svg";

function Header({ bgColor, textColor }) {
  const { pathname } = useLocation();
  const text = `${pathname === "/" ? "Регистрация" : "Аккаунт"}`;

  return (
    <header className={`header header_bg-color_${bgColor}`}>
      <div className="header__container">
        <div className="header__wrapper">
          <Link to="/"><img className="header__logo" src={logo} alt="Логотип" /></Link>
          {pathname === "/" ? ( "" ) : <Navigation />}
        </div>
        <div className="header__wrapper">
          <Link
            className={`header__sign-text header__sign-text_color_${textColor}`}
            to={`${pathname === "/" ? "/signup" : "/profile"}`}
          >
            {text}
          </Link>
          {pathname === "/" ? (
            <Link to="/signin" className="header__btn-signin" type="button">
              Войти
            </Link>
          ) : (
            <button className="header__btn-account" type="button" />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
