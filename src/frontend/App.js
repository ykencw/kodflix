import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
import TVSeries from './TVSeries';
import Details from './Details';
import NotFound from './NotFound';
import Menu from './Menu';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    ReactGA.initialize('UA-142077231-1');
    ReactGA.pageview(this.props.location.pathname + this.props.location.search + this.props.location.hash);
    this.props.history.listen((location) => {
      ReactGA.pageview(location.pathname + location.search + location.hash);
    });
  }

  render() {
    return (
        <div className="App">
          <Menu />
          {process.env.NODE_ENV === 'development' ? <div className='Dev'>Development branch view:</div> : <div />}
          <Switch>
            <Route exact path='/' component={TVSeries} />
            <Route path='/not-found' component={NotFound} />
            <Route path='/:details' component={Details} />
          </Switch>
        </div>
    );
  }
}


export default withRouter(App);
