import React from 'react';
import bmLogo from './images/BlackMirror.jpg';
import bbLogo from './images/BreakingBad.jpg';
import dnLogo from './images/DeathNote.jpg';
import gotLogo from './images/GoT.jpg';
import wdLogo from './images/WalkingDead.jpg';
import wireLogo from './images/Wire.jpg';

import './App.css';

function App() {
  return (
    <div className="App">
        <p className="showTitles">
          <div className="container">
            <div className="item">
              <img src={bmLogo} alt="Black Mirror logo" />
              <div className="overlay">
                <h1>Black Mirror</h1>
              </div>
            </div>
            <div className="item">
              <img src={bbLogo} alt="Breaking Bad logo" />
              <div className="overlay">
                <h1>Breaking Bad</h1>
              </div>
            </div>
            <div className="item">
              <img src={dnLogo} alt="Death Note logo" />
              <div className="overlay">
                <h1>Death Note</h1>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="item">
              <img src={gotLogo} alt="Game of Thrones logo" />
              <div className="overlay">
                <h1>Game of Thrones</h1>
              </div>
            </div>
            <div className="item">
              <img src={wdLogo} alt="The Walking Dead logo" />
              <div className="overlay">
                <h1>The Walking Dead</h1>
              </div>
            </div>
            <div className="item">
              <img src={wireLogo} alt="The Wire logo" />
              <div className="overlay">
                <h1>The Wire</h1>
              </div>
            </div>
          </div>
        </p>
    </div>
  );
}

export default App;
