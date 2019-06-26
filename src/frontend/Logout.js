import React from 'react';
import { Redirect } from 'react-router-dom';

export default function Logout(props) {
    props.logOut({ message: 'Logged out!', isSuccess: true });
    return <Redirect to='/' />;
}