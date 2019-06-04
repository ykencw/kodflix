import React from 'react';
import TVOverlay from './TVOverlay'
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
            <TVOverlay source={bmLogo} title='Black Mirror' />
            <TVOverlay source={bbLogo} title='Breaking Bad' />
            <TVOverlay source={dnLogo} title='Death Note' />
          </div>
          <div className="container">
            <TVOverlay source={gotLogo} title='Game of Thrones' />
            <TVOverlay source={wdLogo} title='The Walking Dead' />
            <TVOverlay source={wireLogo} title='The Wire' />
          </div>
        </p>
    </div>
  );
}

export default App;
