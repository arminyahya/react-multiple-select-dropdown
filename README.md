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
    selectedItems: [],
    unSelectedItems: [
      { value: 1, label: 'react' },
      { value: 2, label: 'reactnative' },
      { value: 3, label: 'nodejs' },
      { value: 4, label: 'redux' },
      { value: 5, label: 'mobx' }
    ]
  }

  onChange = (selectedItems) => {
    this.setState({ selectedItems: selectedItems });
  }

  render() {
    const { selectedItems, unSelectedItems } = this.state;
    return (
      <div>
        <MultipleSelect
          selectedItems={selectedItems}
          unSelectedItems={unSelectedItems}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

```
API
---

| Name                    | Type                                 | Default   | Required |
|-------------------------|--------------------------------------|-----------|----------|
| popperClassName         | string                               | ''        | false    |
| selectedItems           | {value: number,label: string}[]      | []        | true     |
| unSelectedItems         | {value: number,label: string}[]      | []        | true     |
| onInputChange           | (text) => void                       |           | false    |
| onChange                | (value: number,label: string)=> void |           | true     |
| onFocus                 | () => void                           | undefined | false    |
| onBlur                  | () => void                           | undefined | false    |


## License

MIT © [arminyahya](https://github.com/arminyahya)
