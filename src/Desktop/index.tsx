import * as React from "react";
import { CommonProp } from "../models";
import { DropDownWrap } from "../styled";
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

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
		document.addEventListener('touchstart', this.handleClickOutside);

	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
		document.removeEventListener('touchstart', this.handleClickOutside);
	}

	render() {
		const { onInputChange, selectedOptions, addable, theme } = this.props;
		const { showLists } = this.state;
		return (
			<div className="multiple-select_wrap" ref={this.selectWrapRef}>
				<div className="multiple-select_summary_wrap" hidden={showLists || selectedOptions.length < 1}>
					<span onClick={this.onFocus}>
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
					<DesktopList {...this.props} onBlur={this.onBlur} onFocus={this.onFocus} />
				</DropDownWrap>
				}
			</div>
		);
	}
}
