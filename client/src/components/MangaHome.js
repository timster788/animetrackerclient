import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//=====================================================================================================================================
export default class MangaHome extends Component {
  constructor() {
    super();
    this.state = {};
  }
  //=====================================================================================================================================
  componentDidMount() {
    fetch('https://kitsu.io/api/edge/manga?sort=popularityRank')
      .then(data => data.json())
      .then(data => {
        let divId = 1;
        const mangas = data.data.map((manga, index) => {
          let bg = {
            backgroundImage: `url(${manga.attributes.posterImage.original})`
          };
          return (
            <div
              key={manga.id}
              className="MostPopularMangas"
              id={`manga${divId++}`}
              style={bg}
            >
              <Link to={`/manga/${manga.id}`}>
                <span>
                  {manga.attributes.titles.en
                    ? manga.attributes.titles.en
                    : manga.attributes.titles.en_jp}
                </span>
              </Link>
            </div>
          );
        });
        this.setState({
          mostPopularMangas: mangas
        });
      });
  }
  //=====================================================================================================================================
  render() {
    return (
      <div className="MangaHome">
        <div id="most-popular-mangas-title">Most Popular Manga</div>
        {this.state.mostPopularMangas ? this.state.mostPopularMangas : ''}
      </div>
    );
  }
}
//=====================================================================================================================================
