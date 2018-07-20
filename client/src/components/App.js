import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import api from '../api';
import './App.css';
import Railwaystations from './Railwaystations';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Container
} from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      stations: [],
      search: [],
      isOpen: false
    }
    api.loadUser();
  }

  toggle() {
    this.setState({
      isOpen: !this.isOpen
    })
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

    let bindWord;

    if (!api.isLoggedIn()) {
      bindWord = <span>or</span>;
    }

    return (
      <div className="App">
        <div>
          <Navbar class="navbar" color="white" light expand="md">

            <span class="navbar-brand">
              <NavbarBrand href="/">Railway Agent
              <img class="nav-logo" src="/images/agent2-logo.svg" alt="" />
              </NavbarBrand>

              
            </span>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <div className="nav-header">
                  <NavItem>
                    <NavLink>{!api.isLoggedIn() && <Link to="/signup">Signup</Link>}</NavLink>
                  </NavItem>                   {bindWord}
                  <NavItem>
                    <NavLink>{!api.isLoggedIn() && <Link to="/login">Login</Link>}</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink>{api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}</NavLink>
                  </NavItem>
                </div>
              </Nav>
            </Collapse>
          </Navbar>
        </div>

        <Switch>
          <Route path="/" exact component={Railwaystations} />
          <Route path="/stations" component={Railwaystations} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
