import * as PopperJS from "popper.js";

export interface CommonProp {
	popperClassName?: string;
	selectedItems: ValueLabelModel[];
	unSelectedItems: ValueLabelModel[];
	onInputChange: (val: string) => void;
	onChange: (selectedItems: ValueLabelModel[]) => void;
	onFocus?: () => void;
	onBlur?: () => void;
	isRequired?: boolean;
	addable?: boolean;
	addText?: string;
	onAddNewItem?: () => void;
	selectedTabLabel?: string;
	unselectedTabLabel?: string;
	breackPoint?: "575" | "768" | "991" | "1199";
	placement?: PopperJS.Placement;
	theme?: "default" | "dark";
	direction?: "rtl" | "ltr";
	renderUnSelectedItem?: (item: ValueLabelModel) => React.ReactNode;
	renderSelectedItem?: (item: ValueLabelModel) => React.ReactNode;
}

export interface ValueLabelModel {
	value: any;
	label: string;
}