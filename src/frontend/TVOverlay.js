import React from 'react';
import { Link } from 'react-router-dom';

export default function TVOverlay(tvseries) {
    return (<Link to={`/${tvseries.id}`} className='item'>
        <img src={require(`./common/images/covers/${tvseries.id}.jpg`)}
            alt={`${tvseries.title} logo`} />
        <div className='TVOverlay'>
            <h1>{tvseries.title}</h1>
        </div>
    </Link>);
}