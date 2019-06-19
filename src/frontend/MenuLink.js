import React from 'react';
import { Link } from 'react-router-dom';

const MenuLink = ({route, iconName, linkName, clickHandler}) => {
    return (<Link className='item MenuLink' to={route} onClick={clickHandler}>
        <img className='icon'
            src={require(`./common/images/${iconName}.svg`)}
            alt={`${linkName} icon`} />
        <div className='linkName'>{linkName}</div>
    </Link>);
}

export default MenuLink;