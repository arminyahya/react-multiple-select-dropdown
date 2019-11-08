import React, { Component } from 'react';
import MultipleSelect from 'react-multiple-select-dropdown';
import { hot } from 'react-hot-loader/root';
import './App.css';

function array(arraylength) {
	var arraysum = 0;
	var array1 = new Array();
	for(let i=1; i<=arraylength; i++) {
	   array1.push({value: i, label: i.toString()});
	}
	return array1;
 }

class App extends Component {
	state = {
		selectedItems: [],
		unSelectedItems:array(10000)
	};

	onChange = selectedItems => {
		this.setState({ selectedItems: selectedItems });
	};

	render() {
		const { selectedItems, unSelectedItems } = this.state;
		return (
			<div>
				<MultipleSelect
					selectedOptions={selectedItems}
					options={unSelectedItems}
					onChange={this.onChange}
					direction={'ltr'}
					theme={'default'}
					breackPoint="575"
					// renderUnSelectedItem={item => <div className="custome unselected">{item.label} </div>}
					// renderSelectedItem={item => <div className="custome selected">{item.label} </div>}
				/>
			</div>
		);
	}
}

export default hot(App);
