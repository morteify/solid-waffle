import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import SideMenu from './components/SideMenu/SideMenu';
import Tracks from './views/TracksView/TracksView';
import Albums from './views/AlbumsView/AlbumsView';
import Queue from './views/QueueView/QueueView';
import Artists from './views/ArtistsView/ArtistsView';
import IntialView from './views/InitialView/InitialView';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';

function App(): JSX.Element {
  return (
    <Router>
      <div className="App">
        <SideMenu />
        <MusicPlayer />
        <Switch>
          <Redirect exact from="/" to="/start" />
          <Route exact path="/start" component={IntialView} />
          <Route exact path="/songs" component={Tracks} />
          <Route exact path="/albums" component={Albums} />
          <Route exact path="/artists" component={Artists} />
          <Route exact path="/queue" component={Queue} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
