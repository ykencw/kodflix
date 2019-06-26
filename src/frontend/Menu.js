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
                <div className='bar'>
                    <div className='title'>{
                        this.props.loginInfo.username ?
                            `Welcome ${this.props.loginInfo.username}` :
                            'Hello menu!'
                    }</div>
                    <div className='container'>
                        <MenuLink route='/'
                            iconName='homeicon'
                            linkName='Home'
                            clickHandler={this.toggleMenuOpen} />
                        <MenuLink route='/admin/tvshows/list'
                            iconName='tvicon'
                            linkName='Admin TVShows'
                            clickHandler={this.toggleMenuOpen} />
                        {this.props.loginInfo.username ?
                            <MenuLink route='/logout'
                                iconName='logouticon'
                                linkName='Log out'
                                clickHandler={this.toggleMenuOpen} /> :
                            <MenuLink route='/login'
                                iconName='loginicon'
                                linkName='Log in'
                                clickHandler={this.toggleMenuOpen} />
                        }
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