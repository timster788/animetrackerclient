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
        
      </p>
      <RegistrationForm />
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
