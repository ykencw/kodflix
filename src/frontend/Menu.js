import React from 'react';
import MenuLink from './MenuLink';

import './Menu.css';
import './MenuLink.css';

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
        return (<div className={
            `Menu ${this.state.isOpen ? 'is-visible' : ''}`}>
            <button onClick={this.toggleMenuOpen}>
                <img id='icon'
                    src={require(`./common/images/menuicon.svg`)}
                    alt='menu icon' />
            </button>
            <div className='panel'>
                <div className='dimmer' onClick={this.toggleMenuOpen} />
                <div className='bar'><div className='title'>Hello menu!</div>
                    <div className='container'>
                        <MenuLink route='/'
                            iconName='homeicon'
                            linkName='Home'
                            clickHandler={this.toggleMenuOpen} />
                        <MenuLink route='/admin/tvseries/list'
                            iconName='tvicon'
                            linkName='Admin TVSeries'
                            clickHandler={this.toggleMenuOpen} />
                        <div className='item'>Faux Option 3</div>
                        <div className='item'>Faux Option 4</div>
                        <div className='item'>Faux Option 5</div>
                        <div className='item'>Faux Option 6</div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default Menu;