import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Web3 from 'web3'
window.addEventListener('load', function() {
  if (typeof web3 !== 'undefined') {
    console.log("web3 is set!")
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();
})
