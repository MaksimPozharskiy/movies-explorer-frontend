import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import logo from "../../images/header-logo.svg";

function Register() {
  return (
    <section className="register">
      <div className="register__container">
        <Link to="/"><img className="register__logo" src={logo} alt="Логотип" /></Link>
        <h1 className="register__title">Рады видеть!</h1>
        <Form
          submitText={{
              buttonText: "Зарегистрироваться",
              promt: "Уже зарегистрированы?",
              route: "/signin",
              linkText: "Войти"
            }}
        >
          <label htmlFor="name" className="form__label">Имя</label>
          <input required id="name" className="form__input" minLength="2" type="text" />
          <span className='form__input-error'>Текст ошибки</span>
        </Form>
      </div>
    </section>
  );
}

export default Register;
