import React, { Component } from 'react';
//=====================================================================================================================================
export default class StreamingLinks extends Component {
  constructor() {
    super();
    this.state = {};
  }
  //=====================================================================================================================================
  componentDidMount() {
    let streamingLinks = [];
    this.props.streamingLinks.forEach(streamingLink => {
      fetch(streamingLink.relationships.streamer.links.related)
        .then(data => data.json())
        .then(data => {
          let obj = {
            url: streamingLink.attributes.url,
            siteName: data.data.attributes.siteName
          };
          streamingLinks.push(obj);
          if (streamingLinks.length === this.props.streamingLinks.length) {
            this.setState({ streamingLinks: streamingLinks });
          }
        });
      // .then(this.setState({streamingLinks: streamingLinks}))
    });
  }
  //=====================================================================================================================================
  renderStreamingLinks() {
    return this.state.streamingLinks.map((streamingLink, index) => {
      return (
        <div className="streaming-link-div" key={index}>
          <a target="_blank" href={streamingLink.url}>
            {streamingLink.siteName}
          </a>
        </div>
      );
    });
  }
  //=====================================================================================================================================
  render() {
    // console.log(this.state);
    return (
      <div className="StreamingLinks">
        {this.state.streamingLinks ? (
          this.state.streamingLinks.length > 0 ? (
            this.renderStreamingLinks()
          ) : (
            ''
          )
        ) : (
          <div className="nsla-div">No streaming links available</div>
        )}
      </div>
    );
  }
}
//=====================================================================================================================================
