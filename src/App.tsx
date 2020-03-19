import React, { Fragment } from "react";
import "./App.css";
import SideMenu from "./components/SideMenu/SideMenu";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <SideMenu />
        <Switch>
          <Route exact path="/">
            <div>home</div>
          </Route>
          <Route path="/home">
            <div>home</div>
          </Route>
          <Route path="/songs">
            <div>songs</div>
          </Route>
          <Route path="/albums">
            <div>albums</div>
          </Route>
          <Route path="/artists">
            <div>artists</div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
