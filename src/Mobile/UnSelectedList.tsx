import * as React from "react";
import { ValueLabelModel } from "../models";
import VirtualList from 'react-tiny-virtual-list';

interface Props {
    unSelectedList: ValueLabelModel[];
    unSelectedRow: ({ index, style }: { index: number; style: any; }) => JSX.Element;
}

const UnSelectedList = ({ unSelectedList, unSelectedRow }: Props) => {

    return (
        <div
            className={"multiple-select_list multiple-select_list--unselected"}
            role="listbox"
            aria-labelledby="ss_elem"
        >
            <VirtualList
                height={200}
                itemCount={unSelectedList.length}
                itemSize={40}
                width={240}
                style={{ overflowY: 'auto', overflowX: 'initial' }}
                className="multiple-select_list--unselected--virutual"
                renderItem={unSelectedRow}
            />
        </div>
    )
}


export default UnSelectedList;