import React from 'react';
import twLogo from './Twilight_Zone_Logo.jfif';
import './App.css';

function App() {
  return (
    <div className="App">
        <img src={twLogo} className="Movie-Cover" alt="Twilight Zone logo" />
        <p className="showTitles">
          <div className="container">
            <h1 className="item">Black Mirror</h1>
            <h1 className="item">Breaking Bad</h1>
            <h1 className="item">Death Note</h1>
          </div>
          <div className="container">
            <h1 className="item">Game of Thrones</h1>
            <h1 className="item">The Walking Dead</h1>
            <h1 className="item">The Wire</h1>
          </div>
        </p>
    </div>
  );
}

export default App;
