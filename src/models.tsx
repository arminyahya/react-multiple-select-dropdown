
export interface CommonProp {
	selectedOptions: ValueLabelModel[];
	options: ValueLabelModel[];
	onInputChange?: (val: string) => void;
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
	theme?: "default" | "dark";
	direction?: "rtl" | "ltr";
	renderUnSelectedOption?: (item: ValueLabelModel) => React.ReactNode;
	renderSelectedOption?: (item: ValueLabelModel) => React.ReactNode;
}

export interface ValueLabelModel {
	value: any;
	label: string;
}