import React from 'react';
import { Link } from 'react-router-dom';

// import Button from './button';
// import emojiLogo from '../images/smileyEmoji.svg';

// import styles from './styles/landing-page.module.css';

export default function LandingPage(props) {
  return (
    <div>
      <section className="landing">
        <h2>Welcome to MangAnime</h2>
        <p>
          This app helps you track anime you have watched and how many episodes
          you have watched and manga you have read.
        </p>
        <p>
          Using the Kitsu Api you can search for any anime or manga,and add them
          to your favorites. You can also search for anime that you may be
          interested in watching and find a link to the streaming service that
          it is available on.
        </p>
        <h3>Test Account</h3>
        <p>Username:demotest</p>
        <p>Password:demotester</p>

        <Link to="/home">
          <button className="landing button">Begin Tracking</button>
        </Link>
      </section>
    </div>
  );
}
