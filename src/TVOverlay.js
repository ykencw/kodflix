import React from 'react';

function TVOverlay(props) {
    return (<div className='item'>
        <img src={props.source} alt={`${props.title} logo`} />
        <div className='overlay'>
            <h1>{props.title}</h1>
        </div>
    </div>);
}

export default TVOverlay;