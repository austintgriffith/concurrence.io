
import React, { Component } from 'react';
import { Select } from 'antd';
const Option = Select.Option;

class AccountSelect extends Component {

  render() {
    let accountOptions = this.props.accounts.map((account)=>{
      return (
        <Option key={account} value={account}>{account}</Option>
      )
    })
    return (
      <div className="AccountSelect">
        <Select
         showSearch
         style={{ width: 200 }}
         placeholder="Select an account"
         onChange={this.props.accountSelect}
         filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
       >
          {accountOptions}
       </Select>
      </div>
    );
  }
}

export default AccountSelect;
