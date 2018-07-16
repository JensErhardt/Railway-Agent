import React, { Component } from 'react';


class Searchbar extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = { value: '' };


  // }

  // handleChange(event) {
  //   this.setState({ value: event.target.value });
  // }

  // handleSubmit(event) {

  //   let comparator = this.state.value.toUpperCase();
  //   let cities = []
  //   for (let i = 0; i < this.props.stations.length; i++) {
  //     cities.push(this.props.stations[i].address.city);
  //   }
  //   let resultField = cities.map(function (elt) { return elt.toUpperCase() })

  //   for (let i = 0; i < resultField.length; i++) {
  //     if (comparator === resultField[i]) {
  //       console.log("MATCH", resultField[i])
  //     }
  //   }
  //   event.preventDefault();
  // }

  render() {
    return (
        <label>
          City:
          <input
            type="text"
            value={this.props.value}
            onChange={this.props.onChange} />
        </label>


    )
  }
}

export default Searchbar;