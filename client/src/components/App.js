import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Secret from './Secret';
import RailwaystationDetail from './RailwaystationDetail';
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
    return (
      <div className="App">
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Station Agent</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="https://www.google.de/maps">Google Maps</NavLink>
                </NavItem>
                <div class="nav-header">
                  <NavItem>
                    <NavLink>{!api.isLoggedIn() && <Link to="/signup">Signup</Link>}</NavLink>
                  </NavItem>
                  <span>or</span>
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
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/stations/:id" component={RailwaystationDetail} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
