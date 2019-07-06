import * as React from "react";
import * as ReactDOM from "react-dom";
import { Manager, Reference, Popper } from "react-popper";
import { TrashIcon } from "../Icons";
import { popperPortal } from "../PopperPortal";
import { inputStyle, popperStyle } from "../Style";
import { CommonProp } from "../models";

enum ListType {
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
}

export default class MultipleSelect extends React.Component<Props, States> {
	static defaultProps: Partial<Props> = {
		placement: "bottom-end",
		theme: "default"
	};

	inputRef: React.RefObject<HTMLInputElement> = React.createRef();
	scheduleUpdate: () => void;
	constructor(props: Props) {
		super(props);
		this.state = {
			showLists: false,
			acvtiveUnselectedItem: 0,
			acvtiveSelectedItem: -1,
			currentList: ListType.unselected
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
		let selectedItems = [...this.props.selectedItems];
		selectedItems.push(this.props.unSelectedItems.filter(u => !selectedItems.find(s => u.value === s.value))[selectedIndex]);
		this.props.onChange(selectedItems);
		// @ts-ignore
		this.inputRef.current.focus();
		this.setState({ acvtiveUnselectedItem: 0 });
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
		this.setState(
			{
				acvtiveSelectedItem: 0,
				currentList: selectedItems.length === 0 ? ListType.unselected : this.state.currentList
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
		const { selectedItems, unSelectedItems } = this.props;
		const { currentList, acvtiveSelectedItem, acvtiveUnselectedItem, showLists } = this.state;
		if (!showLists) {
			return;
		}

		let list;
		if (currentList === ListType.unselected) {
			list = document.querySelector(".multiple-select_list--unselected") as HTMLElement;
		} else {
			list = document.querySelector(".multiple-select_list--selected") as HTMLElement;
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
					currentList === ListType.unselected && (acvtiveUnselectedItem + 1) < unSelectedItems
						.filter(u => !selectedItems.find(s => u.value === s.value)).length
				) {
					this.setState({ acvtiveUnselectedItem: acvtiveUnselectedItem + 1 });
				} else if (currentList === ListType.selected && (acvtiveSelectedItem + 1) < selectedItems.length) {
					this.setState({ acvtiveSelectedItem: acvtiveSelectedItem + 1 });
				}
				break;

			case "ArrowRight":
				if (selectedItems.length > 0 && currentList === ListType.unselected) {
					this.setState({ currentList: ListType.selected, acvtiveSelectedItem: 0, acvtiveUnselectedItem: 1 });
				}
				break;

			case "ArrowLeft":
				if (unSelectedItems
					.filter(u => !selectedItems.find(s => u.value === s.value)).length > 0 && currentList === ListType.selected) {
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

	render() {
		const { onInputChange, selectedItems, unSelectedItems, popperClassName, addable, theme, renderUnSelectedItem, renderSelectedItem } = this.props;
		const { showLists, currentList, acvtiveSelectedItem, acvtiveUnselectedItem } = this.state;
		// console.log(acvtiveUnselectedItem);
		const unSelectedList = (
			<div
				className={"multiple-select_list multiple-select_list--unselected" + (addable ? " js-addable" : "")}
				role="listbox"
				aria-labelledby="ss_elem"
			>
				{unSelectedItems
					.filter(u => !selectedItems.find(s => u.value === s.value))
					.map((i, index) => {
						return (
							<li
								key={index}
								onClick={() => this.onSelectItem(index)}
								className={
									"multiple-select_list_item" + (currentList === ListType.unselected && acvtiveUnselectedItem === index ? " js-active" : "")
								}
								role="option"
							>
								{renderUnSelectedItem ? renderUnSelectedItem(i) : <span>{i.label}</span>}
							</li>
						);
					})}
			</div>
		);
		const selectedList = (
			<div
				className={"multiple-select_list multiple-select_list--selected"}
			>
				{selectedItems.map((i, index) => (
					<div
						key={index}
						className={"multiple-select_list_item" + (currentList === ListType.selected && acvtiveSelectedItem === index ? " js-active" : "")}
						onClick={() => this.onDeselectItem(index)}
					>
						{renderSelectedItem ? renderSelectedItem(i) : <React.Fragment><span>{i.label}</span> <TrashIcon /></React.Fragment >}

					</div>
				))}
			</div>
		);
		return (
			<div className={"multiple-select" + ` ${inputStyle}`}>
				<div className="multiple-select_summary-wrapper" hidden={showLists || selectedItems.length < 1}>
					<span className="multiple-select_summary" onClick={this.onFocus}>
						{selectedItems.length > 0 ? selectedItems[0].label : ""}
						{selectedItems.length > 1 && "..."}
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
													{!!selectedItems.length && selectedList}
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
