import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { FCM_CONFIG } from './config.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoggedIn: false,
      value: '',
      messages: []
    };
    this.authenticateFirebase = this.authenticateFirebase.bind(this);
    this.enableFCM = this.enableFCM.bind(this);
    this.enableRTDB = this.enableRTDB.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.sendNewMessage = this.sendNewMessage.bind(this);
    this.clearMessages = this.clearMessages.bind(this);
  }

  componentDidMount() {
    firebase.initializeApp(FCM_CONFIG);
    window.firebase = firebase;
    window.auth = firebase.auth();
    window.messaging = firebase.messaging();
    window.database = firebase.database();
    window.messages = window.database.ref('messages');
    this.authenticateFirebase();
    this.enableFCM();
    this.enableRTDB();
  }

  authenticateFirebase() {
    window.auth.onAuthStateChanged(user => {
      this.setState({ isLoggedIn: !!user })
      console.log(user ? 'User is now logged in' : 'User is now logged out');

    });
  }

  enableFCM() {
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

  enableRTDB() {
    const msgs = this.state.messages;
    // register an event at a specific location
    window.messages.on('child_added', snap => {
      this.setState({messages: this.state.messages.concat(snap.val())});
      console.log(`New message added. Message data: ${JSON.stringify(snap.val())}`);
    })
    window.messages.on('child_removed', snap => {
      const
        index = _.findIndex(msgs, nth => nth.text ===snap.val().text),
        _messages = msgs.filter((msg, _index) => _index !== index);

      this.setState({messages: _messages});
      console.log(`A message removed. Message data: ${JSON.stringify(snap.val())}`);
    })
  }

  signup() {
    const { email, password } = this.state;
    window.auth.createUserWithEmailAndPassword(email, password).catch(e => console.log(e));
    this.emailField.value = '';
    this.passwordField.value = '';
    this.setState({ email: '', password: '' });
  }

  login() {
    const { email, password } = this.state;
    window.auth.signInWithEmailAndPassword(email, password).catch(e => console.log(e));
    this.emailField.value = '';
    this.passwordField.value = '';
    this.setState({ email: '', password: '' });
  }

  logout() {
    window.auth.signOut()
      .then(() => {})
      .catch(e => console.log(e))
  }

  sendNewMessage() {
    // Create new message
    const text = this.state.value;
    if(text === '') return;
    window.messages.push().set({ text })
      .catch(e => console.log(`Could not write to RTDB. Error: ${e}`));
    this.input.value = '';
    this.setState({value: ''});
  }

  clearMessages() {
    window.messages.remove().catch(e => console.log(`Could not clear messsages. Error: ${e}`));
  }

  render() {
    const { isLoggedIn } = this.state;

    return (
      <div className="App">
        {isLoggedIn ?
          <div>
            <div>Rendered</div>
            <br />
            <button onClick={e => this.logout()}>LOGOUT</button>
            <br /><hr /><br />
            <div>
              <input ref={node => this.input = node} type="text" onChange={e => this.setState({value: e.target.value})} />
              <button onClick={e => this.sendNewMessage()}>SEND</button>
              <button onClick={e => this.clearMessages()}>CLEAR</button>
            </div>
            <br /><br /><br />
            <div>Messages</div>
            <div>----------------------</div>
            <div>
              {this.state.messages.map((msg, index) =>
                <div key={index}>{msg.text}</div>
              )}
            </div>
          </div>
          :
          <div>
            <div>Email: <input type="text" ref={node => this.emailField = node} onChange={e => this.setState({ email: e.target.value })} /></div>
            <div>Password: <input type="password" ref={node => this.passwordField = node} onChange={e => this.setState({ password: e.target.value })} /></div>
            <div>
              <button onClick={e => this.login()}>LOGIN</button>
              <button onClick={e => this.signup()}>SIGNUP</button>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
