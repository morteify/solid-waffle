import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import SideMenu from './components/SideMenu/SideMenu';
import Tracks from './views/TracksView/TracksView';
import Queue from './views/QueueView/QueueView';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';

function App(): JSX.Element {
  return (
    <Router>
      <div className="App">
        <SideMenu />
        <MusicPlayer />
        <Switch>
          <Redirect exact from="/" to="/songs" />
          {/* <Route path="/home">
            <div>home</div>
          </Route> */}
          <Route path="/songs" component={Tracks} />
          <Route path="/albums">
            <div>albums</div>
          </Route>
          <Route path="/artists">
            <div>artists</div>
          </Route>
          <Route path="/queue" component={Queue} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
