import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import "./App.css";

function App() {
  return (
    <div className="page">
      <Switch>
        <Route path="/" exact>
          <Header bgColor="dark" textColor="white" />
        </Route>
        <Route path="/movies" exact>
          <Header bgColor="light"  />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
