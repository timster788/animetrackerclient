import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Characters from './Characters';
import StreamingLinks from './StreamingLinks';
import Reviews from './Reviews';
import RelatedMedia from './RelatedMedia';
//=====================================================================================================================================
export default class SingleAnimeFavorites extends Component {
  constructor() {
    super();
    this.state = {};
  }
  //=====================================================================================================================================
  componentDidMount() {
    fetch(`https://kitsu.io/api/edge/anime/${this.props.match.params.apiid}`)
      .then(data => data.json())
      .then(data => {
        this.setState({
          singleAnime: data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  shouldComponentUpdate() {
    if (this.state.genres) {
      return false;
    } else {
      return true;
    }
  }

  componentDidUpdate() {
    let divId = 1;
    fetch(this.state.singleAnime.relationships.genres.links.related)
      .then(data => data.json())
      .then(data => {
        const genres = data.data.map(genre => {
          return (
            <div key={genre.id} className="genres" id={`genre${divId++}`}>
              {genre.attributes.name}
            </div>
          );
        });
        this.setState({
          genres: genres
        });
      });
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
          'url(https://res.cloudinary.com/damark726/image/upload/v1523327404/No_image_available_ed3rvn.svg)',
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
          'url(https://res.cloudinary.com/damark726/image/upload/v1523327404/No_image_available_ed3rvn.svg)',
        backgroundColor: '#bbbbbb'
      };
      return <div id="poster-image" style={bg} />;
    }
  }

  //=====================================================================================================================================
  render() {
    return (
      <div className="SingleAnimeFavorites">
        <div className="links">
          <Link
            to={`/favorites/manga/${this.props.match.params.dbid}/${
              this.props.match.params.apiid
            }/edit`}
          >
            <button>Edit</button>
          </Link>
        </div>

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
        {/* {this.state.singleAnime ? this.renderForm() : ''}
        {this.state.singleAnime ? (
          <div className="info-title">Anime Information</div>
        ) : (
          ''
        )} */}
        {this.state.singleAnime ? this.renderInfo() : ''}
        {this.state.genres ? <div className="genres-title">Genres</div> : ''}
        {this.state.genres ? (
          <div className="genres-div">{this.state.genres}</div>
        ) : (
          ''
        )}
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
        {this.state.relatedMedia ? (
          <div className="related-media-title">
            <span>Related Media</span>
          </div>
        ) : (
          ''
        )}
        {this.state.relatedMedia ? (
          <RelatedMedia relatedMedia={this.state.relatedMedia} />
        ) : (
          ''
        )}

        {/* {this.props.location.searchResult ? <div onClick={this.props.history.goBack}>Ayeeeee</div> : ""} */}
      </div>
    );
  }
}
//=====================================================================================================================================
