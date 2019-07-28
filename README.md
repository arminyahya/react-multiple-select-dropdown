# react-multiple-select-dropdown
![](/preview/MultiSelect.gif)

[![NPM](https://img.shields.io/npm/v/react-multiple-select-dropdown.svg)](https://www.npmjs.com/package/react-multiple-select-dropdown) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-multiple-select-dropdown
```



## Usage
```jsx
import React, { Component } from 'react'
import MultipleSelect from 'react-multiple-select-dropdown';

class YourWrapperComponent extends Component {
  state = {
    selectedOptions: [],
    Options: [
    { value: 1, label: 'react' },
    { value: 2, label: 'reactnative' },
    { value: 3, label: 'nodejs' },
    { value: 4, label: 'redux' },
    { value: 5, label: 'mobx' }
    ]
  }

  onChange = (selectedOptions) => {
    this.setState({ selectedOptions: selectedOptions });


  render() {
  const { selectedItems, unSelectedItems } = this.state;
  return (
    <div>
      <MultipleSelect
        selectedOptions={selectedItems}
        Options={unSelectedItems}
        onChange={this.onChange}
      />
    </div>
);
```
to see props go to [docs](https://reactmultipleselectdropdown.netlify.com/docs)
## License

MIT © [arminyahya](https://github.com/arminyahya)
