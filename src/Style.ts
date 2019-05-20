import { css as emotionCSS } from "emotion";
export const inputStyle = emotionCSS`
.y-multiple-select {
	display: flex;
}

.y-multiple-select_summary-wrapper {
	flex-grow: 1;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;

	transition: border-color 0.3s ease;
	line-height: 28px;
	position: absolute;
	width: 100%;
}

.y-multiple-select_summary {
	position: relative;
}

.y-multiple-select_trigger {
	width: 100%;
	height: 30px;
	border: none;
	outline: none;
	background-color: transparent;
	border-bottom: 2px solid #e6e6e6;
}

.y-multiple-select_trigger input {
	height: auto;
	border: none;
}

.y-multiple-select_trigger_wrapper {
	width: 100%;
}

`;
export const popperStyle = emotionCSS`

.y-multiple-select {
	display: flex;
}

.y-multiple-select_lists {
	box-shadow: 0 0 12px 0px rgba(0, 0, 0, 0.5);
}

.y-multiple-select_lists_inner {
	display: flex;
			/* -------------------- dark theme -------------------- */;
}

.y-multiple-select_lists.dark {
			/* -------------------- dark theme end -------------------- */;
}

.y-multiple-select_lists.dark .y-multiple-select_tab_header {
	background-color: #4d4d4d;
}

.y-multiple-select_lists.dark .y-multiple-select_lists {
	background-color: #24292e;
}

.y-multiple-select_lists.dark .y-multiple-select_list {
	-webkit-overflow-scrolling: touch;
	background-color: #24292e;
}

.y-multiple-select_lists.dark .y-multiple-select_list_item {
	color: #ffffff;
}

.y-multiple-select_lists.dark .y-multiple-select_list_item .svg-point {
	fill: #ffffff;
}

.y-multiple-select_lists.dark .y-multiple-select_list_item:hover {
	background-color: #4d4d4d;
}

.y-multiple-select_lists.dark .y-multiple-select_list_item.js-active {
	background-color: #333333;
}

.y-multiple-select_lists.dark .y-multiple-select_list_item-add, .y-multiple-select_lists.dark .y-multiple-select_list_item-remove-all {
	color: #ffffff;
	background-color: #24292e;
}

.y-multiple-select_lists.dark .y-multiple-select_list_item-add .svg-point, .y-multiple-select_lists.dark .y-multiple-select_list_item-remove-all .svg-point {
	fill: #ffffff;
}

.y-multiple-select_tab_header {
	display: flex;
	background-color: #FFFFFF;
	border-bottom: 2px solid #95B5BB;
	height: 32px;
	margin-top: 10px;
}

.y-multiple-select_tab_header_item {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 8px;
	font-size: 13px;
	border-top-left-radius: 5px;
	cursor: pointer;
}

.y-multiple-select_tab_header_item span {
	padding: 6px;
}

.y-multiple-select_tab_header_item:last-child {
	border-top-right-radius: 5px;
}

.y-multiple-select_tab_header_item.js-active {
	background-color: #95B5BB;
	color: #fff;
}


.y-multiple-select_list_inner.js-hidden {
	visibility: hidden;
	z-index: -1000;
}

.y-multiple-select_list {
	width: 240px;
	height: 200px;
	font-size: 14px;
	font-weight: 300;
	overflow: auto;
	max-height: 300px;
	width: 240px;
	background-color: #FFFFFF;
	z-index: 1000;
}

.y-multiple-select_list_item {
	position: relative;
	font-size: 13px;
	min-height: 25px;
	display: flex;
	align-items: center;
	font-size: 13px;
	margin: 5px 20px 10px 5px;
	padding: 5px 5px;
	border-radius: 20px;
}

.y-multiple-select_list_item > * {
	display: inline-block;
	width: 100%;
}

.y-multiple-select_list_item:hover {
	background-color: #F2F2F2;
}

.y-multiple-select_list_item.js-active {
	background-color: #E8E8E8;
}

.y-multiple-select_list_item-add, .y-multiple-select_list_item-remove-all {
	display: flex;
	align-items: center;
	border-bottom: 2px solid #CCCCCC;
	padding: 8px 0;
	margin: 0 10px;
	background-color: #FFFFFF;
	color: #F58229;
	font-weight: 500;
	font-size: 13px;
	position: fixed;
	width: 204px;
	z-index: 1000;
	cursor: pointer;
}

.y-multiple-select_list_item-add .svg-point, .y-multiple-select_list_item-remove-all .svg-point {
	fill: #F58229;
}

.y-multiple-select_list_item-add .y-icon, .y-multiple-select_list_item-remove-all .y-icon {
	order: 1;
	display: inline-block;
	padding-left: 8px;
}

.y-multiple-select_list_item-add span, .y-multiple-select_list_item-remove-all span {
	order: 2;
}

.y-multiple-select_list_item-add svg, .y-multiple-select_list_item-remove-all svg {
	width: 24px;
	height: 24px;
}

.y-multiple-select_list--unselected .y-multiple-select_list_item {
	justify-content: flex-start;
	align-items: center;
}

.y-multiple-select_list--unselected.js-addable .y-multiple-select_list_item {
	top: 50px;
}

.y-multiple-select_list--selected .y-multiple-select_list_item {
	justify-content: center;
	align-items: center;
}

.y-multiple-select_list--selected .y-icon--trash {
	padding-right: 10px;
}

.y-multiple-select_list--selected .y-icon--trash svg {
	width: 15px;
	height: 15px;
}

.y-multiple-select_list--selected .y-icon--trash .svg-point {
	fill: #F58229;
}

.y-multiple-select_list--selected.js-show-remove-all .y-multiple-select_list_item {
	top: 50px;
}

`;