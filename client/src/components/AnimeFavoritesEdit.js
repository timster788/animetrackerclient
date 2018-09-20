import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { loadAuthToken } from '../local-storage';
//=====================================================================================================================================
export default class AnimeFavoritesEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes_watched: '',
      status: '',
      rating: '',
      fireRedirect: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.deleteAnime = this.deleteAnime.bind(this);
  }
  //=====================================================================================================================================
  componentDidMount() {
    axios({
      method: 'GET',
      url: `${API_BASE_URL}/favorites/${this.props.match.params.dbid}`,
      headers: {
        Authorization: 'Bearer ' + loadAuthToken()
      }
    })
      .then(data => {
        const favoriteAnime = data.data.data;
        this.setState({
          episodes_watched: favoriteAnime.episodes_watched,
          status: favoriteAnime.status,
          rating: favoriteAnime.rating
        });
      })
      .catch(err => console.log(err));
  }
  //=====================================================================================================================================
  deleteAnime() {
    axios({
      method: 'DELETE',
      url: `${API_BASE_URL}/${this.props.match.params.dbid}`,
      headers: {
        Authorization: 'Bearer ' + loadAuthToken()
      }
    })
      .then(res => {
        this.setState({
          fireRedirect: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  //=====================================================================================================================================
  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }
  //=====================================================================================================================================
  handleFormSubmit(event) {
    event.preventDefault();
    axios({
      method: 'PUT',
      url: `${API_BASE_URL}/favorites/${this.props.match.params.dbid}`,
      headers: {
        Authorization: 'Bearer ' + loadAuthToken()
      },
      data: {
        episodes_watched: this.state.episodes_watched,
        status: this.state.status,
        rating: this.state.rating
      }
    })
      .then(data => {
        this.setState({
          fireRedirect: true
        });
      })
      .catch(err => console.log(err));
    event.target.reset();
  }
  //=====================================================================================================================================
  render() {
    return (
      <div className="AnimeFavoriteEdit">
        <div id="edit">Edit Entry</div>
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            placeholder="Status"
            name="status"
            value={this.state.status}
            onChange={this.handleInputChange}
          />
          <br />
          <input
            type="number"
            placeholder="Episodes Watched"
            name="episodes_watched"
            value={this.state.episodes_watched || ''}
            onChange={this.handleInputChange}
          />
          <br />
          <input
            type="number"
            placeholder="Rating"
            name="rating"
            value={this.state.rating}
            onChange={this.handleInputChange}
          />
          <br />
          <input type="submit" value="Submit" />
          <br />
          <input
            type="submit"
            className="delete"
            onClick={this.deleteAnime}
            value="Delete"
          />
        </form>

        {this.state.fireRedirect ? <Redirect push to="/favorites" /> : ''}
      </div>
    );
  }
}
//=====================================================================================================================================
