import bmLogo from './images/BlackMirror.jpg';
import bbLogo from './images/BreakingBad.jpg';
import dnLogo from './images/DeathNote.jpg';
import gotLogo from './images/GoT.jpg';
import wdLogo from './images/WalkingDead.jpg';
import wireLogo from './images/Wire.jpg';

function getGallery() {
    return [
        { id: 'blackmirror', source: bmLogo, title: 'Black Mirror' },
        { id: 'breakingbad', source: bbLogo, title: 'Breaking Bad' },
        { id: 'deathnote', source: dnLogo, title: 'Death Note' },
        { id: 'gameofthrones', source: gotLogo, title: 'Game of Thrones' },
        { id: 'thewalkingdead', source: wdLogo, title: 'The walking Dead' },
        { id: 'thewire', source: wireLogo, title: 'The Wire' }
    ];
}

export default getGallery;