import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import RegistrationForm from './registration-form';

export function RegistrationPage(props) {
  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <div className="Register">
      <h2>Register for MangAnime</h2>
      <p className="Register">
        This app was created to keep track of the anime that you watch and the
        manga that you read.Once you register you can search for any anime or
        manga in both english and japanese. You can then add them to your
        favorites lists tracking the episodes you and seen and the chapters that
        you have read
      </p>
      <RegistrationForm />
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
