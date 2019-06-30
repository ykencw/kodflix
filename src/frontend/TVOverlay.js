import React from 'react';
import { Link } from 'react-router-dom';

export default function TVOverlay({tvshow}) {
    return (<Link to={`/${tvshow.id}`} className='item'>
        <img src={
            tvshow.imageCover ?
                `data:${tvshow.imageCover.mimetype};base64,${tvshow.imageCover.data}` : 
                require(`./common/images/covers/default.jpg`)
        } alt={`${tvshow.title} logo`} />
        <div className='TVOverlay'>
            <h1>{tvshow.title}</h1>
        </div>
    </Link>);
}