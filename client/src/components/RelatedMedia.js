import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
//=====================================================================================================================================
export default class RelatedMedia extends Component {
  constructor() {
    super();
    this.state = {};
  }
  //=====================================================================================================================================
  componentDidMount() {
    let relatedMedia = [];
    this.props.relatedMedia.forEach(results => {
      fetch(results.relationships.destination.links.self)
        .then(data => data.json())
        .then(data => {
          let obj = { type: data.data.type, id: data.data.id };
          relatedMedia.push(obj);
          if (relatedMedia.length === this.props.relatedMedia.length) {
            let relatedMediaInfo = [];
            relatedMedia.forEach(results => {
              fetch(`https://kitsu.io/api/edge/${results.type}/${results.id}`)
                .then(nestedData => nestedData.json())
                .then(nestedData => {
                  let info = nestedData.data;
                  relatedMediaInfo.push(info);
                  if (relatedMediaInfo.length === relatedMedia.length) {
                    this.setState({ relatedMedia: relatedMediaInfo });
                  }
                });
            });
          }
        });
    });
  }
  //=====================================================================================================================================
  handleClick(type, id) {
    this.setState(
      {
        type: type,
        id: id
      },
      () => {
        window.location.reload();
      }
    );
  }
  //=====================================================================================================================================
  renderRelatedMedia() {
    return this.state.relatedMedia.map((results, index) => {
      if (results.attributes.posterImage) {
        let bg = {
          backgroundImage: `url(${results.attributes.posterImage.large})`
        };
        return (
          <div
            key={index}
            style={bg}
            onClick={() => this.handleClick(results.type, results.id)}
          >
            <span>{results.attributes.canonicalTitle}</span>
          </div>
        );
      } else {
        let bg = {
          backgroundImage:
            'url(http://res.cloudinary.com/damark726/image/upload/v1523327404/No_image_available_ed3rvn.svg)',
          backgroundColor: '#bbbbbb'
        };
        return (
          <div
            key={index}
            style={bg}
            onClick={() => this.handleClick(results.type, results.id)}
          >
            <span>{results.attributes.canonicalTitle}</span>
          </div>
        );
      }
    });
  }
  //=====================================================================================================================================
  render() {
    return (
      <div className="RelatedMedia">
        {this.state.relatedMedia ? this.renderRelatedMedia() : ''}
        {this.state.type && this.state.id ? (
          <Redirect push to={`/${this.state.type}/${this.state.id}`} />
        ) : (
          ''
        )}
      </div>
    );
  }
}
//=====================================================================================================================================
