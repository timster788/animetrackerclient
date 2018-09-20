import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//=====================================================================================================================================
export default class FavoritesListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dbData: this.props.data
    };
  }
  //=====================================================================================================================================
  componentDidMount() {
    axios.get(this.state.dbData.url).then(data => {
      this.setState({
        apiData: data.data.data
      });
    });
  }
  //=====================================================================================================================================
  renderInfo() {
    let bg = {
      backgroundImage:
        'url(' + this.state.apiData.attributes.posterImage.original + ')'
    };
    return (
      <div className="favorite-list-item-div" style={bg}>
        <div>{this.state.dbData.title}</div>
        {this.state.dbData.series_type === 'manga' ? (
          <div>Chapters Read: {this.state.dbData.chapters_read}</div>
        ) : (
          <div>Episodes Watched: {this.state.dbData.episodes_watched}</div>
        )}
        <div>{this.state.dbData.status}</div>
        <div>{this.state.dbData.rating}</div>
        <Link
          to={`/favorites/${this.state.apiData.type}/${this.state.dbData.id}/${
            this.state.apiData.id
          }`}
        >
          See More
        </Link>
        <br />
      </div>
    );
  }
  //=====================================================================================================================================
  render() {
    return (
      <div className="FavoritesListItem">
        {this.state.apiData ? this.renderInfo() : ''}
      </div>
    );
  }
}
//=====================================================================================================================================
