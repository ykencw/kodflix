import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Gallery from './Gallery';
import Details from './Details';


import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path='/' component={Gallery} />
          <Route exact path='/details' component={Details} />
        </div>
      </Router>  
    );
  }
}


export default App;
