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

  componentDidMount(props) { 
    api.getFavorites(props)
    .then(favoriteData => {
      this.setState({
        favorites: favoriteData,
      })
    })
  }

  handleFavoriteDeleteClick(id) {
    api.deleteFavorite(id)
    .then(_ => {
      let newFavorites= [...this.state.favorites];
      for ( let i = 0; i < this.state.favorites.length; i++) {
        if (newFavorites[i]._id === this.state.favorites[i]._id) {
          newFavorites.splice(i, 1)
        }
      }
    this.setState({
      favorites: newFavorites,
      })
     })
  }
  
  render() {
      console.log(this.state.favorites)
       let favoriteStations = this.state.favorites
       // .filter(favoriteStations => favorite.name.toUpperCase().includes(this.state.value.toUpperCase()))
    return (
      <div class="fav-container">

        <h2>Pinned Stations</h2>
        <ul class="list-group-horizontal" id="favorite-list">
          {favoriteStations
            .map((f) =>
              <li 
              class="list-group-item"
              id="favorite-item"
              favoriteId={f._id}>
              <Link to={"/stations/" + f._id}>{f.name} </Link>
              <FontAwesomeIcon 
              onClick={_ => this.handleFavoriteDeleteClick(f._id)}
              icon="trash-alt" />
              </li>)}
        </ul>
      </div>  
    )
  }
}

export default Favorites;