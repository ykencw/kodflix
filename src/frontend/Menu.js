import menuicon from './common/images/menuicon.svg';
import React from 'react';

import './Menu.css';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    handleClick = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
        console.log('The menu works!')
    }

    render() {
        return (
        <div className={`Menu ${this.state.isOpen ? 'is-visible' : ''}`}>
            <button onClick={this.handleClick}>
                <img className='icon' src={menuicon} alt='menu icon'></img>
            </button>
            <div className='panel'>
                <div className='dimmer' onClick={this.handleClick} />
                <div className='bar'><div className='title'>Hello menu!</div>
                    <div className='container'>
                        <div className='item'>Faux Option 1</div>
                        <div className='item'>Faux Option 2</div>
                        <div className='item'>Faux Option 3</div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default Menu;