import menuicon from './common/images/menuicon.svg';
import tvicon from './common/images/tvicon.svg';
import React from 'react';
import { Link } from 'react-router-dom';

import './Menu.css';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    toggleMenuOpen = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }

    render() {
        return (
        <div className={`Menu ${this.state.isOpen ? 'is-visible' : ''}`}>
            <button onClick={this.toggleMenuOpen}>
                <img id='icon' src={menuicon} alt='menu icon'></img>
            </button>
            <div className='panel'>
                <div className='dimmer' onClick={this.toggleMenuOpen} />
                <div className='bar'><div className='title'>Hello menu!</div>
                    <div className='container'>
                        <Link to='/manage/tvseries' onClick={this.toggleMenuOpen}>
                            <div className='item'>
                                <img className='icon' src={tvicon} alt='manage tv icon' />
                                <div className='itemName'>Manage TVSeries</div>
                            </div>
                        </Link>
                        <div className='item'>Faux Option 2</div>
                        <div className='item'>Faux Option 3</div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default Menu;