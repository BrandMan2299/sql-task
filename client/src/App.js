import React from 'react';
import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Playlist from './components/Playlist';
import Home from './components/Home';
import Album from './components/Album';
import Artist from './components/Artist';
import Song from './components/Song';
import Error from './components/Error';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/artist/:id" component={Artist} />
          <Route path="/album/:id" component={Album} />
          <Route path="/song/:id" component={Song} />
          <Route path="/playlist/:id" component={Playlist} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;