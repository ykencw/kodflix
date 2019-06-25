import React from 'react';

import './Banner.css'

export default function Banner({banner, hideLoginBanner}) {
    const {message, isSuccess} = banner;
    hideLoginBanner(3500);
    return (<div className={`Banner ${isSuccess ? 'Success' : 'Fail'}`}>{
        message
    }</div>);
}