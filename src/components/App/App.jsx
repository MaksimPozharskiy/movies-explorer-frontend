import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import "./App.css";
import Main from "../Main/Main";

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
        </Route>
      </Switch>
    </div>
  );
}

export default App;
