import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (<>
        <h1>Ooops, it looks like this page doesn't exist!</h1>
        <Link to='/'><h1>Back to homepage!</h1></Link>
    </>);
}

export default NotFound;