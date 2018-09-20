import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
  render() {
    return (
      <div className="SingleAnimeFavorites">
        {/* <div className="links"><Link to="/favorites">Back to Favorites</Link></div> */}
        <div className="links">
          <Link
            to={`/favorites/manga/${this.props.match.params.dbid}/${
              this.props.match.params.apiid
            }/edit`}
          >
            Edit
          </Link>
        </div>
        {this.state.singleAnime ? (
          <img
            className="cover-image"
            alt=""
            src={this.state.singleAnime.attributes.coverImage.original}
          />
        ) : (
          ''
        )}
        {this.state.singleAnime ? (
          <div className="title">{this.renderTitles()}</div>
        ) : (
          ''
        )}
        {this.state.singleAnime ? (
          <div className="poster-image">
            <img
              alt=""
              src={this.state.singleAnime.attributes.posterImage.small}
            />
          </div>
        ) : (
          ''
        )}
        {this.state.singleAnime ? (
          <div className="synopsis">
            <span>Synopsis</span>
            {this.state.singleAnime.attributes.synopsis}
          </div>
        ) : (
          ''
        )}
        {this.state.singleAnime ? (
          <div className="info-title">Additional Information</div>
        ) : (
          ''
        )}
        {this.state.singleAnime ? this.renderInfo() : ''}
        <div className="genres-title">Genres:</div>
        <div className="genres-div">
          {this.state.genres ? this.state.genres : ''}
        </div>
      </div>
    );
  }
}
//=====================================================================================================================================
