import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
var ReactSuperSelect = require('react-super-select');
var device_names = [];
var device_data = [];

class App extends Component {

  constructor(props){
    super(props);
    this.state = {devices: false}
  }

  componentDidMount(){
  fetch("http://cuhackathon-challenge.martellotech.com/devices/").then(result => {
    console.log(result);
    return result.json()
  }
  ).then((test_obj) => {
    console.log("teststring");
  const route_values = Object.values(test_obj);
  const promise_array = route_values.map(route => (
    fetch("http://cuhackathon-challenge.martellotech.com" + route)
    ));
  return Promise.all(promise_array)
    })
    .then((results) => (
      Promise.all(results.map((result) => result.json()))
    ))
    .then(results => {
      this.setState({devices: results});
      results.forEach(result => device_names.push(result.name));
        results.forEach(result => device_data.push(result));
    })
    .catch(console.error)
  }

  render() {
    if (this.state.devices == false){return(
      <div>
        <h3>LOADING</h3>
      </div>
    )}else{
        <ReactSuperSelect placeholder="Make Your Selections"
                          ajaxDataFetch={device_data}
                          onChange={this.handleChange()}
                          searchable={true} />
    }
  }
    handleChange = function(option) {
        var output = [
            option.name
        ]
        console.log(output.join(''));
    }
}

export default App;
