import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
var device_names = [];

class List extends Component {

  constructor(props){
    super(props);
    this.state = {devices: false}
  }

  componentDidMount(){
  fetch("http://cuhackathon-challenge.martellotech.com/devices/").then(result => {
    console.log(result)
    return result.json()
  }
  ).then((test_obj) => {
    console.log("teststring")
  const route_values = Object.values(test_obj)
  const promise_array = route_values.map(route => (
    fetch("http://cuhackathon-challenge.martellotech.com" + route)
  ))
  return Promise.all(promise_array)
  })
    .then((results) => (
      Promise.all(results.map((result) => result.json()))
    ))
    .then(results => {
      this.setState({devices: results})
      results.forEach(result => device_names.push(result.name));
    })
    .catch(console.error)
  }

  render() {
    if (this.state.devices == false){return(
      <div>
        <h3>DEVICES</h3>
      </div>
    )}else{
        <div>
        {this.state.devices.map((device, i) => (<Button key={i} title={device.name} onPress="alert('You have selected: + device.name')"/>))}
        </div>
    }
  }
}

export default List;
