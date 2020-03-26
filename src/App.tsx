import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import SideMenu from './components/SideMenu/SideMenu';
import Tracks from './views/TracksView/TracksView';

function App() {
  return (
    <Router>
      <div className="App">
        <SideMenu />
        <Switch>
          <Redirect exact from="/" to="/home" />

          <Route path="/home">
            <div>home</div>
          </Route>
          <Route path="/songs" component={Tracks} />
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
