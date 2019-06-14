import menuicon from './common/images/menuicon.svg';
import React from 'react';

import './Menu.css';

class Menu extends React.Component {
    handleClick = () => {
        console.log('The menu works!')
    }

    render() {
        return (<button className='Menu' onClick={this.handleClick}><img className='icon' src={menuicon} alt='menu icon'></img></button>);
    }
}

export default Menu;