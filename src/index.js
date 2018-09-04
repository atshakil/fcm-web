import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
    .then(reg => console.log(`FCM service worker registered successfully. Registration scope: ${reg.scope}`))
    .catch(e => console.log(`FCM service worker could not be registered. Error: ${e}`));
}
