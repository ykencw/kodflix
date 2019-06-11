import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TVSeries from './TVSeries';
import Details from './Details';
import NotFound from './NotFound';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path='/' component={TVSeries} />
            <Route path='/not-found' component={NotFound} />
            <Route path='/:details' component={Details} />
          </Switch>
        </div>
      </Router>  
    );
  }
}


export default App;
