import * as React from "react";
import * as ReactDOM from "react-dom";
import { Manager, Reference, Popper } from "react-popper";
import { TrashIcon } from "../Icons";
import { popperPortal } from "../PopperPortal";
import { inputStyle, popperStyle } from "../Style";
import { CommonProp, ValueLabelModel } from "../models";
import { FixedSizeList as List } from 'react-window';

export enum ListType {
	unselected,
	selected
}

interface Props extends CommonProp {

}

interface States {
	showLists: boolean;
	acvtiveUnselectedItem: number;
	acvtiveSelectedItem: number;
	currentList: ListType;
	unSelectedList: ValueLabelModel[];

}

export default class MultipleSelect extends React.Component<Props, States> {
	static defaultProps: Partial<Props> = {
		placement: "bottom-end",
		theme: "default"
	};
	static getDerivedStateFromProps(props: Props, state: States) {
		return {
			...state,
			unSelectedList: props.options
				.filter(u => !props.selectedOptions.find(s => u.value === s.value))

		}
	}
	inputRef: React.RefObject<HTMLInputElement> = React.createRef();
	scheduleUpdate: () => void;
	constructor(props: Props) {
		super(props);
		const isAllSelected = props.selectedOptions.length === props.options.length
		this.state = {
			showLists: false,
			acvtiveUnselectedItem: isAllSelected ? -1 : 0,
			acvtiveSelectedItem: isAllSelected ? 0 : -1,
			unSelectedList: props.options,
			currentList: isAllSelected ? ListType.selected : ListType.unselected,
		};
	}

	handleClickOutside = (e: any) => {
		if ((e.target).closest("#popper-portal")) {
			return;
		}

		if (this.inputRef.current) {
			this.inputRef.current.value = "";
		}

		if (this.state.showLists) {
			this.setState({ showLists: false });
		}
	}

	onSelectItem = (selectedIndex: number) => {
		let selectedOptions = [...this.props.selectedOptions];
		selectedOptions.push(this.props.options.filter(u => !selectedOptions.find(s => u.value === s.value))[selectedIndex]);
		this.props.onChange(selectedOptions);
		// @ts-ignore
		this.inputRef.current.focus();
		this.setState({ acvtiveUnselectedItem: 0 });
		setTimeout(() => {
			this.scheduleUpdate();
		}, 10);
	}

	onDeselectItem = (unSelectedIndex: number) => {
		let selectedOptions = [...this.props.selectedOptions];
		selectedOptions.splice(unSelectedIndex, 1);
		this.props.onChange(selectedOptions);
		if (selectedOptions.length === 0) {
			this.onBlur();
		}
		this.setState(
			{
				acvtiveSelectedItem: 0,
				currentList: selectedOptions.length === 0 ? ListType.unselected : this.state.currentList
			}
		);
		// if (this.scheduleUpdate) this.scheduleUpdate();
	}

	onDeselectAll = () => {
		this.props.onChange([]);
		this.setState({ currentList: ListType.unselected, acvtiveSelectedItem: 0 });
		if (this.scheduleUpdate) { this.scheduleUpdate(); }
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
		this.inputRef.current.value = "";
		if (onBlur) {
			onBlur();
		}
	}

	handleKeyPress = (e: any) => {
		const { selectedOptions, options } = this.props;
		const { currentList, acvtiveSelectedItem, acvtiveUnselectedItem, showLists } = this.state;
		if (!showLists) {
			return;
		}

		let list;
		if (currentList === ListType.unselected) {
			list = document.querySelector(".multiple-select_list--unselected--virutual") as HTMLElement;
		} else {
			list = document.querySelector(".multiple-select_list--selected--virutual") as HTMLElement;
		}
		const activeItem = list.querySelector(".js-active") as HTMLElement;
		switch (e.key) {
			case "Enter":
				if (currentList === ListType.unselected) {
					this.onSelectItem(acvtiveUnselectedItem);
				} else {
					this.onDeselectItem(acvtiveSelectedItem);
				}
				break;

			case "ArrowUp":
				list.scrollTop = activeItem.offsetTop;
				if (currentList === ListType.unselected && acvtiveUnselectedItem > 0) {
					this.setState({ acvtiveUnselectedItem: acvtiveUnselectedItem - 1 });
				} else if (acvtiveSelectedItem > 0) {
					this.setState({ acvtiveSelectedItem: acvtiveSelectedItem - 1 });
				}
				break;

			case "ArrowDown":
				list.scrollTop = activeItem.offsetTop;
				if (
					currentList === ListType.unselected && (acvtiveUnselectedItem + 1) < options
						.filter(u => !selectedOptions.find(s => u.value === s.value)).length
				) {
					this.setState({ acvtiveUnselectedItem: acvtiveUnselectedItem + 1 });
				} else if (currentList === ListType.selected && (acvtiveSelectedItem + 1) < selectedOptions.length) {
					this.setState({ acvtiveSelectedItem: acvtiveSelectedItem + 1 });
				}
				break;

			case "ArrowRight":
				if (selectedOptions.length > 0 && currentList === ListType.unselected) {
					this.setState({ currentList: ListType.selected, acvtiveSelectedItem: 0, acvtiveUnselectedItem: 1 });
				}
				break;

			case "ArrowLeft":
				if (options
					.filter(u => !selectedOptions.find(s => u.value === s.value)).length > 0 && currentList === ListType.selected) {
					this.setState({ currentList: ListType.unselected, acvtiveSelectedItem: -1, acvtiveUnselectedItem: 0 });
				}
				break;

			case "Escape":
				this.setState({ showLists: false });
				break;
		}
	}

