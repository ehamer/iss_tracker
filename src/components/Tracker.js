import React from 'react';

import axios from 'axios';

const timeOut = 60000;

function convertEpoch(value) {
  if (!value) {
    return ''
  }
  const time = new Date(Number(value*1000));
  if (isNaN(time.valueOf())) {
    return '';
  }
  
  return time.toLocaleString("en-US", { month: "numeric", day:"numeric", year:"numeric", hour: "numeric", minute: "numeric", second: "numeric", hour12: false });
}

export default class Tracker2 extends React.Component {
  state = {
  timeStamp: '',
  latitude: '',
  longitude: ''
 }

 
 callback = () =>{
   this.retrieveData();
   setTimeout(this.callback, timeOut);
 }
 

 retrieveData = () => {
  axios.get(`http://api.open-notify.org/iss-now.json`)
 .then(res => {
    const timeStamp = res.data.timestamp;
    const longitude = res.data.iss_position.longitude;
    const latitude = res.data.iss_position.latitude;

    this.setState({ timeStamp, latitude, longitude });
   })
 }

 componentDidMount() {
  this.retrieveData();
  setTimeout(this.callback, timeOut);
}

 handleClick = () => {
  this.retrieveData();
 }

 render() {
  var currDate = convertEpoch(this.state.timeStamp);
  return (
   <>
   <div className="App-text">
    Date:&nbsp;{ currDate }&nbsp;Longitude:{ this.state.longitude }&nbsp;Latitude:{ this.state.latitude }
   </div>
   <button className="App-button" onClick={this.handleClick}>Update Data</button>
   <div className="App-text-small">
       The data will automatically update every sixty seconds
   </div>
   </>
  )
 }
}
