// tslint:disable: max-line-length

import * as React from "react";

type Props = React.HtmlHTMLAttributes<HTMLDivElement>;
export default class TrashIcon extends React.PureComponent<Props> {
	render() {
		return (
			<div
				{...this.props}
				className={
					"y-icon y-icon--trash" +
					(this.props.className ? " " + this.props.className : "")
				}
			>
				<svg viewBox="0 0 11.49 14.54">
					<path className="svg-point" d="M10.5,1.71H8.56V.45A.46.46,0,0,0,8.1,0a.06.06,0,0,0,0,0L8,0H3.39a.45.45,0,0,0-.45.45V1.71H1a1,1,0,0,0-1,1V4.32H.86v9.23a1,1,0,0,0,1,1H9.65a1,1,0,0,0,1-1V4.32h.85V2.7A1,1,0,0,0,10.5,1.71ZM3.84.9H7.65v.81H3.84ZM9.73,13.55c0,.06,0,.08-.08.08H1.84c-.05,0-.08,0-.08-.08V4.32h8Zm.85-10.13H.91V2.7c0-.05,0-.09.08-.09H10.5c.06,0,.08,0,.08.09Z" />
					<rect className="svg-point" x="7.39" y="5.38" width="0.91" height="7.45" />
					<rect className="svg-point" x="5.3" y="5.38" width="0.91" height="7.45" />
					<rect className="svg-point" x="3.2" y="5.38" width="0.91" height="7.45" />
				</svg>
			</div>
		);
	}
}
