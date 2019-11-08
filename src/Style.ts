import { css as emotionCSS } from "emotion";
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

`;
export const popperStyle = emotionCSS`

.multiple-select {
	display: flex;
}

.multiple-select_lists {
	box-shadow: 0 0 12px 0px rgba(0, 0, 0, 0.5);
}

.multiple-select_lists_inner {
	display: flex;
			/* -------------------- dark theme -------------------- */;
}

.multiple-select_lists.dark {
			/* -------------------- dark theme end -------------------- */;
}

.multiple-select_lists.dark .multiple-select_tab_header {
	background-color: #4d4d4d;
}

.multiple-select_lists.dark .multiple-select_lists {
	background-color: #24292e;
}

.multiple-select_lists.dark .multiple-select_list {
	-webkit-overflow-scrolling: touch;
	background-color: #24292e;
}

.multiple-select_lists.dark .multiple-select_list_item li{
	color: #ffffff;
}

.multiple-select_lists.dark .multiple-select_list_item .svg-point {
	fill: #ffffff;
}

.multiple-select_lists.dark .multiple-select_list_item li:hover {
	background-color: #4d4d4d;
}

.multiple-select_lists.dark .multiple-select_list_item.js-active li{
	background-color: #333333;
}

.multiple-select_lists.dark .multiple-select_list_item-add, .multiple-select_lists.dark .multiple-select_list_item-remove-all li{
	color: #ffffff;
	background-color: #24292e;
}

.multiple-select_lists.dark .multiple-select_list_item-add .svg-point, .multiple-select_lists.dark .multiple-select_list_item-remove-all .svg-point {
	fill: #ffffff;
}

.multiple-select_tab_header {
	display: flex;
	background-color: #FFFFFF;
	border-bottom: 2px solid #95B5BB;
	height: 32px;
}

.multiple-select_tab_header_item {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 8px;
	flex: 1;
	font-size: 13px;
	cursor: pointer;
}

.multiple-select_tab_header_item span {
	padding: 6px;
}

.multiple-select_tab_header_item.js-active {
	background-color: #95B5BB;
	color: #fff;
}


.multiple-select_list_inner.js-hidden {
	visibility: hidden;
	z-index: -1000;
}

.multiple-select_list {
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

.multiple-select_list_item {
	border-radius: 25px;
}
.multiple-select_list_item li{
	position: relative;
	font-size: 13px;
	min-height: 25px;
	display: flex;
	align-items: center;
	font-size: 13px;
	margin: 5px 5px 5px 5px;
	padding: 5px 10px;
}

.multiple-select_list_item li > * {
	display: inline-block;
	width: 100%;
	overflow: hidden;
    text-overflow: ellipsis;
}

.multiple-select_list_item:hover {
	background-color: #F2F2F2;
}

.multiple-select_list_item.js-active {
	background-color: #E8E8E8;
}

.multiple-select_list_item-add, .multiple-select_list_item-remove-all {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	border-bottom: 2px solid #CCCCCC;
	padding: 8px 0;
	margin-right: 20px;
	background-color: #FFFFFF;
	color: #F58229;
	font-weight: 500;
	font-size: 13px;
	width: 100%;
	z-index: 1000;
	cursor: pointer;
}

.multiple-select_list_item-add .svg-point, .multiple-select_list_item-remove-all .svg-point {
	fill: #F58229;
}

.multiple-select_list_item-add .icon, .multiple-select_list_item-remove-all .icon {
	order: 1;
	display: inline-block;
	padding-left: 8px;
}

.multiple-select_list_item-add span, .multiple-select_list_item-remove-all span {
	order: 2;
}

.multiple-select_list_item-add svg, .multiple-select_list_item-remove-all svg {
	width: 24px;
	height: 24px;
}

.multiple-select_list--unselected .multiple-select_list_item li{
	justify-content: flex-start;
	align-items: center;
}

.multiple-select_list--unselected.js-addable .multiple-select_list_item{
	top: 50px;
}

.multiple-select_list--selected .multiple-select_list_item{
	justify-content: center;
	align-items: center;
}

.multiple-select_list--selected .icon--trash {
	padding-right: 10px;
	text-align: end;
}

.multiple-select_list--selected .icon--trash svg {
	width: 15px;
	height: 15px;
}

.multiple-select_list--selected .icon--trash .svg-point {
	fill: #F58229;
}

.multiple-select_list--selected.js-show-remove-all .multiple-select_list_item{
	top: 50px;
}

`;