import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const  test_obj =  {
      "0": "/devices/0/",
      "1": "/devices/1/",
      "10": "/devices/10/",
      "11": "/devices/11/",
      "12": "/devices/12/",
      "13": "/devices/13/",
      "2": "/devices/2/",
      "3": "/devices/3/",
      "4": "/devices/4/",
      "5": "/devices/5/",
      "6": "/devices/6/",
      "7": "/devices/7/",
      "8": "/devices/8/",
      "9": "/devices/9/"
    }

    fetch("http://cuhackathon-challenge.martellotech.com").then(result =>
      result.json()

    ).then(() => {

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
        results.forEach(result => console.log(result.name))
      })
  }
}

export default App;
