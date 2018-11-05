import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Characters from './Characters';
import Reviews from './Reviews';
import RelatedMedia from './RelatedMedia';
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
          'url(https://res.cloudinary.com/damark726/image/upload/v1523327404/No_image_available_ed3rvn.svg)',
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
          'url(https://res.cloudinary.com/damark726/image/upload/v1523327404/No_image_available_ed3rvn.svg)',
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
        <div className="links">
          <Link
            to={`/favorites/manga/${this.props.match.params.dbid}/${
              this.props.match.params.apiid
            }/edit`}
          >
            <button>Edit</button>
          </Link>
        </div>

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

        {this.state.singleManga ? (
          <div className="info-title">Manga Information</div>
        ) : (
          ''
        )}
        {this.state.singleManga ? this.renderInfo() : ''}
        {this.state.genres ? <div className="genres-title">Genres</div> : ''}
        {this.state.genres ? (
          <div className="genres-div">{this.state.genres}</div>
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
      </div>
    );
  }
}
//=====================================================================================================================================
