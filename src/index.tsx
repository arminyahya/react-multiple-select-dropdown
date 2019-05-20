import * as React from "react";
import MediaQuery from "react-responsive";
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import { CommonProp } from "./models";
import withHandleClickOutside from "./HandleClickOutside";

const DesktopHoc: any = withHandleClickOutside(Desktop);
const MobileHoc: any = withHandleClickOutside(Mobile);

interface Props extends CommonProp {

}

const MultipleSelect = (props: Props) => (
	<MediaQuery query={`(min-width: ${props.breackPoint || 991}px)`}>
		{matches => (matches ?
			<DesktopHoc
				{...props}
				direction={props.direction || "rtl"}
				placement={props.placement ? props.placement : (props.direction === "rtl" ? "bottom-end" : "bottom-start")}
			/>
			:
			<MobileHoc
				{...props}
				placement={props.placement ? props.placement : (props.direction === "rtl" ? "bottom-end" : "bottom-start")}
			/>)}
	</MediaQuery>
);

export default MultipleSelect;
