import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import TwilioVideo from 'react-twilio';
 
class Video extends Component {
  constructor(props) {
    super(props);
    this.shadowStyle = {
      border: '1px solid #dcd9d9',
      borderRadius: '4px',
      marginBottom: '15px',
      boxShadow: '5px 5px 5px #e0e3e4',
      fontWeight: 'lighter'
    }
    let obj = { token: "1263612ea43e3e06b8e43717cfed1039" }
    this.token = obj.token;
  }
  render() {
    return (
      <div style={{ heigh: '800px', width: '50%' }}>
        <TwilioVideo roomName={'214'} token={this.token} style={{ ...this.shadowStyle, boxShadow: '5px 5px 5px #e0e3e4' }} />
      </div>
    );
  }
}
 
export default Video;