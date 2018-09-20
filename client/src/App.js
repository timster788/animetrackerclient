import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';

import LoginPage from './components/LoginPage';
import RegistrationPage from './components/registration-page';
import Header from './components/Header';
import Home from './components/Home';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import SingleAnime from './components/SingleAnime';
import SingleManga from './components/SingleManga';
import FavoritesList from './components/FavoritesList';
import SingleAnimeFavorites from './components/SingleAnimeFavorites';
import SingleMangaFavorites from './components/SingleMangaFavorites';
import AnimeFavoritesEdit from './components/AnimeFavoritesEdit';
import MangaFavoritesEdit from './components/MangaFavoritesEdit';
//================================================================================================================================
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegistrationPage} />
            <Route path="/results" component={SearchResults} />
            <Route path="/search" component={Search} />
            <Route path="/anime/:id" component={SingleAnime} />
            <Route path="/manga/:id" component={SingleManga} />
            <Route
              path="/favorites/anime/:dbid/:apiid/edit"
              component={AnimeFavoritesEdit}
            />
            <Route
              path="/favorites/manga/:dbid/:apiid/edit"
              component={MangaFavoritesEdit}
            />
            <Route
              path="/favorites/anime/:dbid/:apiid"
              component={SingleAnimeFavorites}
            />
            <Route
              path="/favorites/manga/:dbid/:apiid"
              component={SingleMangaFavorites}
            />
            <Route path="/favorites" component={FavoritesList} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
//================================================================================================================================
