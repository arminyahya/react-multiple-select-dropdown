import * as React from "react";
import * as ReactDOM from "react-dom";
import { TrashIcon } from "../Icons";
import { CommonProp, ValueLabelModel } from "../models";
import VirtualList from 'react-tiny-virtual-list';

export enum ListType {
    unselected,
    selected
}

interface Props extends CommonProp { }

interface States {
    acvtiveUnselectedItem: number;
    acvtiveSelectedItem: number;
    currentList: ListType;
    unSelectedList: ValueLabelModel[];
    selectedOptionsLength: number;
}

export default class DesktopList extends React.Component<Props, States> {
    static defaultProps: Partial<Props> = {
        theme: "default"
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
    constructor(props: Props) {
        super(props);
        const isAllSelected = props.selectedOptions.length === props.options.length
        this.state = {
            acvtiveUnselectedItem: isAllSelected ? -1 : 0,
            acvtiveSelectedItem: isAllSelected ? 0 : -1,
            unSelectedList: props.options.filter(u => !props.selectedOptions.find(s => u.value === s.value)),
            currentList: isAllSelected ? ListType.selected : ListType.unselected,
            selectedOptionsLength: props.selectedOptions.length
        };
    }

    onSelectItem = (selectedIndex: number) => {
        let selectedOptions = [...this.props.selectedOptions];
        selectedOptions.push(this.props.options.filter(u => !selectedOptions.find(s => u.value === s.value))[selectedIndex]);
        this.props.onChange(selectedOptions);
        if (this.props.onFocus) {
            this.props.onFocus();
        }
        this.setState({ acvtiveUnselectedItem: 0 });
    }

    onDeselectItem = (unSelectedIndex: number) => {
        let selectedOptions = [...this.props.selectedOptions];
        selectedOptions.splice(unSelectedIndex, 1);
        this.props.onChange(selectedOptions);
        if (selectedOptions.length === 0) {
            if (this.props.onBlur) {
                this.props.onBlur();
            }
            this.setState(
                {
                    acvtiveSelectedItem: -1,
                    currentList: selectedOptions.length === 0 ? ListType.unselected : this.state.currentList
                }
            );
        } else {

            this.setState(
                {
                    acvtiveSelectedItem: 0,
                    currentList: selectedOptions.length === 0 ? ListType.unselected : this.state.currentList
                }
            );
        }
    }

    onDeselectAll = () => {
        this.props.onChange([]);
        this.setState({ currentList: ListType.unselected, acvtiveSelectedItem: 0 });
    }

    handleKeyPress = (e: any) => {
        const { selectedOptions, options } = this.props;
        const { currentList, acvtiveSelectedItem, acvtiveUnselectedItem } = this.state;

        let list;
        if (currentList === ListType.unselected) {
            list = document.querySelector(".multiple-select_list--unselected--virutual") as HTMLElement;
        } else {
            list = document.querySelector(".multiple-select_list--selected--virutual") as HTMLElement;
        }
        const activeItem = list.querySelector(".js-active") as HTMLElement;
        if (!activeItem) {
            return;
        }
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
                break;
        }
    }


    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyPress);


    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyPress);
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
                }>				<li
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
        const { selectedOptions, addable, theme } = this.props;
        const unSelectedList = (
            <div
                className={"multiple-select_list multiple-select_list--unselected" + (addable ? " js-addable" : "")}
                role="listbox"
                aria-labelledby="ss_elem"
            >
                <VirtualList
                    height={200}
                    itemCount={this.state.unSelectedList.length}
                    itemSize={40}
                    width={240}
                    style={{ overflowY: 'auto', overflowX: 'initial' }}
                    className="multiple-select_list--unselected--virutual"
                    renderItem={this.unSelectedRow}
                />
            </div>
        );
        const selectedList = (
            <div className={"multiple-select_list multiple-select_list--selected"} >
                <VirtualList
                    height={200}
                    itemCount={selectedOptions.length}
                    itemSize={40}
                    width={240}
                    style={{ overflowY: 'auto', overflowX: 'initial' }}
                    className="multiple-select_list--selected--virutual"
                    renderItem={this.selectedRow}
                />
            </div>
        );
        return (

            <div
                className={'multiple-select_lists' + ' ' + theme}
                style={{ width: !!selectedOptions.length ? 480 : 240 }}
            >
                <div className="multiple-select_lists_inner">
                    {unSelectedList}
                    {!!selectedOptions.length && selectedList}
                </div>
            </div>
        )
    }
}
