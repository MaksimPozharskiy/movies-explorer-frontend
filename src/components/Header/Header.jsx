import React from "react";
import { useLocation } from 'react-router-dom';
import "./Header.css";
import logo from "../../images/header-logo.svg";

function Header({ bgColor, textColor }) {
  const { pathname } = useLocation();
  const text = `${pathname === '/movies' ? 'Аккаунт' : 'Регистрация'}`;

  return (
    <div className={`header header_bg-color_${bgColor}`}>
      <div
        className="header__container"
      >
        <img className="header__logo" src={logo} alt="Логотип" />
        <div className="header__wrapper">
          
          <p className={`header__sign-text header__sign-text_color_${textColor}`}>{text}</p>
          {pathname === '/movies' ? 
            <button className="header__btn-account" type="button" /> : <button className="header__btn-signin" type="button">Войти</button>}
        </div>
      </div>
    </div>
  );
}

export default Header;
