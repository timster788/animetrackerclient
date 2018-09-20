import React, { Component } from 'react';
//=====================================================================================================================================
export default class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: this.props.reviews
    };
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }
  //=====================================================================================================================================
  componentDidMount() {
    let userInfo = [];
    this.state.reviews.data.forEach(review => {
      fetch(review.relationships.user.links.related)
        .then(data => data.json())
        .then(data => {
          let obj = {
            content: review.attributes.content,
            userName: data.data.attributes.name,
            avatar: data.data.attributes.avatar,
            reviewId: review.id
          };
          userInfo.push(obj);
          if (userInfo.length === this.state.reviews.data.length) {
            let sortedUserInfo = userInfo.sort(
              (a, b) => a.reviewId - b.reviewId
            );
            this.setState({ userInfo: sortedUserInfo });
          }
        });
    });
  }
  //=====================================================================================================================================
  prevPage() {
    if (this.state.reviews.links.prev) {
      fetch(this.state.reviews.links.prev)
        .then(data => data.json())
        .then(data => {
          let userInfo = [];
          data.data.forEach(review => {
            fetch(review.relationships.user.links.related)
              .then(nestedData => nestedData.json())
              .then(nestedData => {
                let obj = {
                  content: review.attributes.content,
                  userName: nestedData.data.attributes.name,
                  avatar: nestedData.data.attributes.avatar,
                  reviewId: review.id
                };
                userInfo.push(obj);
                if (userInfo.length === data.data.length) {
                  let sortedUserInfo = userInfo.sort(
                    (a, b) => a.reviewId - b.reviewId
                  );
                  this.setState({ reviews: data, userInfo: sortedUserInfo });
                }
              });
          });
        });
    }
  }
  //=====================================================================================================================================
  nextPage() {
    if (this.state.reviews.links.next) {
      fetch(this.state.reviews.links.next)
        .then(data => data.json())
        .then(data => {
          let userInfo = [];
          data.data.forEach(review => {
            fetch(review.relationships.user.links.related)
              .then(nestedData => nestedData.json())
              .then(nestedData => {
                let obj = {
                  content: review.attributes.content,
                  userName: nestedData.data.attributes.name,
                  avatar: nestedData.data.attributes.avatar,
                  reviewId: review.id
                };
                userInfo.push(obj);
                if (userInfo.length === data.data.length) {
                  let sortedUserInfo = userInfo.sort(
                    (a, b) => a.reviewId - b.reviewId
                  );
                  this.setState({ reviews: data, userInfo: sortedUserInfo });
                }
              });
          });
        });
    }
  }
  //=====================================================================================================================================
  renderReviews() {
    return this.state.userInfo.map((review, index) => {
      if (review.avatar) {
        let bg = { backgroundImage: `url(${review.avatar.large})` };
        return (
          <div className="review" key={index}>
            <div className="avatar" style={bg} />
            <div className="user-name">{review.userName}</div>
            <div className="user-review">{review.content}</div>
          </div>
        );
      } else {
        let bg = {
          backgroundImage: 'url(http://res.cloudinary.com/damark726/image/upload/v1523851480/blank-profile-picture-973460_960_720_kxhies.png)'
        };
        return (
          <div className="review" key={index}>
            <div className="avatar" style={bg} />
            <div className="user-name">{review.userName}</div>
            <div className="user-review">{review.content}</div>
          </div>
        );
      }
    });
  }
  //=====================================================================================================================================
  render() {
    return (
      <div className="reviews-container">
        <div className="button-container">
          <div className="prev-page" onClick={this.prevPage}>
            Prev Page
          </div>
          <div className="next-page" onClick={this.nextPage}>
            Next Page
          </div>
        </div>
        {this.state.userInfo ? this.renderReviews() : ''}
      </div>
    );
  }
}
//=====================================================================================================================================
