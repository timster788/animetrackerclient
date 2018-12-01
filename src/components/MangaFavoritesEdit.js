import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { loadAuthToken } from '../local-storage';
//=====================================================================================================================================
export default class MangaFavoritesEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chapters_read: '',
      status: '',
      rating: '',
      fireRedirect: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.deleteManga = this.deleteManga.bind(this);
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
        const favoriteManga = data.data.data;
        this.setState({
          chapters_read: favoriteManga.chapters_read,
          status: favoriteManga.status,
          rating: favoriteManga.rating
        });
      })
      .catch(err => console.log(err));
  }
  //=====================================================================================================================================
  deleteManga() {
    axios({
      method: 'DELETE',
      url: `${API_BASE_URL}/favorites/${this.props.match.params.dbid}`,
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
        chapters_read: this.state.chapters_read,
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
      <div className="MangaFavoriteEdit">
        <div id="edit">Edit Entry</div>
        <form onSubmit={this.handleFormSubmit}>
          <input
            id="status"
            type="text"
            placeholder="Status"
            name="status"
            value={this.state.status}
            onChange={this.handleInputChange}
          />
          <br />
          <input
            id="tracker"
            type="number"
            placeholder="Chapters Read"
            name="chapters_read"
            value={this.state.chapters_read || ''}
            onChange={this.handleInputChange}
          />
          <br />
          <input
            id="rating"
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
            onClick={this.deleteManga}
            value="Delete"
          />
        </form>

        {this.state.fireRedirect ? <Redirect push to="/favorites" /> : ''}
      </div>
    );
  }
}
//=====================================================================================================================================
