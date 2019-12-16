import * as React from "react";
import { TrashIcon } from "../Icons";
import { ValueLabelModel, CommonProp } from "../models";
import { DropDownWrap } from "../styled";
import MobileList from "./List";

interface Props extends CommonProp { }

interface States {
	showLists: boolean;
	currentTab: string;
	unSelectedList: ValueLabelModel[];
	selectedOptionsLength: number;
}

export default class MultipleSelect extends React.Component<Props, States> {
	static defaultProps: Partial<Props> = {
		selectedTabLabel: "selected",
		unselectedTabLabel: "unselected"
	};

	static getDerivedStateFromProps(props: Props, state: States) {
		if (props.selectedOptions.length !== state.selectedOptionsLength) {
			return {
				...state,
				unSelectedList: props.options
					.filter(u => !props.selectedOptions.find(s => u.value === s.value)),
				selectedOptionsLength: props.selectedOptions.length
			}
		} else {
			return state
		}
	}
	isFirstTimeSelectedListDisplay: boolean = false;
	isFirstTimeUnSelectedListDisplay: boolean = false;
	inputRef: React.RefObject<HTMLInputElement> = React.createRef();
	selectWrapRef: React.RefObject<HTMLInputElement> = React.createRef();
	constructor(props: Props) {
		super(props);
		this.state = {
			showLists: false,
			currentTab: "unselected",
			unSelectedList: props.options,
			selectedOptionsLength: props.selectedOptions.length
		};
	}

	handleClickOutside = (e: any) => {
		if ((e.target as HTMLElement).closest(".multiple-select_dropdown_wrap")) {
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
		const { options, onChange } = this.props;
		let selectedOptions: ValueLabelModel[] = [...this.props.selectedOptions];
		selectedOptions.push(options.filter(u => !selectedOptions.find(s => u.value === s.value))[selectedIndex]);
		onChange(selectedOptions);
		if (this.props.onFocus) {
			this.props.onFocus
		}
	}

	onDeselectItem = (unSelectedIndex: number) => {
		let selectedOptions = [...this.props.selectedOptions];
		selectedOptions.splice(unSelectedIndex, 1);
		this.props.onChange(selectedOptions);
		if (selectedOptions.length === 0) {
			this.onBlur();
		}
	}

	onDeselectAll = () => {
		this.props.onChange([]);
	}

	onFocus = () => {
		const { onFocus } = this.props;
		if (this.inputRef.current) {
			this.inputRef.current.focus();
		}
		this.setState({ showLists: true });
		if (onFocus) {
			onFocus();
		}
	}

	onBlur = () => {
		const { onBlur } = this.props;
		if (this.inputRef.current) {
			this.inputRef.current.value = "";
		}
		if (onBlur) {
			onBlur();
		}
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

			if (Math.abs(xDiff) > Math.abs(yDiff)) {
				if (xDiff > 0) {
					whereDidSwipe = 'left';

				} else {
					whereDidSwipe = 'right';
				}
			}
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

		if (this.state.showLists && !prevState.showLists) {
			addEventListenersToUnselectedList();

		}
		if (this.state.currentTab !== prevState.currentTab) {


			if (this.state.currentTab === 'selected') {
				addEventListenersToSelectedList();
			}

			if (this.state.currentTab === 'unselected') {
				addEventListenersToUnselectedList();
			}

		}
	}


	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
		document.addEventListener('touchstart', this.handleClickOutside);

	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
		document.removeEventListener('touchstart', this.handleClickOutside);
	}


	render() {
		const { onInputChange, selectedOptions } = this.props;
		const { showLists } = this.state;
		return (
			<div className="multiple-select_wrap" ref={this.selectWrapRef}>
				<div className="multiple-select_summary_wrap" hidden={showLists || selectedOptions.length < 1}>
					<span className="multiple-select_summary" onClick={this.onFocus}>
						{selectedOptions.length > 0 ? selectedOptions[0].label : ""}
						{selectedOptions.length > 1 && "..."}
					</span>
				</div>
				<div className="multiple-select_trigger">
					<input
						onChange={e => {
							if (onInputChange) {
								onInputChange(e.target.value);
							}
						}}
						onFocus={this.onFocus}
						onBlur={this.onBlur}
						ref={
							this.inputRef
						}
					/>
				</div>
				{showLists && <DropDownWrap className="multiple-select_dropdown_wrap" top={this.selectWrapRef.current ? this.selectWrapRef.current.clientHeight : 0}>
					<MobileList {...this.props} onBlur={this.onBlur} onFocus={this.onFocus} />
				</DropDownWrap>}
			</div>
		);
	}
}