
import React, { Component } from 'react';
import { Select } from 'antd';
const Option = Select.Option;





function handleChange(value) {
  this.props.setProvider(value)
}

class ProviderSelect extends Component {

  constructor(props) {
    super(props);
    this.state = { provider: null};
  }

  render() {
    console.log("AS",this.props.concurrence.accounts)
    return (
      <div>
        <Select
         showSearch
         style={{ width: 200 }}
         placeholder="Select a provider"
         optionFilterProp="children"
         onChange={handleChange.bind(this)}
         filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
       >
         <Option value="metamask">metamask</Option>
         <Option value="localhost">localhost</Option>
       </Select>
      </div>
    );
  }
}

export default ProviderSelect;
