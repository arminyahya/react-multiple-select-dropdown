import { css as emotionCSS } from 'emotion';
export const inputStyle = emotionCSS`
.multiple-select {
	display: flex;
}
.multiple-select_summary-wrapper {
	flex-grow: 1;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	transition: border-color 0.3s ease;
	line-height: 28px;
	position: absolute;
	width: 100%;
}

.multiple-select_summary {
	position: relative;
}

.multiple-select_trigger {
	width: 100%;
	height: 30px;
	border: none;
	outline: none;
	background-color: transparent;
	border-bottom: 2px solid #e6e6e6;
}

.multiple-select_trigger input {
	height: auto;
	border: none;
}

.multiple-select_trigger_wrapper {
	width: 100%;
}
`
export const popperStyle = emotionCSS`

.multiple-select_lists_inner {
	display: flex;
}

.multiple-select_list_inner.js-hidden {
	visibility: hidden;
	z-index: -1000;
}

.multiple-select_list {
	width: 240px;
	max-height: 300px;
	font-size: 14px;
	font-weight: 300;
	overflow: auto;
	color: #fff;
	background-color: #24292e;
}

.multiple-select_list_item {
	padding: 8px 12px;
	font-size: 13px;
	min-height: 35px;
	display: flex;
	align-items: center;
}

.multiple-select_list_item > span {
	display: inline-block;
	width: 100%;
}

.multiple-select_list_item:hover {
	background-color: #4d4d4d;
}

.multiple-select_list_item.js-active {
	background-color: #333333;
}

.multiple-select_list::-webkit-scrollbar {
	width: 8px;
}

.multiple-select_list::-webkit-scrollbar-track {
	background: rgba(36, 41, 46, 0.5);
	border-radius: 0;
}

.multiple-select_list::-webkit-scrollbar-thumb {
	background: rgba(0, 0, 0, 0.5);
	border-radius: 0;
}

.multiple-select_list-unselected .multiple-select_list_item {
	justify-content: flex-start;
	align-items: center;
}

.multiple-select_list-selected .multiple-select_list_item {
	justify-content: center;
	align-items: center;
}

.multiple-select_list-selected .y-icon--cross {
	margin-right: auto;
	padding-right: 10px;
}

.multiple-select_list-selected .y-icon--cross svg {
	width: 10px;
}

.multiple-select_list-selected .y-icon--cross .svg-point {
	stroke: #fff;
} 
`;