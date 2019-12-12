import * as React from "react";
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import { CommonProp } from "./models";
import { AppWrap } from "./styled";
export { default as DesktopList } from './Desktop/List';
export { default as MobileList } from './Mobile/List';

interface Props extends CommonProp { }


const MultipleSelect = (props: Props) => (
	<AppWrap breackPoint={props.breackPoint || "991"}>
		<div className="multiple-select--desktop">
			<Desktop
				{...props}
				direction={props.direction || "rtl"}
				placement={props.placement ? props.placement : (props.direction === "rtl" ? "bottom-end" : "bottom-start")}
			/>
		</div>
		<div className="multiple-select--mobile">

			<Mobile
				{...props}
				placement={props.placement ? props.placement : (props.direction === "rtl" ? "bottom-end" : "bottom-start")} />
		</div>
	</AppWrap>
);

export default MultipleSelect;
