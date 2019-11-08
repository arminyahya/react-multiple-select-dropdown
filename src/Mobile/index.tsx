import * as React from "react";
import * as ReactDOM from "react-dom";
import { Manager, Reference, Popper } from "react-popper";
import { popperPortal } from "../PopperPortal";
import { TrashIcon } from "../Icons";
import { inputStyle, popperStyle } from "../Style";
import { ValueLabelModel, CommonProp } from "../models";
import { FixedSizeList as List } from 'react-window';

interface Props extends CommonProp {
}

interface States {
	showLists: boolean;
	currentTab: string;
	unSelectedList: ValueLabelModel[];
}

export default class MultipleSelect extends React.Component<Props, States> {
	static defaultProps: Partial<Props> = {
		selectedTabLabel: "selected",
		unselectedTabLabel: "unselected",
		placement: "bottom-end"
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
		this.state = {
			showLists: false,
			currentTab: "unselected",
			unSelectedList: props.options
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

	unSelectedRow = ({ index, style }: { index: number, style: any }) => {
		const { renderUnSelectedOption } = this.props;
		const { unSelectedList } = this.state;
		return (
			<div
				style={style}
				key={index}
				className={
					"multiple-select_list_item"}>
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
		return (

			<div
				style={style}
				key={index}
				className={"multiple-select_list_item"}
			>
				<li

					onClick={() => this.onDeselectItem(index)}
				>
					{renderSelectedOption ? renderSelectedOption(selectedOptions[index]) : <React.Fragment><span>{selectedOptions[index].label}</span><TrashIcon /></React.Fragment >}
				</li>
			</div>
		);
	}

	componentDidUpdate(prevProps: Props, prevState: States) {

		let xDown: number | null = null;
		let yDown: number | null = null;

		let timeout: any;
		let longtouch: boolean;
		let whereDidSwipe: 'right' | 'left' | 'didnot' = 'didnot';
		function getTouches(evt: any) {
			return evt.touches ||             // browser API
				evt.originalEvent.touches; // jQuery
		}

		function handleTouchStart(evt: any) {
			const firstTouch = getTouches(evt)[0];
			xDown = firstTouch.clientX;
			yDown = firstTouch.clientY;
			timeout = setTimeout(function () {
				longtouch = true;
			}, 100);
		};

		const handleToucEnd = () => {
			if (longtouch) {
				// It was a long touch.
				switch (whereDidSwipe) {
					case 'left':
						this.setState({ currentTab: 'selected' })
						whereDidSwipe = 'didnot';
						break;
					case 'right':
						this.setState({ currentTab: 'unselected' })
						whereDidSwipe = 'didnot';

						break;
					case 'didnot': ;
					default: ;
				}

			}
			longtouch = false;
			clearTimeout(timeout);
		};

		const handleTouchMove = (evt: any) => {
			if (!xDown || !yDown) {
				return;
			}

			let xUp = evt.touches[0].clientX;
			let yUp = evt.touches[0].clientY;

			let xDiff = xDown - xUp;
			let yDiff = yDown - yUp;

			if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/

				if (xDiff > 0) {
					/* left swipe */
					whereDidSwipe = 'left';

				} else {
					whereDidSwipe = 'right';

					/* right swipe */
				}
			}
			/* reset values */
			xDown = null;
			yDown = null;
		};

		const addEventListenersToUnselectedList = () => {
			// @ts-ignore
			document.querySelector(".multiple-select_list--unselected--virutual").addEventListener('touchstart', handleTouchStart, false);
			// @ts-ignore
			document.querySelector(".multiple-select_list--unselected--virutual").addEventListener('touchmove', handleTouchMove, false);

			// @ts-ignore
			document.querySelector(".multiple-select_list--unselected--virutual").addEventListener('touchend', handleToucEnd, false);

		}

		const addEventListenersToSelectedList = () => {
			// @ts-ignore
			document.querySelector(".multiple-select_list--selected--virutual").addEventListener('touchstart', handleTouchStart, false);
			// @ts-ignore
			document.querySelector(".multiple-select_list--selected--virutual").addEventListener('touchmove', handleTouchMove, false);

			// @ts-ignore
			document.querySelector(".multiple-select_list--selected--virutual").addEventListener('touchend', handleToucEnd, false);

		}

		// const removeEventListenersFromUnselectedList = () => {
		// 	// @ts-ignore
		// 	document.querySelector(".multiple-select_list--unselected--virutual").removeEventListener('touchstart', handleTouchStart, false);
		// 	// @ts-ignore
		// 	document.querySelector(".multiple-select_list--unselected--virutual").removeEventListener('touchmove', handleTouchMove, false);

		// 	// @ts-ignore
		// 	document.querySelector(".multiple-select_list--unselected--virutual").removeEventListener('touchend', handleToucEnd, false);

		// }

		// const removeEventListenersFromSelectedList = () => {
		// 	// @ts-ignore
		// 	document.querySelector(".multiple-select_list--selected--virutual").removeEventListener('touchstart', handleTouchStart, false);
		// 	// @ts-ignore
		// 	document.querySelector(".multiple-select_list--selected--virutual").removeEventListener('touchmove', handleTouchMove, false);

		// 	// @ts-ignore
		// 	document.querySelector(".multiple-select_list--selected--virutual").removeEventListener('touchend', handleToucEnd, false);

		// }

		// if (!this.state.showLists) {
		// 	removeEventListenersFromUnselectedList();
		// 	removeEventListenersFromSelectedList();
		// }

		if (this.state.showLists && prevState.showLists === false) {
			if (this.state.currentTab === 'selected') {
				addEventListenersToSelectedList();
			} else {
				addEventListenersToUnselectedList();

			}
		}


	}


	render() {
		const { onInputChange, selectedOptions, popperClassName, selectedTabLabel, unselectedTabLabel } = this.props;
		const { showLists, currentTab } = this.state;
		const unSelectedList = (
			<div
				className={"multiple-select_list multiple-select_list--unselected"}
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