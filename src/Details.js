import React from 'react';
import { Link } from 'react-router-dom';

function Details() {
    return (
        <div>
            <h1>Welcome to the details page :)</h1>
            <Link to='/'><h1>Back to homepage!</h1></Link>
        </div>
    );
}

export default Details;