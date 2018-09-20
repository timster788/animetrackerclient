import React, { Component } from 'react';
import AnimeHome from './AnimeHome';
import MangaHome from './MangaHome';
//=====================================================================================================================================
export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <AnimeHome />
        <MangaHome />
      </div>
    );
  }
}
//=====================================================================================================================================
