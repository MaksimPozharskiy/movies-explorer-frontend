import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";

function App() {
  return (
    <div className="page">
      <Switch>
        <Route path="/" exact>
          <Header bgColor="dark" textColor="white" />
          <Main />
        </Route>
        <Route path="/movies" exact>
          <Header bgColor="light" textColor="black" />
          <Movies />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
