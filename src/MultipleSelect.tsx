import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Manager, Reference, Popper } from 'react-popper';
import { popperPortal } from './PopperPortal';
import { inputStyle, popperStyle } from './Style';


interface ValueLabelModel {
	value: any;
	label: string;
}

interface Props {
	prefixClassName?: string;
	selectedItems: ValueLabelModel[];
	unSelectedItems: ValueLabelModel[];
	onInputChange?: (val: string) => void;
	onChange: (selectedItems: ValueLabelModel[]) => void;
	onFocus?: () => void;
	onBlur?: () => void;
	isRequired?: boolean;
}

interface State {
	showLists: boolean;
	acvtiveUnselectedItem: number;
	acvtiveSelectedItem: number;
	currentList: number;
}

class MultipleSelect extends React.Component<Props, State> {
	inputRef: React.RefObject<HTMLInputElement> = React.createRef();
	scheduleUpdate: () => void;
	static defaultProps: Partial<Props> = {
		prefixClassName: 'multiple-select'
	}
	constructor(props: Props) {
		super(props);
		this.state = {
			showLists: true,
			acvtiveUnselectedItem: 0,
			acvtiveSelectedItem: -1,
			currentList: 1
		};
	}

	handleClickOutside = (e: any) => {
		if ((e.target).closest('#popper-portal')) {
			return;
		}

		if (this.inputRef.current) {
			this.inputRef.current.value = '';
		}

		if (this.state.showLists) {
			this.setState({ showLists: false });
		}
	}

	onSelectItem = (selectedIndex: number) => {
		let selectedItems = [...this.props.selectedItems];
		selectedItems.push(this.props.unSelectedItems.filter(u => !selectedItems.find(s => u.value === s.value))[selectedIndex]);
		this.props.onChange(selectedItems);
		// @ts-ignore
		this.inputRef.current.focus();
		this.setState({ currentList: 2, acvtiveUnselectedItem: 0 });
		setTimeout(() => {
			this.scheduleUpdate();
		}, 10);
	}

	onDeselectItem = (unSelectedIndex: number) => {
		let selectedItems = [...this.props.selectedItems];
		selectedItems.splice(unSelectedIndex, 1);
		this.props.onChange(selectedItems);
		if (selectedItems.length === 0) {
			this.onBlur();
		}
		this.setState({ currentList: 1, acvtiveSelectedItem: 0 });
		// if (this.scheduleUpdate) this.scheduleUpdate();
	}

	onFocus = () => {
		const { onFocus } = this.props;
		// @ts-ignore
		this.inputRef.current.focus();
		this.setState({ showLists: true });
		if (onFocus) {
			onFocus();
		}
	}

	onBlur = () => {
		const { onBlur } = this.props;
		// @ts-ignore
		this.inputRef.current.value = '';
		if (onBlur) {
			onBlur();
		}
	}

