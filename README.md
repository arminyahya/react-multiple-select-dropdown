# react-multiple-select-dropdown(tiny now!!)
![](/preview/introduction-1.jpg)
![](/preview/introduction-2.jpg)

[![NPM](https://img.shields.io/npm/v/react-multiple-select-dropdown.svg)](https://www.npmjs.com/package/react-multiple-select-dropdown) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-multiple-select-dropdown
```



## Usage
```jsx
import React, { Component } from 'react'
import MultipleSelect from 'react-multiple-select-dropdown';
import 'react-multiple-select-dropdown/dist/index.css';

class YourWrapperComponent extends Component {
  // drop your items here.it could be thousands(we use virtual list so there is no problem)
  state = {
    selectedOptions: [],
    options: [
    { value: 1, label: 'react' },
    { value: 2, label: 'reactnative' },
    { value: 3, label: 'nodejs' },
    { value: 4, label: 'redux' },
    { value: 5, label: 'mobx' }
    ]
  }

  onChange = (selectedOptions) => {
    this.setState({ selectedOptions: selectedOptions });
  }

  render() {
  const { selectedItems, options } = this.state;
  return (
    <div>
      <MultipleSelect
        selectedOptions={selectedItems}
        options={options}
        onChange={this.onChange}
      />
    </div>
);
}
```
to see props go to [docs](https://reactmultipleselectdropdown.netlify.com/docs)

feel free to report bugs and request feature

## License

MIT © [arminyahya](https://github.com/arminyahya)
