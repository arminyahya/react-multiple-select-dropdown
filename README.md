# react-multiple-select-dropdown

# react-multiple-select-dropdown
![](/preview/MultiSelect.gif)

[![NPM](https://img.shields.io/npm/v/react-multiple-select-dropdown.svg)](https://www.npmjs.com/package/react-multiple-select-dropdown) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-multiple-select-dropdown
```



## Usage
```jsx
import React, { Component } from 'react';
import './MultipleSelect.sass';
import MultipleSelect from './components/MultipleSelect';

class YourWrapperComponent extends Component {
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

export default YourWrapperComponent;

```
API
---

| Name                    | Type                                 | Default   |
|-------------------------|--------------------------------------|-----------|
| popperClassName         | string                               | ''        |
| selectedItems           | {value: number,label: string}[]      | []        |
| unSelectedItems         | {value: number,label: string}[]      | []        |
| onInputChange           | (text) => void                       |           |
| onChange                | (value: number,label: string)=> void |           |
| onFocus                 | () => void                           | undefined |
| onBlur                  | () => void                           | undefined  |


## License

MIT © [arminyahya](https://github.com/arminyahya)
