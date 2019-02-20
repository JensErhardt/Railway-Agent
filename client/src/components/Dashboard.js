import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import SearchBar from './SearchBar';
import MapContainer from './MapContainer';
import Favorites from './Favorites';
import Station from './station/Station';
import api from '../api';

import './Dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stations: [],
      value: "",
      showMap: true,

    }
    this.handleToUpdate = this.handleToUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleToUpdate() {
    this.setState(prevState => ({
      showMap: !prevState.showMap
    }));
  }

  handleChange(event) {
    event.preventDefault();

    const value = event.target.value
    this.setState({
      value,
    });
  }

  getStations() {
    api.getRailwaystations()
      .then(stations => {
        stations.sort(
          function (a, b) {
            return (a.name > b.name)
              ? 1
              : ((b.name > a.name)
                ? -1
                : 0);
          }
        );
        this.setState({
          stations,
        })
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getStations();
  }

  render() {
    const stations = this.state.stations.filter(station =>
      station.name.toUpperCase().includes(this.state.value.toUpperCase()))

    return (
      <div className="dashboard">
        <div class="container">
          <SearchBar
            mapState={this.state.showMap}
            handleToUpdate={this.handleToUpdate}
            onChange={this.handleChange}
            stations={this.state.railwaystations}
          />
          <div class="row">
            <div class="col-md">
              {this.renderDashboard(stations)}
            </div>
            <div class="col-md">
              <Route path="/stations/:id" component={Station} />
            </div>
          </div>
          {this.renderFavorites()}
        </div>
      </div>
    );
  }

  renderDashboard(stations) {
    const showMap = this.state.showMap;

    if (showMap) {
      return this.renderMap(stations);
    }

    return this.renderList(stations);
  }

  renderMap(stations) {
    return (
      <div id="map-container">
        <MapContainer stations={stations} />
      </div>
    )
  }

  renderList(stations) {
    return (
      <ul class="list-group-horizontal" className="list-group-horizontal">
        {stations.map((e) =>
          <li class="list-group-item" key={e._id}><Link to={"/stations/" + e._id}>{e.name}</Link></li>)}
      </ul>
    );
  }

  renderFavorites() {
    if (!api.isLoggedIn()) {
      return;
    }

    return (
      <Favorites />
    );
  }

}

export default Dashboard;
