import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faListUl } from '@fortawesome/free-solid-svg-icons';

import React, { PureComponent } from 'react';

import './SearchBar.css';

library.add(faMapMarkerAlt, faListUl)

class Searchbar extends PureComponent {
  render() {  
    const props = this.props;

    return (
      <div className="search-bar container">
          <div className="input-group">
            <input
              className="form-control mb-3 mt-2"
              type="text"
              name="search"
              id="searchInput"
              placeholder="Search for station or city..."
              value={props.value}
              onChange={props.onChange}
            />
            <div className="input-group-append"
              addonType="append">
              <button
                className="btn btn-primary"
                id="search-button"
                className="mb-3 mt-2"
                onClick={() => props.handleToUpdate()}
              > <FontAwesomeIcon icon={props.mapState ? "list-ul" : "map-marker-alt"} />
              </button>
            </div>
          </div>
      </div>
    )
  }
}

export default Searchbar;