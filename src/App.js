import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
require('es6-promise').polyfill();
require('isomorphic-fetch');

const arrayList = (objects) => {
  const keys = Object.keys(objects || {});
  const promises = [];
  keys.map(key => promises.push(objects[key]));
  return promises;
}

class App extends Component {
  state = {
    categories: []
  }
  componentDidMount() {
    // axios   .get(`https://epos-54a14.firebaseio.com/morleys-deptford/.json`, {
    //      headers: { 'crossDomain': true },     })   .then(res => {
    // this.setState({categories: res.data.categories});   });
    fetch('https://epos-54a14.firebaseio.com/morleys-deptford/categories/.json')
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
        
      })
      .then((jsonResponse) => {
        this.setState({categories: jsonResponse});
      });
  }

  render() {
    if (this.state === null) {
      return <center>Loading...</center>
    }
    console.log('this.state ==>', this.state.categories)
    return (
      <div className="App">
        <center>I am using isomorphic-fetch to fetch</center>
        {arrayList(this.state.categories).map((data, index) => {
          return (
            <div key={index}>
              <img
                src={data.image}
                alt=""
                style={{
                height: 300,
                width: 300,
                float: 'left'
              }}/>
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;
