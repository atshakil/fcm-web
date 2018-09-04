import React, { Component } from 'react';
import firebase from 'firebase';
import { FCM_CONFIG } from './config.js';
import './App.css';

class App extends Component {
  componentDidMount() {
    firebase.initializeApp(FCM_CONFIG);
    window.messaging = firebase.messaging();
    window.messaging.usePublicVapidKey(process.env.REACT_APP_WEB_PUSH_CERT_PUBKEY);
    window.messaging.requestPermission()
      .then(() => {console.log('Notification permission granted.')})
      .catch(err => {console.log('Unable to get permission to notify.', err)});
    window.messaging.getToken()
      .then(currentToken => {console.log(currentToken ? `TOKEN READY TO STORE AND SEND TO SERVER: ${currentToken}` : 'No Instance ID token available. Request permission to generate one.')})
      .catch(err => {console.log('An error occurred while retrieving token. ', err)});
    window.messaging.onTokenRefresh(() => {
      console.log(`Token refreshing ...`);
      window.messaging.getToken()
        .then(newToken => {
          console.log(`Token refreshed.`);
          console.log(`New Token: ${newToken}`);
        })
        .catch(e => {
          console.log(`Token retrival (on refresh) failed. Error: ${e}`);
        })
    });
    window.messaging.onMessage(payload => {
      console.log(`Message received:`);
      console.log(payload);
    });
  }

  render() {
    return (
      <div className="App">
        Rendered
      </div>
    );
  }
}

export default App;
