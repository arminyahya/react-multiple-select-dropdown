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
Classes
---
You can use prefixClassName prop to put your className instead of multiple-select in below

multiple-select <br />
multiple-select_lists<br />
multiple-select_lists_inner<br />
multiple-select_list<br />
multiple-select_list-selected<br />
multiple-select_list-unselected<br />
multiple-select_list_item<br />
multiple-select_summary-wrapper<br />
multiple-select_summary<br />
multiple-select_trigger_wrapper<br />
multiple-select_trigger<br />
multiple-select_list_item_cross-icon<br />
```

```
API
---

| Name                    | Type                                 | Default         | Required |
|-------------------------|--------------------------------------|-----------------|----------|
| prefixClassName         | string                               | multiple-select | false    |
| selectedItems           | {value: number,label: string}[]      | []              | true     |
| unSelectedItems         | {value: number,label: string}[]      | []              | true     |
| onInputChange           | (text) => void                       |                 | false     |
| onChange                | (value: number,label: string)=> void |                 | true     |
| onFocus                 | () => void                           |                 | false    |
| onBlur                  | () => void                           |                 | false    |


## License

MIT © [arminyahya](https://github.com/arminyahya)
