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
import Banner from './Banner';
import DevOverlay from './DevOverlay';

import './App.css';

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
      showBanner: { show: false, banner: {} }
    };
  }

  showLoginBanner = banner => {
    this.setState(() => ({
      showBanner: { show: true, banner }
    }));
  }

  hideLoginBanner = delay => {
    setTimeout(() => 
    this.setState(() => ({
      showBanner: { show: false, banner: {} }
    })), delay);
  }

  render() {
    let showBanner = this.state.showBanner;
    return (
      <div className="App">
        <Menu />
        {process.env.NODE_ENV === 'development' ? <DevOverlay /> : <></>}
        <Switch>
          <Route exact path='/' component={TVShows} />
          <Route exact path='/not-found' component={NotFound} />
          <Route exact path='/login' render={() =>
            <Login showLoginBanner={this.showLoginBanner} />} />
          <Route path='/admin/tvshows' component={Admin} />
          <Route exact path='/:tvshowsID/play' component={Play} />
          <Route exact path='/:details' component={Details} />
          <Route render={() => <Redirect to='/not-found' />} />
        </Switch>
        {showBanner.show ? 
          <Banner banner={showBanner.banner} 
            hideLoginBanner={this.hideLoginBanner} /> :
          <></>}
      </div>
    );
  }
}


export default withRouter(App);
