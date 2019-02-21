import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import React from 'react';
import { Link } from 'react-router-dom';

import api from '../api';
import './Favorites.css';

library.add(faTrashAlt)

class Favorites extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      favorites: [],
    }
  }

  async getFavorites() {
    const response = await api.getFavorites();

    const favorites = response;

    this.setState({
      favorites,
    });
  }

  async delete(id) {
    await api.deleteFavorite(id);

    this.getFavorites();
  }

  componentDidMount() {
    this.getFavorites();
  }

  render() {
    return (
      <div class="fav-container">
        <h2>Pinned Stations</h2>
        {this.renderFavorites()}
      </div>
    )
  }

  renderFavorites() {
    const favorites = this.state.favorites;

    if (favorites.length === 0) {
      return <p><i>No stations pinned yet</i></p>
    }

    return (
      <ul class="list-group-horizontal" id="favorite-list">
        {favorites.map((f) =>
          <li
            class="list-group-item"
            id="favorite-item"
            favoriteId={f._id}
          >
            <Link to={"/stations/" + f._id}>{f.name} </Link>
            <button type="button" className="btn btn-danger" onClick={_ => this.delete(f._id)}>
              <FontAwesomeIcon icon="trash-alt" />
            </button>
          </li>)}
      </ul>
    )
  }
}

export default Favorites;