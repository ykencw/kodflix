import React from 'react';
import { Link } from 'react-router-dom';

function TVOverlay(props) {
    return (<Link to={`/${props.id}`} className='item'>
        <img src={props.source} alt={`${props.title} logo`} />
        <div className='overlay'>
            <h1>{props.title}</h1>
        </div>
    </Link>);
}

export default TVOverlay;