import React from 'react';
import { Link } from 'react-router-dom';

function TVOverlay(movie) {
    return (<Link to={`/${movie.id}`} className='item'>
        <img src={movie.source} alt={`${movie.title} logo`} />
        <div className='overlay'>
            <h1>{movie.title}</h1>
        </div>
    </Link>);
}

export default TVOverlay;