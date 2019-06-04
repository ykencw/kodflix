import React from 'react';
import TVOverlay from './TVOverlay';
import bmLogo from './images/BlackMirror.jpg';
import bbLogo from './images/BreakingBad.jpg';
import dnLogo from './images/DeathNote.jpg';
import gotLogo from './images/GoT.jpg';
import wdLogo from './images/WalkingDead.jpg';
import wireLogo from './images/Wire.jpg';

function Gallery() {
    return (
      <p className="showTitles">
        <div className="container">
          <TVOverlay id='blackmirror' source={bmLogo} title='Black Mirror' />
          <TVOverlay id='breakingbad' source={bbLogo} title='Breaking Bad' />
          <TVOverlay id='deathnote' source={dnLogo} title='Death Note' />
        </div>
        <div className="container">
          <TVOverlay id='gameofthrones' source={gotLogo} title='Game of Thrones' />
          <TVOverlay id='thewalkingdead' source={wdLogo} title='The Walking Dead' />
          <TVOverlay id='thewire' source={wireLogo} title='The Wire' />
        </div>
      </p>
    );
  }

export default Gallery;