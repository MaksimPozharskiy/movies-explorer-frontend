import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";

function App() {
  return (
    <div className="page">
      <Switch>
        <Route path="/" exact>
          <Header bgColor="dark" textColor="white" />
          <Main />
          <Footer />
        </Route>
        <Route path="/movies" exact>
          <Header bgColor="light" textColor="black" />
          <Movies />
          <Footer />
        </Route>
        <Route path="/saved-movies" exact>
          <Header bgColor="light" textColor="black" />
          <Movies />
          <Footer />
        </Route>
        <Route path="/profile" exact>
          <Header bgColor="light" textColor="black" />
          <Profile />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
