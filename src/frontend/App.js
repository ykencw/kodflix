import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import ReactGA from 'react-ga';
import TVShows from './TVShows';
import Details from './Details';
import Play from './Play';
import NotFound from './NotFound';
import Menu from './Menu';
import Admin from './admin/Admin';
import Login from './Login';
import Logout from './Logout';
import Banner from './Banner';
import DevOverlay from './DevOverlay';

import './App.css';
import Loading from './Loading';

class App extends React.Component {
  constructor(props) {
    super(props);
    ReactGA.initialize('UA-142077231-1');
    const { location } = this.props;
    ReactGA.pageview(location.pathname + location.search + location.hash);
    this.props.history.listen((loc) => {
      ReactGA.pageview(loc.pathname + loc.search + loc.hash);
    });
    this.state = {
      showBanner: { show: false, banner: {} },
      loginInfo: null
    };
  }

  componentDidMount() {
    // Check if user is already logged in
    fetch('/loggedIn').then(res => {
      return res.ok ? res.json() : Promise.reject();
    }).then(res => {
      if (res.result) {
        this.setState(() => ({
          loginInfo: {
            username: res.username,
            ...(res.isAdmin ? { isAdmin: true } : {})
          }
        }));
      } else {
        this.setState(() => ({ loginInfo: {} }));
      }
    });
  }

  logIn = (banner, loginInfo) => {
    this.setState(() => ({
      showBanner: { show: true, banner },
      loginInfo
    }));
  }

  logOut = (banner) => {
    this.setState(() => ({
      showBanner: { show: true, banner },
      loginInfo: { username: null }
    }));
  }

  hideBanner = delay => {
    setTimeout(() =>
      this.setState(() => ({
        showBanner: { show: false, banner: {} }
      })), delay);
  }

  render() {
    if (!this.state.loginInfo) {
      return <Loading />;
    }
    let { showBanner, loginInfo } = this.state;
    return (
      <div className="App">
        <Menu loginInfo={loginInfo} />
        {process.env.NODE_ENV === 'development' ? <DevOverlay /> : <></>}
        <Switch>
          <Route exact path='/' component={TVShows} />
          <Route exact path='/not-found' component={NotFound} />
          <Route exact path='/login' render={props =>
            <Login {...props} logIn={this.logIn} />} />
          <Route exact path='/logout' render={() =>
            <Logout logOut={this.logOut} />} />
          <Route path='/admin/tvshows' render={props =>
            <Admin {...props} loginInfo={loginInfo} />} />
          <Route exact path='/:tvshowsID/play' component={Play} />
          <Route exact path='/:details' component={Details} />
          <Route render={() => <Redirect to='/not-found' />} />
        </Switch>
        {showBanner.show ?
          <Banner banner={showBanner.banner}
            hideBanner={this.hideBanner} /> :
          <></>}
      </div>
    );
  }
}


export default withRouter(App);
