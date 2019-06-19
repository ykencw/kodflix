import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import ReactGA from 'react-ga';
import TVSeries from './TVSeries';
import Details from './Details';
import Play from './Play';
import NotFound from './NotFound';
import Menu from './Menu';
import Admin from './admin/Admin';
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
  }

  render() {
    return (
      <div className="App">
        <Menu />
        {process.env.NODE_ENV === 'development' ? <DevOverlay /> : <div />}
        <Switch>
          <Route exact path='/' component={TVSeries} />
          <Route exact path='/not-found' component={NotFound} />
          <Route path='/admin/tvseries' component={Admin} />
          <Route exact path='/:tvseriesID/play' component={Play} />
          <Route exact path='/:details' component={Details} />
          <Route render={() => <Redirect to='/not-found' /> } />
        </Switch>
      </div>
    );
  }
}


export default withRouter(App);
