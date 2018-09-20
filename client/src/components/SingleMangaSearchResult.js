import React, { Component } from 'react';
import axios from 'axios';
import Characters from './Characters';
// import StreamingLinks from "./StreamingLinks";
import Reviews from './Reviews';
import { API_BASE_URL } from '../config';
import { loadAuthToken } from '../local-storage';
//=====================================================================================================================================
export default class SingleManga extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  //=====================================================================================================================================
  componentDidMount() {
    fetch(
      `https://kitsu.io/api/edge/${this.props.manga.data.type}/${
        this.props.manga.data.id
      }`
    )
      .then(data => data.json())
      .then(data => {
        this.setState({ singleManga: data.data }, () => {
          fetch(this.state.singleManga.relationships.genres.links.related)
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
                  this.state.singleManga.relationships.reviews.links.related
                )
                  .then(data => data.json())
                  .then(data => {
                    this.setState({ reviews: data }, () => {
                      // fetch(this.state.singleManga.relationships.mediaRelationships.links.related)
                      // .then(data => data.json())
                      // .then(data => {
                      // this.setState({testing: data.data}, () => {
                      fetch(
                        this.state.singleManga.relationships.mangaCharacters
                          .links.self
                      )
                        .then(data => data.json())
                        .then(data => {
                          let charactersId = [];
                          data.data.forEach(element => {
                            fetch(
                              `https://kitsu.io/api/edge/manga-characters/${
                                element.id
                              }/character`
                            )
                              .then(nestedData => nestedData.json())
                              .then(nestedData => {
                                charactersId.push(nestedData.data.id);
                                if (charactersId.length === data.data.length) {
                                  this.setState({ charactersId: charactersId });
                                }
                              });
                          });
                        });
                      // })
                      // })
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
    if (this.state.singleManga.attributes.coverImage) {
      let bg = {
        backgroundImage: `url(${
          this.state.singleManga.attributes.coverImage.original
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
    if (this.state.singleManga.attributes.posterImage) {
      let bg = {
        backgroundImage: `url(${
          this.state.singleManga.attributes.posterImage.original
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
    if (this.state.singleManga.attributes.titles.en_us) {
      return <span>{this.state.singleManga.attributes.titles.en_us}</span>;
    } else if (this.state.singleManga.attributes.titles.en) {
      return <span>{this.state.singleManga.attributes.titles.en}</span>;
    } else if (this.state.singleManga.attributes.titles.en_jp) {
      return <span>{this.state.singleManga.attributes.titles.en_jp}</span>;
    } else if (this.state.singleManga.attributes.titles.en_kr) {
      return <span>{this.state.singleManga.attributes.titles.en_kr}</span>;
    } else if (this.state.singleManga.attributes.titles.en_cn) {
      return <span>{this.state.singleManga.attributes.titles.en_cn}</span>;
    } else if (this.state.singleManga.attributes.titles.ja_jp) {
      return <span>{this.state.singleManga.attributes.titles.ja_jp}</span>;
    } else if (this.state.singleManga.attributes.titles.ko_kr) {
      return <span>{this.state.singleManga.attributes.titles.ko_kr}</span>;
    } else if (this.state.singleManga.attributes.titles.zh_cn) {
      return <span>{this.state.singleManga.attributes.titles.zh_cn}</span>;
    }
  }

  renderTitlesForFavorties() {
    if (this.state.singleManga.attributes.titles.en_us) {
      return this.state.singleManga.attributes.titles.en_us;
    } else if (this.state.singleManga.attributes.titles.en) {
      return this.state.singleManga.attributes.titles.en;
    } else if (this.state.singleManga.attributes.titles.en_jp) {
      return this.state.singleManga.attributes.titles.en_jp;
    } else if (this.state.singleManga.attributes.titles.en_kr) {
      return this.state.singleManga.attributes.titles.en_kr;
    } else if (this.state.singleManga.attributes.titles.en_cn) {
      return this.state.singleManga.attributes.titles.en_cn;
    } else if (this.state.singleManga.attributes.titles.ja_jp) {
      return this.state.singleManga.attributes.titles.ja_jp;
    } else if (this.state.singleManga.attributes.titles.ko_kr) {
      return this.state.singleManga.attributes.titles.ko_kr;
    } else if (this.state.singleManga.attributes.titles.zh_cn) {
      return this.state.singleManga.attributes.titles.zh_cn;
    }
  }
  //=====================================================================================================================================
  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="number"
          placeholder="Chapters Read"
          name="chapters_read"
          min="0"
          max={this.state.singleManga.attributes.chapterCount}
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
  renderInfo() {
    return (
      <div className="info">
        <div className="info-divs">
          Series Type: {this.state.singleManga.attributes.subtype}
        </div>
        <div className="info-divs">
          Status: {this.state.singleManga.attributes.status}
        </div>
        <div className="info-divs">
          Total Chapters:{' '}
          {this.state.singleManga.attributes.chapterCount
            ? this.state.singleManga.attributes.chapterCount
            : 'Ongoing'}
        </div>
        <div className="info-divs">
          Total Volumes:{' '}
          {this.state.singleManga.attributes.volumeCount
            ? this.state.singleManga.attributes.volumeCount
            : 'Ongoing'}
        </div>
        <div className="info-divs">
          Average Rating: {this.state.singleManga.attributes.averageRating}
        </div>
        <div className="info-divs">
          Rating Rank: {this.state.singleManga.attributes.ratingRank}
        </div>
        <div className="info-divs">
          Popularity Rank: {this.state.singleManga.attributes.popularityRank}
        </div>
        <div className="info-divs">
          Start Date: {this.state.singleManga.attributes.startDate}
        </div>
        <div className="info-divs">
          End Date:{' '}
          {this.state.singleManga.attributes.endDate
            ? this.state.singleManga.attributes.endDate
            : 'Ongoing'}
        </div>
      </div>
    );
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
        series_type: this.state.singleManga.type,
        url: this.state.singleManga.links.self,
        episodes_watched: null,
        chapters_read: this.state.chapters_read,
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
  render() {
    return (
      <div className="SingleManga">
        {this.state.singleManga ? this.renderCoverImage() : ''}
        {this.state.singleManga ? (
          <div className="title">{this.renderTitles()}</div>
        ) : (
          ''
        )}
        {this.state.singleManga ? this.renderPosterImage() : ''}
        {this.state.singleManga ? (
          <div className="synopsis">
            <div id="synopsis-title">Synopsis</div>
            <div>{this.state.singleManga.attributes.synopsis}</div>
          </div>
        ) : (
          ''
        )}
        {this.state.singleManga ? this.renderForm() : ''}
        {this.state.singleManga ? (
          <div className="info-title">Manga Information</div>
        ) : (
          ''
        )}
        {this.state.singleManga ? this.renderInfo() : ''}
        {this.state.genres ? <div className="genres-title">Genres</div> : ''}
        <div className="genres-div">
          {this.state.genres ? this.state.genres : ''}
        </div>
        {/* {this.state.streamingLinks ? <div className="streaming-links-title">Streaming Links</div> : ""} */}
        {/* {this.state.streamingLinks ? <StreamingLinks streamingLinks={this.state.streamingLinks} /> : ""} */}
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
//  fetch =>  this.state.singleManga.mediaRelationships.links.related
//  .then =>  data.data.relationships.destination.links.self
//  .then =>  data.data.type & data.data.id
//=====================================================================================================================================
