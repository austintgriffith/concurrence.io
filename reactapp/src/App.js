import React, { Component } from 'react'
import './App.css'
import AccountSelect from './AccountSelect.js'
var concurrence = require("concurrence")
class App extends Component {

  constructor(props) {
    super(props);
    this.state = { accounts:false, selectedAddress:false };
  }

  componentDidMount() {
    console.log("Mounting up.")
    concurrence.init({DEBUG:true,provider:window.web3.currentProvider},(err)=>{
      console.log(concurrence.version)
      console.log(concurrence.contracts["Main"].address)
      this.setState({accounts:concurrence.accounts})
    });
  }

  accountSelect(value) {
    console.log("accountSelect",value)
    concurrence.selectAccount(value)
    this.setState({selectedAddress:concurrence.selectedAddress})
    concurrence.balanceOf(value).then((balance)=>{
      console.log("balance",balance)
      this.setState({balance:balance})
    })
  }

  render() {
    let {accounts,balance} = this.state

    ///////////////////////////account
    let accountSelect = ""
    if(accounts){
      accountSelect = (
        <AccountSelect accounts={accounts} accountSelect={this.accountSelect.bind(this)} />
      )
    }else{
      accountSelect = (
        <div>
          Connecting...
        </div>
      )
    }

    ///////////////////////////balance
    let balanceBox = ""
    if(balance){
      balanceBox = (
        <div>
          {balance}
        </div>
      )
    }else{
      balanceBox = (
        <div>
          Loading...
        </div>
      )
    }

    ////////////////////////////render
    return (
      <div className="App">
        {accountSelect}
        {balanceBox}
      </div>
    );
  }
}
export default App;
