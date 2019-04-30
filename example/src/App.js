import React, { Component } from 'react'

import MultipleSelect from 'react-multiple-select-dropdown'
import 'react-multiple-select-dropdown/src/MultipleSelect.css'
class App extends Component {
  state = {
    selectedItems: [],
    unSelectedItems: [
      {value: 1, label: 'react'},
      {value: 2, label: 'reactnative'},
      {value: 3, label: 'nodejs'},
      {value: 4, label :'redux'},
      {value: 5, label: 'mobx'}
    ]
  }
  
  render() {
    const { selectedItems, unSelectedItems } = this.state;
    return (
        <div>
          <MultipleSelect selectedItems={selectedItems} unSelectedItems={unSelectedItems} />
        </div>
    );
  }
}

export default App;