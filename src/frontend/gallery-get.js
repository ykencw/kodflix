import bmLogo from '../images/BlackMirror.jpg';
import bbLogo from '../images/BreakingBad.jpg';
import dnLogo from '../images/DeathNote.jpg';
import gotLogo from '../images/GoT.jpg';
import wdLogo from '../images/WalkingDead.jpg';
import wireLogo from '../images/Wire.jpg';

function getGallery() {
    return [
        { id: 'blackmirror', source: bmLogo, title: 'Black Mirror', synopsis: 'Black Mirror is a sci-fi episodic TV series with each episode depicting an alternative timeline, often with a dark and satirical tone.' },
        { id: 'breakingbad', source: bbLogo, title: 'Breaking Bad', synopsis: 'Breaking Bad is a crime drama TV series following the life of high school chemistry teacher Walter White as he deals with terminal cancer; turning to a life of crime by developing methamphetamine.' },
        { id: 'deathnote', source: dnLogo, title: 'Death Note', synopsis: 'Death Note is a mystery thriller manga/anime series about highschool genius Light Yagami as he discovers an otherworldly notebook, the "Death Note", that kills anyone whose name is written in it.' },
        { id: 'gameofthrones', source: gotLogo, title: 'Game of Thrones', synopsis: 'Game of Thrones is a fantasy TV series filled with political intrigue following the stories of multiple kingdoms and peoples as they fight and plot for the Throne.' },
        { id: 'fearthewalkingdead', source: wdLogo, title: 'Fear the Walking Dead', synopsis: 'Prequel to "The Walking Dead", Fear the Walking Dead is a post-apocalyptic horror TV series featuring a dysfuctional family as they struggle to deal with the onset of the zombie apocalypse and the collapse of human civilization.' },
        { id: 'thewire', source: wireLogo, title: 'The Wire', synopsis: 'The Wire is a crime drama TV series set in Baltimore, Maryland, focusing on the drug crime within the city and the people involved.' }
    ];
}

export default getGallery;