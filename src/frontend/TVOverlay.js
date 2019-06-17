import React from 'react';
import { Link } from 'react-router-dom';

const TVOverlay = movie => {
    return (<Link to={`/${movie.id}`} className='item'>
        <img src={require(`./common/images/${movie.id}.jpg`)} alt={`${movie.title} logo`} />
        <div className='overlay'>
            <h1>{movie.title}</h1>
        </div>
    </Link>);
}

export default TVOverlay;