	handleKeyPress = (e: KeyboardEvent) => {
		const { selectedItems, unSelectedItems } = this.props;
		const { currentList, acvtiveSelectedItem, acvtiveUnselectedItem, showLists } = this.state;
		if (!showLists) {
			return;
		}
		if (e.key === 'Escape' || e.keyCode === 9) {
			this.setState({ showLists: false });
		} else if (e.key === 'ArrowUp') {
			if (currentList === 1 && acvtiveUnselectedItem > 0) {
				this.setState({ acvtiveUnselectedItem: acvtiveUnselectedItem - 1 });
			} else if (acvtiveSelectedItem > 0) {
				this.setState({ acvtiveSelectedItem: acvtiveSelectedItem - 1 });
			}
		} else if (e.key === 'ArrowDown') {
			if (currentList === 1 && acvtiveUnselectedItem < unSelectedItems.length) {
				this.setState({ acvtiveUnselectedItem: acvtiveUnselectedItem + 1 });
			} else if (acvtiveSelectedItem < selectedItems.length) {
				this.setState({ acvtiveSelectedItem: acvtiveSelectedItem + 1 });
			}
		} else if (e.key === 'ArrowLeft') {
			if (currentList === 2) {
				this.setState({ currentList: 1, acvtiveSelectedItem: 0, acvtiveUnselectedItem: 0 });
			}
		} else if (e.key === 'ArrowRight') {
			if (currentList === 1) {
				this.setState({ currentList: 2, acvtiveUnselectedItem: 0, acvtiveSelectedItem: 0 });
			}
		} else if (e.key === 'Enter') {
			if (currentList === 1) {
				this.onSelectItem(acvtiveUnselectedItem);
			} else {
				this.onDeselectItem(acvtiveSelectedItem);
			}
		}
	}

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyPress);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyPress);
	}

	refrenceClickHandler = () => {
		if (this.scheduleUpdate) this.scheduleUpdate();
	}

	render() {
		const { onInputChange, selectedItems, unSelectedItems, prefixClassName } = this.props;
		const { showLists, currentList, acvtiveSelectedItem, acvtiveUnselectedItem } = this.state;
		const unSelectedList = (
			<div className={`${prefixClassName}_list ${prefixClassName}_list-unselected`}>
				{unSelectedItems
					.filter(u => !selectedItems.find(s => u.value === s.value))
					.map((i, index) => (
						<div
							key={index}
							onClick={() => this.onSelectItem(index)}
							className={
								`${prefixClassName}_list_item` + (currentList === 1 && acvtiveUnselectedItem === index ? ' js-active' : '')
							}
						>
							<span>{i.label}</span>
						</div>
					))}
			</div>
		);
		const selectedList = (
			<div className={`${prefixClassName}_list ${prefixClassName}_list-selected`}>
				{selectedItems.map((i, index) => (
					<div
						key={index}
						className={`${prefixClassName}_list_item` + (currentList === 2 && acvtiveSelectedItem === index ? ' js-active' : '')}
					>
						<span>{i.label}</span>
						<i className={`${prefixClassName}_list_item_cross-icon`} onClick={() => this.onDeselectItem(index)}>
							&#10006;
						</i>
					</div>
				))}
			</div>
		);
		return (
			<div className={`${prefixClassName}` + ` ${inputStyle}`}>
				<div className={`${prefixClassName}_summary-wrapper`} hidden={showLists || selectedItems.length < 1}>
					<span className={`${prefixClassName}_summary`} onClick={this.onFocus}>
						{selectedItems.length > 0 ? selectedItems[0].label : ''}
						{selectedItems.length > 1 && '...'}
					</span>
				</div>
				<Manager>
					<Reference>
						{({ ref }) => (
							<div className={`${prefixClassName}_trigger_wrapper`} ref={ref}>
								<input
									className={`${prefixClassName}_trigger`}
									onChange={e => {
										if (onInputChange) {
											onInputChange(e.target.value);
										}
									}}
									onFocus={this.onFocus}
									onBlur={this.onBlur}
									onClick={this.refrenceClickHandler}
									ref={this.inputRef}
								/>
							</div>
						)}
					</Reference>
					{ReactDOM.createPortal(
						<Popper modifiers={{ computeStyle: { gpuAcceleration: false } }} placement="bottom-start" positionFixed={false} >
							{({ ref, style, placement, scheduleUpdate }) => {
								this.scheduleUpdate = scheduleUpdate;
								return (
									showLists && (
										<div
											ref={ref}
											style={style}
											data-placement={placement}
											className={`${prefixClassName}_lists` + ` ${popperStyle}`}
										>
											<div className={`${prefixClassName}_lists_inner`}>
												{unSelectedList}
												{!!selectedItems.length && selectedList}
											</div>
										</div>
									)
								);
							}}
						</Popper>,
						popperPortal
					)}
				</Manager>
			</div>
		);
	}
}

export default MultipleSelect;