import React from 'react';

import './station.css';

import Live from "./Live";
import Meta from "./Meta";
import Carpark from "./Carpark";

class Station extends React.PureComponent {
  render() {
    const id = this.props.match.params.id;

    return (
      <div className="station-detail">
        <div class="container">
          <div class="card-columns">
            <Live id={id} />
            <Meta id={id} />
            <Carpark id={id} />
          </div>
        </div>
      </div>
    );
  }
}

export default Station;
