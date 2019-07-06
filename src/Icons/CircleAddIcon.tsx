import * as React from 'react';

type Props = React.HtmlHTMLAttributes<HTMLDivElement>;
export default class PlusIcon extends React.PureComponent<Props> {
	render() {
		return (
			<div {...this.props} className={'icon icon--plus' + (this.props.className ? ' ' + this.props.className : '')}>
				<svg viewBox="0 0 11.15 11.15">
					<path className="svg-point" d="M10.22,4.65H6.51V.93a.93.93,0,1,0-1.86,0V4.65H.93a.93.93,0,0,0,0,1.86H4.65v3.71a.93.93,0,0,0,1.86,0V6.51h3.71a.93.93,0,0,0,0-1.86Z" />
				</svg>

			</div>
		);
	}
}
