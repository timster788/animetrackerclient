import React, { Component } from 'react';
import axios from 'axios';
import Characters from './Characters';
import StreamingLinks from './StreamingLinks';
import Reviews from './Reviews';
import { API_BASE_URL } from '../config';
import { loadAuthToken } from '../local-storage';
//=====================================================================================================================================
export default class SingleAnimeSearchResult extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  //=====================================================================================================================================
  componentDidMount() {
    console.log(this);
    fetch(`https://kitsu.io/api/edge${this.props.match.url}`)
      .then(data => data.json())
      .then(data => {
        this.setState({ singleAnime: data.data }, () => {
          fetch(this.state.singleAnime.relationships.genres.links.related)
            .then(data => data.json())
            .then(data => {
              let divId = 1;
              let genres = data.data.map(genre => {
                return (
                  <div key={genre.id} className="genres" id={`genre${divId++}`}>
                    {genre.attributes.name}
                  </div>
                );
              });
              this.setState({ genres: genres }, () => {
                fetch(
                  this.state.singleAnime.relationships.reviews.links.related
                )
                  .then(data => data.json())
                  .then(data => {
                    this.setState({ reviews: data }, () => {
                      fetch(
                        this.state.singleAnime.relationships.streamingLinks
                          .links.related
                      )
                        .then(data => data.json())
                        .then(data => {
                          this.setState({ streamingLinks: data.data }, () => {
                            fetch(
                              this.state.singleAnime.relationships
                                .animeCharacters.links.self
                            )
                              .then(data => data.json())
                              .then(data => {
                                let charactersId = [];
                                data.data.forEach(element => {
                                  fetch(
                                    `https://kitsu.io/api/edge/anime-characters/${
                                      element.id
                                    }/character`
                                  )
                                    .then(nestedData => nestedData.json())
                                    .then(nestedData => {
                                      charactersId.push(nestedData.data.id);
                                      if (
                                        charactersId.length === data.data.length
                                      ) {
                                        this.setState({
                                          charactersId: charactersId
                                        });
                                      }
                                    });
                                });
                              });
                          });
                        });
                    });
                  });
              });
            });
        });
      });
  }
  //=====================================================================================================================================
  shouldComponentUpdate() {
    if (this.state.charactersId) {
      return false;
    } else {
      return true;
    }
  }
  //=====================================================================================================================================
  renderCoverImage() {
    if (this.state.singleAnime.attributes.coverImage) {
      let bg = {
        backgroundImage: `url(${
          this.state.singleAnime.attributes.coverImage.large
        })`
      };
      return <div id="cover-image" style={bg} />;
    } else {
      let bg = {
        backgroundImage:
          'url(http://res.cloudinary.com/damark726/image/upload/v1523327404/No_image_available_ed3rvn.svg)',
        backgroundColor: '#bbbbbb'
      };
      return <div id="cover-image" style={bg} />;
    }
  }
  //=====================================================================================================================================
  renderPosterImage() {
    if (this.state.singleAnime.attributes.posterImage) {
      let bg = {
        backgroundImage: `url(${
          this.state.singleAnime.attributes.posterImage.original
        })`
      };
      return <div id="poster-image" style={bg} />;
    } else {
      let bg = {
        backgroundImage:
          'url(http://res.cloudinary.com/damark726/image/upload/v1523327404/No_image_available_ed3rvn.svg)',
        backgroundColor: '#bbbbbb'
      };
      return <div id="poster-image" style={bg} />;
    }
  }
  //=====================================================================================================================================
  renderTitles() {
    if (this.state.singleAnime.attributes.titles.en_us) {
      return <span>{this.state.singleAnime.attributes.titles.en_us}</span>;
    } else if (this.state.singleAnime.attributes.titles.en) {
      return <span>{this.state.singleAnime.attributes.titles.en}</span>;
    } else if (this.state.singleAnime.attributes.titles.en_jp) {
      return <span>{this.state.singleAnime.attributes.titles.en_jp}</span>;
    } else if (this.state.singleAnime.attributes.titles.en_kr) {
      return <span>{this.state.singleAnime.attributes.titles.en_kr}</span>;
    } else if (this.state.singleAnime.attributes.titles.en_cn) {
      return <span>{this.state.singleAnime.attributes.titles.en_cn}</span>;
    } else if (this.state.singleAnime.attributes.titles.ja_jp) {
      return <span>{this.state.singleAnime.attributes.titles.ja_jp}</span>;
    } else if (this.state.singleAnime.attributes.titles.ko_kr) {
      return <span>{this.state.singleAnime.attributes.titles.ko_kr}</span>;
    } else if (this.state.singleAnime.attributes.titles.zh_cn) {
      return <span>{this.state.singleAnime.attributes.titles.zh_cn}</span>;
    }
  }
  //=====================================================================================================================================
  renderTitlesForFavorties() {
    if (this.state.singleAnime.attributes.titles.en_us) {
      return this.state.singleAnime.attributes.titles.en_us;
    } else if (this.state.singleAnime.attributes.titles.en) {
      return this.state.singleAnime.attributes.titles.en;
    } else if (this.state.singleAnime.attributes.titles.en_jp) {
      return this.state.singleAnime.attributes.titles.en_jp;
    } else if (this.state.singleAnime.attributes.titles.en_kr) {
      return this.state.singleAnime.attributes.titles.en_kr;
    } else if (this.state.singleAnime.attributes.titles.en_cn) {
      return this.state.singleAnime.attributes.titles.en_cn;
    } else if (this.state.singleAnime.attributes.titles.ja_jp) {
      return this.state.singleAnime.attributes.titles.ja_jp;
    } else if (this.state.singleAnime.attributes.titles.ko_kr) {
      return this.state.singleAnime.attributes.titles.ko_kr;
    } else if (this.state.singleAnime.attributes.titles.zh_cn) {
      return this.state.singleAnime.attributes.titles.zh_cn;
    }
  }
  //=====================================================================================================================================
  handleSubmit(event) {
    event.preventDefault();
    axios({
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + loadAuthToken()
      },
      url: `${API_BASE_URL}/favorites`,
      data: {
        title: this.renderTitlesForFavorties(),
        series_type: this.state.singleAnime.type,
        url: this.state.singleAnime.links.self,
        episodes_watched: this.state.episodes_watched,
        chapters_read: null,
        status: this.state.status,
        rating: this.state.rating
      }
    })
      .then(() => {
        this.setState({
          fireRedirect: true
        });
      })
      .catch(err => console.log(err));
  }
  //=====================================================================================================================================
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }
  //=====================================================================================================================================
  renderInfo() {
    return (
      <div className="info">
        <div className="info-divs">
          Show Type: {this.state.singleAnime.attributes.showType}
        </div>
        <div className="info-divs">
          Status: {this.state.singleAnime.attributes.status}
        </div>
        <div className="info-divs">
          Total Episodes: {this.state.singleAnime.attributes.episodeCount}
        </div>
        <div className="info-divs">
          Episodes Length: {this.state.singleAnime.attributes.episodeLength}{' '}
          mins
        </div>
        <div className="info-divs">
          Average Rating: {this.state.singleAnime.attributes.averageRating}
        </div>
        <div className="info-divs">
          Rating Rank: {this.state.singleAnime.attributes.ratingRank}
        </div>
        <div className="info-divs">
          Popularity Rank: {this.state.singleAnime.attributes.popularityRank}
        </div>
        <div className="info-divs">
          Start Date: {this.state.singleAnime.attributes.startDate}
        </div>
        <div className="info-divs">
          End Date: {this.state.singleAnime.attributes.endDate}
        </div>
      </div>
    );
  }
  //=====================================================================================================================================
  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="number"
          placeholder="Episodes Watched"
          name="episodes_watched"
          min="0"
          max={this.state.singleAnime.attributes.episodeCount}
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          placeholder="Status"
          name="status"
          onChange={this.handleChange}
          required
        />
        <input
          type="number"
          placeholder="Rating (1-10)"
          name="rating"
          min="1"
          max="10"
          onChange={this.handleChange}
          required
        />
        <input className="submit" type="submit" value="Add to Favorites" />
      </form>
    );
  }

  //=====================================================================================================================================
  render() {
    console.log(this.props);
    return (
      <div className="SingleAnime">
        {this.state.singleAnime ? this.renderCoverImage() : ''}
        {this.state.singleAnime ? (
          <div className="title">{this.renderTitles()}</div>
        ) : (
          ''
        )}
        {this.state.singleAnime ? this.renderPosterImage() : ''}
        {this.state.singleAnime ? (
          <div className="synopsis">
            <div id="synopsis-title">Synopsis</div>
            <div>{this.state.singleAnime.attributes.synopsis}</div>
          </div>
        ) : (
          ''
        )}
        {this.state.singleAnime ? this.renderForm() : ''}
        {this.state.singleAnime ? (
          <div className="info-title">Anime Information</div>
        ) : (
          ''
        )}
        {this.state.singleAnime ? this.renderInfo() : ''}
        {this.state.genres ? <div className="genres-title">Genres</div> : ''}
        <div className="genres-div">
          {this.state.genres ? this.state.genres : ''}
        </div>
        {this.state.streamingLinks ? (
          <div className="streaming-links-title">Streaming Links</div>
        ) : (
          ''
        )}
        {this.state.streamingLinks ? (
          <StreamingLinks streamingLinks={this.state.streamingLinks} />
        ) : (
          ''
        )}
        {this.state.charactersId ? (
          <div className="characters-title">
            <span>Characters</span>
          </div>
        ) : (
          ''
        )}
        {this.state.charactersId ? (
          <Characters charactersId={this.state.charactersId} />
        ) : (
          ''
        )}
        {this.state.reviews ? (
          <div className="reviews-title">
            <span>User Reviews</span>
          </div>
        ) : (
          ''
        )}
        {this.state.reviews ? <Reviews reviews={this.state.reviews} /> : ''}
      </div>
    );
  }
}
//=====================================================================================================================================
