import * as React from "react";
import * as ReactDOM from "react-dom";
import { popperPortal } from "../PopperPortal";
import { CommonProp } from "../models";
import { SummaryWrap, SelectWrap, Trigger, DropDownWrap } from "../styled";
import DesktopList from "./List";

export enum ListType {
	unselected,
	selected
}

interface Props extends CommonProp { }

interface States {
	showLists: boolean;
}

export default class MultipleSelect extends React.Component<Props, States> {
	static defaultProps: Partial<Props> = {
		placement: "bottom-end",
		theme: "default"
	};

	inputRef: React.RefObject<HTMLInputElement> = React.createRef();
	selectWrapRef: React.RefObject<HTMLInputElement> = React.createRef();
	constructor(props: Props) {
		super(props);
		const isAllSelected = props.selectedOptions.length === props.options.length
		this.state = {
			showLists: false,
		};
	}

	handleClickOutside = (e: any) => {
		if ((e.target as HTMLElement).closest(".multiple-select_dropdown-wrap")) {
			return;
		}

		if (this.inputRef.current) {
			this.inputRef.current.value = "";
		}

		if (this.state.showLists) {
			this.setState({ showLists: false });
		}
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

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
		document.addEventListener('touchstart', this.handleClickOutside);

	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
		document.removeEventListener('touchstart', this.handleClickOutside);
	}

	render() {
		const { onInputChange, selectedOptions, popperClassName, addable, theme } = this.props;
		const { showLists } = this.state;
		return (
			<SelectWrap ref={this.selectWrapRef}>
				<SummaryWrap hidden={showLists || selectedOptions.length < 1}>
					<span onClick={this.onFocus}>
						{selectedOptions.length > 0 ? selectedOptions[0].label : ""}
						{selectedOptions.length > 1 && "..."}
					</span>
				</SummaryWrap>
				<Trigger>
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
				</Trigger>
				{showLists && <DropDownWrap className="multiple-select_dropdown-wrap" top={this.selectWrapRef.current ? this.selectWrapRef.current.clientHeight : 0}>
					<DesktopList {...this.props} />
				</DropDownWrap>
				}
			</SelectWrap>
		);
	}
}
