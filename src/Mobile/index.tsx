import * as React from "react";
import * as ReactDOM from "react-dom";
import { Manager, Reference, Popper } from "react-popper";
import { popperPortal } from "../PopperPortal";
import { CircleAddIcon, TrashIcon } from "../Icons";
import { inputStyle, popperStyle } from "../Style";
import { ValueLabelModel, CommonProp } from "../models";


interface Props extends CommonProp {
}

interface States {
	showLists: boolean;
	currentTab: string;
}

export default class MultipleSelect extends React.Component<Props, States> {
	static defaultProps: Partial<Props> = {
		selectedTabLabel: "selected",
		unselectedTabLabel: "unselected",
		placement: "bottom-end"
	};
	inputRef: React.RefObject<HTMLInputElement> = React.createRef();
	scheduleUpdate: () => void;
	constructor(props: Props) {
		super(props);
		this.state = {
			showLists: false,
			currentTab: "unselected"
		};
	}

	handleClickOutside = (e: any) => {
		if ((e.target as HTMLElement).closest("#popper-portal")) {
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
		this.scheduleUpdate();
		let selectedItems: ValueLabelModel[] = [...this.props.selectedItems];
		selectedItems.push(this.props.unSelectedItems.filter(u => !selectedItems.find(s => u.value === s.value))[selectedIndex]);
		this.props.onChange(selectedItems);
		// @ts-ignore
		this.inputRef.current.focus();
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
		// if (this.scheduleUpdate) this.scheduleUpdate();
	}

	onDeselectAll = () => {
		this.props.onChange([]);
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
		// this.setState({ showLists: false });
		// @ts-ignore

		this.inputRef.current.value = "";
		if (onBlur) {
			onBlur();
		}
	}

	refrenceClickHandler = () => {
		if (this.scheduleUpdate) { this.scheduleUpdate(); }
	}

	render() {
		const { onInputChange, selectedItems, unSelectedItems, popperClassName,
			addable, addText, onAddNewItem, selectedTabLabel, unselectedTabLabel } = this.props;
		const { showLists, currentTab } = this.state;
		const unSelectedList = (
			<div className={"y-multiple-select_list y-multiple-select_list--unselected" + (addable ? " js-addable" : "")}>
				{addable && (<div
					key={-1}
					onClick={() => { if (onAddNewItem) { onAddNewItem(); } }}
					className={
						"y-multiple-select_list_item-add"
					}
				>
					<span>{addText}</span><CircleAddIcon />
				</div>)}
				{unSelectedItems
					.filter(u => !selectedItems.find(s => u.value === s.value))
					.map((i, index) => (
						<div
							key={index}
							onClick={() => this.onSelectItem(index)}
							className={
								"y-multiple-select_list_item"
							}
						>
							<span>{i.label}</span>
						</div>
					))}
			</div>
		);
		const selectedList = (
			<div className={"y-multiple-select_list y-multiple-select_list--selected" + (selectedItems.length > 0 ? " js-show-remove-all" : "")}>
				{!!selectedItems.length &&
					<div
						key={-1}
						onClick={() => { this.onDeselectAll(); }}
						className={
							"y-multiple-select_list_item-remove-all"
						}
					>
						<span>remove all</span> <TrashIcon />
					</div>
				}
				{selectedItems.map((i, index) => (
					<div
						key={index}
						className={"y-multiple-select_list_item"}
						onClick={() => this.onDeselectItem(index)}
					>
						<span>{i.label}</span>
						<TrashIcon />
					</div>
				))}
			</div>
		);
		return (
			<div className={"y-multiple-select" + ` ${inputStyle}`}>
				<div className="y-multiple-select_summary-wrapper" hidden={showLists || selectedItems.length < 1}>
					<span className="y-multiple-select_summary" onClick={this.onFocus}>
						{selectedItems.length > 0 ? selectedItems[0].label : ""}
						{selectedItems.length > 1 && "..."}
					</span>
				</div>
				<Manager>
					<Reference>
						{({ ref }) => (
							<div className="y-multiple-select_trigger_wrapper" ref={ref}>
								<input
									className="y-multiple-select_trigger"
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
										<div className={`${popperStyle}`}>
											<div
												ref={ref}
												style={style}
												data-placement={placement}
												className={"y-multiple-select_lists" + (popperClassName ? " " + popperClassName : "")}
											>
												<div className="y-multiple-select_tab_header">
													<div
														className={"y-multiple-select_tab_header_item" + (currentTab === "unselected" ? " js-active" : "")}
														onClick={() => { this.setState({ currentTab: "unselected" }); }}
													>
														<span>
															{unselectedTabLabel}
														</span>
													</div>
													<div
														className={"y-multiple-select_tab_header_item" + (currentTab === "selected" ? " js-active" : "")}
														onClick={() => { this.setState({ currentTab: "selected" }); }}
													>
														<span>
															{selectedTabLabel}
														</span>
													</div>
												</div>
												{currentTab === "unselected" ?
													<div className={"y-multiple-select_tab_inner"}>
														{unSelectedList}
													</div>
													: <div className={"y-multiple-select_tab_inner"}>
														{selectedList}
													</div>}
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