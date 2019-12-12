import * as React from "react";
import { ListItem, SelectedList as StyledSelectedList, UnSelectedList, SummaryWrap, SelectWrap, Trigger, ListsWrap, TabHeader, HeaderItem } from "../styled";
import { ValueLabelModel } from "../models";
import VirtualList from 'react-tiny-virtual-list';

interface Props {
	selectedOptions: ValueLabelModel[];
	selectedRow: ({ index, style }: { index: number; style: any; }) => JSX.Element;
}

const SelectedList = ({ selectedOptions, selectedRow }: Props) => {

	return (
		<StyledSelectedList>
			<VirtualList
				height={200}
				itemCount={selectedOptions.length}
				itemSize={40}
				width={240}
				style={{ overflowY: 'auto', overflowX: 'initial' }}
				className="multiple-select_list--selected--virutual"
				renderItem={selectedRow}
			/>
		</StyledSelectedList>
	)
}


export default SelectedList;