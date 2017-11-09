import React, { Component } from 'react'
import './App.css'
import ProviderSelect from './ProviderSelect.js'
import AccountSelect from './AccountSelect.js'
var concurrence = require("concurrence")

class App extends Component {

  setProvider(provider) {
    console.log("Set provider",provider)
  }

  render() {

    let accountSelect = ""
    if(concurrence.accounts){
      accountSelect = (
        <AccountSelect concurrence={concurrence} />
      )
    }


    return (
      <div className="App">

        <ProviderSelect concurrence={concurrence} setProvider={this.setProvider}/>

        {accountSelect}

      </div>
    );
  }
}

export default App;
