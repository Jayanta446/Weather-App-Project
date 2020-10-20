import React, { Component } from "react";
import axios from "axios";
import DisplayWeather from "./components/DisplayWeather";
import Navbar from "./components/Navbar";
import "./App.css";
import Axios from "axios";

class App extends Component {

  state = {
    coords: {
      latitude: 45,
      longitude: 60,
    },
    data: {
      inputData: ""
    }
  }


  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let newCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
        this.setState({coords : newCoords});
        axios.get(`http://api.weatherstack.com/current?access_key=f8eacfeef15dff9a7055436206cc0673&query=${this.state.coords.latitude},${this.state.coords.longitude}`).then( res => {
          console.log(res);
          let weatherData = {
            location: res.data.location.name,
            temperature: res.data.current.temperature,
            description: res.data.current.weather_descriptions[0],
            region: res.data.location.region,
            country: res.data.location.country,
            wind_speed: res.data.current.wind_speed,
            pressure: res.data.current.pressure,
            precip: res.data.current.precip,
            humidity: res.data.current.humidity,
            img: res.data.current.weather_icons,
          }
          this.setState({data : weatherData});
        })
      });
    } else {
      console.log("Geolocation not supported");
    }
  }

  change = (value) => {
    this.setState({ inputData : value});
  }

  changeWeather = (event) => {
    event.preventDefault();

    Axios.get(`http://api.weatherstack.com/current?access_key=f8eacfeef15dff9a7055436206cc0673&query=${this.state.inputData}`).then(res => {
      let weatherData = {
        location: res.data.location.name,
        temperature: res.data.current.temperature,
        description: res.data.current.weather_descriptions[0],
        region: res.data.location.region,
        country: res.data.location.country,
        wind_speed: res.data.current.wind_speed,
        pressure: res.data.current.pressure,
        precip: res.data.current.precip,
        humidity: res.data.current.humidity,
        img: res.data.current.weather_icons,
      }
      this.setState({data : weatherData});
    })
  }
 
  render() {
    return <div className="App">
      <div className="container">
      <Navbar changeWeather = {this.changeWeather} changeRegion = {this.change}/>
        <DisplayWeather weatherData = {this.state.data} />
      </div>
    </div>;
  }
}
export default App;