	componentDidMount() {
		window.addEventListener("keydown", this.handleKeyPress);
	}

	componentWillUnmount() {
		window.removeEventListener("keydown", this.handleKeyPress);
	}

	refrenceClickHandler = () => {
		if (this.scheduleUpdate) { this.scheduleUpdate(); }
	}

	unSelectedRow = ({ index, style }: { index: number, style: any }) => {
		const { renderUnSelectedOption } = this.props;
		const { currentList, acvtiveUnselectedItem, unSelectedList } = this.state;
		return (
			<div
				style={style}
				key={index}
				className={
					"multiple-select_list_item" + (currentList === ListType.unselected && acvtiveUnselectedItem === index ? " js-active" : "")
				}>
				<li
					onClick={() => this.onSelectItem(index)}

					role="option"

				>
					{renderUnSelectedOption ? renderUnSelectedOption(unSelectedList[index]) : <span>{unSelectedList[index].label}</span>}
				</li>
			</div>
		);
	}

	selectedRow = ({ index, style }: { index: number, style: any }) => {
		const { renderSelectedOption, selectedOptions } = this.props;
		const { currentList, acvtiveSelectedItem } = this.state;
		return (

			<div
				style={style}
				key={index}
				className={"multiple-select_list_item" + (currentList === ListType.selected && acvtiveSelectedItem === index ? " js-active" : "")}
			>
				<li

					onClick={() => this.onDeselectItem(index)}
				>
					{renderSelectedOption ? renderSelectedOption(selectedOptions[index]) : <React.Fragment><span>{selectedOptions[index].label}</span><TrashIcon /></React.Fragment >}
				</li>
			</div>
		);
	}

	render() {
		const { onInputChange, selectedOptions, popperClassName, addable, theme } = this.props;
		const { showLists } = this.state;
		// console.log(acvtiveUnselectedItem);
		const unSelectedList = (
			<div
				className={"multiple-select_list multiple-select_list--unselected" + (addable ? " js-addable" : "")}
				role="listbox"
				aria-labelledby="ss_elem"
			>
				<List
					height={200}
					itemCount={this.state.unSelectedList.length}
					itemSize={40}
					width={240}
					style={{ overflowY: 'auto', overflowX: 'initial' }}
					className="multiple-select_list--unselected--virutual"
				>
					{this.unSelectedRow}
				</List>
			</div>
		);
		const selectedList = (
			<div
				className={"multiple-select_list multiple-select_list--selected"}
			>
				<List
					height={200}
					itemCount={this.props.selectedOptions.length}
					itemSize={40}
					width={240}
					style={{ overflowY: 'auto', overflowX: 'initial' }}
					className="multiple-select_list--selected--virutual"
				>
					{this.selectedRow}
				</List>
			</div>
		);
		return (
			<div className={"multiple-select" + ` ${inputStyle}`}>
				<div className="multiple-select_summary-wrapper" hidden={showLists || selectedOptions.length < 1}>
					<span className="multiple-select_summary" onClick={this.onFocus}>
						{selectedOptions.length > 0 ? selectedOptions[0].label : ""}
						{selectedOptions.length > 1 && "..."}
					</span>
				</div>
				<Manager>
					<Reference>
						{({ ref }) => (
							<div className="multiple-select_trigger_wrapper" ref={ref}>
								<input
									className="multiple-select_trigger"
									onChange={e => {
										if (onInputChange) {
											onInputChange(e.target.value);
										}
									}}
									onFocus={this.onFocus}
									onBlur={this.onBlur}
									onClick={this.refrenceClickHandler}
									ref={
										this.inputRef
									}
								/>
							</div>
						)}
					</Reference>
					{ReactDOM.createPortal(
						<Popper modifiers={{ computeStyle: { gpuAcceleration: false } }} placement={this.props.placement} positionFixed={false}>
							{({ ref, style, placement, scheduleUpdate }) => {
								this.scheduleUpdate = scheduleUpdate;
								return (
									showLists && (
										<div
											className={`${popperStyle}`} >
											<div
												ref={ref}
												style={style}
												data-placement={placement}
												className={"multiple-select_lists" + (popperClassName ? " " + popperClassName : "") + (" " + theme)}
											>
												<div className="multiple-select_lists_inner">
													{unSelectedList}
													{!!selectedOptions.length && selectedList}
												</div>
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
