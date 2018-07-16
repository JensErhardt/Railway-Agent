import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Home from './Home';
import Map from './Map';
import Secret from './Secret';
import RailwaystationDetail from './RailwaystationDetail';
import Login from './Login';
import Signup from './Signup';
import api from '../api';
import logo from '../logo.svg';
import './App.css';
import Railwaystations from './Railwaystations';
import { log } from 'util';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stations: [],
      search: []
    }
    api.loadUser();
  }

  componentDidMount() {
    api.getRailwaystations()
      .then(railwaystations => {
        this.setState({
          stations: railwaystations
        })
      })
      .catch(err => console.log(err))
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Playing with DB APIs</h1>
          <Link to="/">Home</Link>
          {/* <Link to="/map">Map</Link> */}
          {/* <Link to="/stations">Railwaystations</Link> */}
          {!api.isLoggedIn() && <Link to="/signup">Signup</Link>}
          {!api.isLoggedIn() && <Link to="/login">Login</Link>}
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
          <Link to="/profile">Profile</Link>
        </header>
        <Switch>
          <Route path="/" exact component={Railwaystations} />
          {/* <Route path="/map" component={Map} /> */}
          {/* <Route path="/stations" component={Railwaystations} /> */}
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Secret} />
          <Route path="/stations/:id" component={RailwaystationDetail} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
