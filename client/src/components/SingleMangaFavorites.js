import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//=====================================================================================================================================
export default class SingleMangaFavorites extends Component {
  constructor() {
    super();
    this.state = {};
  }
  //=====================================================================================================================================
  componentDidMount() {
    fetch(`https://kitsu.io/api/edge/manga/${this.props.match.params.apiid}`)
      .then(data => data.json())
      .then(data => {
        this.setState({
          singleManga: data.data
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
    console.log(this.state.singleManga);
    fetch(this.state.singleManga.relationships.genres.links.related)
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

  renderInfo() {
    return (
      <div className="info">
        <div className="info-divs">
          Series Type: {this.state.singleManga.attributes.showType}
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
  render() {
    return (
      <div className="SingleMangaFavorites">
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
        {this.state.singleManga ? (
          <img
            className="cover-image"
            alt=""
            src={this.state.singleManga.attributes.coverImage.original}
          />
        ) : (
          ''
        )}
        {this.state.singleManga ? (
          <div className="title">{this.renderTitles()}</div>
        ) : (
          ''
        )}
        {this.state.singleManga ? (
          <div className="poster-image">
            <img
              alt=""
              src={this.state.singleManga.attributes.posterImage.small}
            />
          </div>
        ) : (
          ''
        )}
        {this.state.singleManga ? (
          <div className="synopsis">
            <span>Synopsis</span>
            {this.state.singleManga.attributes.synopsis}
          </div>
        ) : (
          ''
        )}
        {this.state.singleManga ? (
          <div className="info-title">Additional Information</div>
        ) : (
          ''
        )}
        {this.state.singleManga ? this.renderInfo() : ''}
        <div className="genres-title">Genres:</div>
        <div className="genres-div">
          {this.state.genres ? this.state.genres : ''}
        </div>
      </div>
    );
  }
}
//=====================================================================================================================================
