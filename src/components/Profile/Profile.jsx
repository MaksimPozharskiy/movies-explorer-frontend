import React from "react";
import "./Profile.css";
import CurrentUserContext from "../../context/CurrentUserContext";
import CallbackValidation from "../../helpers/CallbackValidation";
import Header from "../Header/Header";

function Profile({  handleLogout, editProfile, isLogin}) {
  const currentUser = React.useContext(CurrentUserContext);
  const formWithValidation = CallbackValidation();
  const {email, name} = formWithValidation.values;

  // Начальные значения формы
  React.useEffect(()=> {
    formWithValidation.setValues({ 'email': currentUser.email, 'name': currentUser.name });
  },[currentUser]);

  const submitEditProfile = (event) => {
    event.preventDefault();
    editProfile(name, email);
  }

  return (
    <>
      <Header bgColor="light" textColor="black" isLogin={isLogin} />
      <section className="profile">
        <div className="profile__container">
          <h1 className="profile__title">
            Привет, 
            {currentUser && currentUser.name}
            !
          </h1>
          <form noValidate onSubmit={submitEditProfile} className="profile__form" name='edit-form'>
            <label className="profile__label" htmlFor="name">
              Имя
              <input onChange={formWithValidation.handleChange} value={name || ''} required className="profile__input" name="name" />
            </label>
            <label className="profile__label" htmlFor="email">
              Почта
              <input onChange={formWithValidation.handleChange} value={email || ''} required className="profile__input" name="email" />
            </label>
            <button className="profile__btn-edit" type="submit" disabled={currentUser && (name === currentUser.name && email === currentUser.email) || !formWithValidation.isValid}>Редактировать</button>
            <button onClick={handleLogout} className="profile__btn-logout" type="button">Выйти из аккаунта</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Profile;
