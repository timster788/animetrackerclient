import React, { Component } from 'react';
import axios from 'axios';
import FavoritesListItem from './FavoritesListItem';
import { API_BASE_URL } from '../config';
import { loadAuthToken } from '../local-storage';
//=====================================================================================================================================
export default class FavoritesList extends Component {
  constructor() {
    super();
    this.state = {
      dbData: null
    };
    this.renderFavoritesList = this.renderFavoritesList.bind(this);
  }
  //=====================================================================================================================================
  componentDidMount() {
    axios({
      method: 'GET',
      url: `${API_BASE_URL}/favorites`,
      headers: {
        Authorization: 'Bearer ' + loadAuthToken()
      }
    })
      .then(res => {
        this.setState({
          dbData: res.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  //=====================================================================================================================================
  renderFavoritesList() {
    if (this.state.dbData) {
      return this.state.dbData.map(results => {
        console.log('results', results);

        return <FavoritesListItem key={results.id} data={results} />;
      });
    } else {
      return <div>Your list is empty</div>;
    }
  }
  //=====================================================================================================================================
  render() {
    return (
      <div className="FavoritesList">
        <div id="favorite-header">My Favorites</div>
        {this.renderFavoritesList()}
      </div>
    );
  }
}
//=====================================================================================================================================
