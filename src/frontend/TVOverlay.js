import React from 'react';
import { Link } from 'react-router-dom';

export default function TVOverlay(tvshows) {
    return (<Link to={`/${tvshows.id}`} className='item'>
        <img src={require(`./common/images/covers/${tvshows.id}.jpg`)}
            alt={`${tvshows.title} logo`} />
        <div className='TVOverlay'>
            <h1>{tvshows.title}</h1>
        </div>
    </Link>);
}