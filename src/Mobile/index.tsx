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
		let selectedOptions: ValueLabelModel[] = [...this.props.selectedOptions];
		selectedOptions.push(this.props.options.filter(u => !selectedOptions.find(s => u.value === s.value))[selectedIndex]);
		this.props.onChange(selectedOptions);
		// @ts-ignore
		this.inputRef.current.focus();
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
		const { onInputChange, selectedOptions, options, popperClassName,
			addable, addText, onAddNewItem, selectedTabLabel, unselectedTabLabel } = this.props;
		const { showLists, currentTab } = this.state;
		const unSelectedList = (
			<div className={"multiple-select_list multiple-select_list--unselected" + (addable ? " js-addable" : "")}>
				{addable && (<div
					key={-1}
					onClick={() => { if (onAddNewItem) { onAddNewItem(); } }}
					className={
						"multiple-select_list_item-add"
					}
				>
					<span>{addText}</span><CircleAddIcon />
				</div>)}
				{options
					.filter(u => !selectedOptions.find(s => u.value === s.value))
					.map((i, index) => (
						<div
							key={index}
							onClick={() => this.onSelectItem(index)}
							className={
								"multiple-select_list_item"
							}
						>
							<span>{i.label}</span>
						</div>
					))}
			</div>
		);
		const selectedList = (
			<div className={"multiple-select_list multiple-select_list--selected"}>

				{selectedOptions.map((i, index) => (
					<div
						key={index}
						className={"multiple-select_list_item"}
						onClick={() => this.onDeselectItem(index)}
					>
						<span>{i.label}</span>
						<TrashIcon />
					</div>
				))}
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
										<div className={`${popperStyle}`}>
											<div
												ref={ref}
												style={style}
												data-placement={placement}
												className={"multiple-select_lists" + (popperClassName ? " " + popperClassName : "")}
											>
												<div className="multiple-select_tab_header">
													<div
														className={"multiple-select_tab_header_item" + (currentTab === "unselected" ? " js-active" : "")}
														onClick={() => { this.setState({ currentTab: "unselected" }); }}
													>
														<span>
															{unselectedTabLabel}
														</span>
													</div>
													<div
														className={"multiple-select_tab_header_item" + (currentTab === "selected" ? " js-active" : "")}
														onClick={() => { this.setState({ currentTab: "selected" }); }}
													>
														<span>
															{selectedTabLabel}
														</span>
													</div>
												</div>
												{currentTab === "unselected" ?
													<div className={"multiple-select_tab_inner"}>
														{unSelectedList}
													</div>
													: <div className={"multiple-select_tab_inner"}>
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