import React from 'react';

import './Banner.css'

export default function Banner({name, hideSuccessfulLogin}) {
    hideSuccessfulLogin();
    return (<div className='Banner'>{
        `Login Successful, welcome ${name}!`
    }</div>);
}