import React, { Component } from 'react';
import MultipleSelect from 'react-multiple-select-dropdown';
import { hot } from 'react-hot-loader/root';
import './App.css';

class App extends Component {
	state = {
		selectedItems: [],
		unSelectedItems: [
			{ value: 1, label: 'react' },
			{ value: 2, label: 'reactnative' },
			{ value: 3, label: 'nodejs' },
			{ value: 4, label: 'redux' },
			{ value: 5, label: 'mobx' }
		]
	};

	onChange = selectedItems => {
		this.setState({ selectedItems: selectedItems });
	};

	render() {
		const { selectedItems, unSelectedItems } = this.state;
		return (
			<div>
				<MultipleSelect
					selectedItems={selectedItems}
					unSelectedItems={unSelectedItems}
					onChange={this.onChange}
					direction={'rtl'}
					theme={'dark'}
					// renderUnSelectedItem={item => <div className="custome unselected">{item.label} </div>}
					// renderSelectedItem={item => <div className="custome selected">{item.label} </div>}
				/>
			</div>
		);
	}
}

export default hot(App);
