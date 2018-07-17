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
  DropdownItem
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
        <header className="App-header">
        </header>

        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Home</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="https://www.google.de/maps">Google Maps</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Menu
                </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      {!api.isLoggedIn() && <Link to="/signup">Signup</Link>}
                    </DropdownItem>
                    <DropdownItem>
                      {!api.isLoggedIn() && <Link to="/login">Login</Link>}
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/profile">Profile</Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>

        <Switch>
          <Route path="/" exact component={Railwaystations} />
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
