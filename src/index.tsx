import * as React from "react";
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import { CommonProp } from "./models";
export { default as DesktopList } from './Desktop/List';
export { default as MobileList } from './Mobile/List';

interface Props extends CommonProp { }


const MultipleSelect = (props: Props) => (
	<>
		<div className="multiple-select--desktop">
			<Desktop
				{...props}
				direction={props.direction || "rtl"}
			/>
		</div>
		<div className="multiple-select--mobile">
			<Mobile {...props} />
		</div>
	</>
);

export default MultipleSelect;
