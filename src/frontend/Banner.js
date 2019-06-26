import React from 'react';

import './Banner.css'

export default function Banner({ banner, hideBanner }) {
    const { message, isSuccess } = banner;
    hideBanner(3500);
    return (<div className={`Banner ${isSuccess ? 'Success' : 'Fail'}`}>{
        message
    }</div>);
}