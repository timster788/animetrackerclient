import React, { Component } from 'react';
import SearchResults from './SearchResults';
import axios from 'axios';
//=====================================================================================================================================
export default class Search extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //=====================================================================================================================================
  handleSubmit(event) {
    event.preventDefault();
    axios
      .get(
        `https://kitsu.io/api/edge/${this.state.seriesType}?filter%5Btext%5D=${
          this.state.title
        }&page%5Blimit%5D=20`
      )
      .then(data => {
        this.setState({
          results: data.data
        });
      })
      .catch(err => console.log(err));
    event.target.reset();
  }
  //=====================================================================================================================================
  handleSearchChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }
  //=====================================================================================================================================
  handleSelectChange(event) {
    this.setState({
      seriesType: event.target.value
    });
  }
  //=====================================================================================================================================
  renderForm() {
    return (
      <form action="/results" onSubmit={this.handleSubmit}>
        <select value={this.state.value} onChange={this.handleSelectChange}>
          <option value="">Choose a series type</option>
          <option value="anime">Anime</option>
          <option value="manga">Manga</option>
        </select>
        <input
          id="text"
          type="text"
          name="title"
          placeholder="Search here"
          onChange={this.handleSearchChange}
          required
        />
        <input id="submit" type="submit" value="Search" />
      </form>
    );
  }
  //=====================================================================================================================================
  render() {
    return (
      <div className="Search">
        {this.state.results ? (
          <div id="reset" onClick={() => window.location.reload()}>
            Search Again
          </div>
        ) : (
          ''
        )}
        {this.state.results ? (
          <SearchResults
            results={this.state.results}
            title={this.state.title}
            seriesType={this.state.seriesType}
            url={`https://kitsu.io/api/edge/${
              this.state.seriesType
            }?filter%5Btext%5D=${this.state.title}&page%5Blimit%5D=20`}
          />
        ) : (
          this.renderForm()
        )}
      </div>
    );
  }
}
//=====================================================================================================================================
