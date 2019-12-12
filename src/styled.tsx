import styled from '@emotion/styled'

export const AppWrap = styled.div<{ breackPoint: "575" | "768" | "991" | "1199" }>`
.multiple-select--mobile{
    display: none;
  }
    @media (max-width: ${(props) => props.breackPoint}px) {
        .multiple-select--desktop{
          display: none;
        }
        .multiple-select--mobile{
            display: block;
          }
      }
`

export const SelectWrap = styled.div`
    display: flex;
`;

export const SummaryWrap = styled.div`
    flex-grow: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    transition: border-color 0.3s ease;
    line-height: 28px;
    position: absolute;
    width: 100%;
`;

export const Summary = styled.div`
    position: relative;
`;

export const Trigger = styled.div`
    width: 100%;
	height: 30px;
	border: none;
	background-color: transparent;
    border-bottom: 2px solid #e6e6e6;
    input {
        outline: none;
        height: auto;
        border: none;
    }
`;

export const ListsWrap = styled.div`
    box-shadow: 0 0 12px 0px rgba(0, 0, 0, 0.5);
    &.dark {
        // background-color: #24292e;
        .multiple-select_list {
            -webkit-overflow-scrolling: touch;
            background-color: #24292e;
        }

        .multiple-select_list_item li{
            color: #ffffff;
        }

        .multiple-select_list_item .svg-point {
            fill: #ffffff;
        }

        .multiple-select_list_item:hover {
            background-color: #4d4d4d;
        }

        .multiple-select_list_item.js-active{
            background-color: #333333;
        }
        .multiple-select_list_item-add, .multiple-select_list_item-remove-all li {

            color: #ffffff;
            background-color: #24292e;
            .svg-point {
                fill: #ffffff;

            }
        }
    }
`;

export const ListsInner = styled.div`
    display: flex;
`;

export const TabHeader = styled.div`
    display: flex;
	background-color: #FFFFFF;
	border-bottom: 2px solid #95B5BB;
    height: 32px;
    span {
        padding: 6px;
    }
    &.js-active {
        background-color: #95B5BB;
        color: #fff;
}`;

export const List = styled.div`
    width: 240px;
	height: 200px;
	font-size: 14px;
	font-weight: 300;
	overflow: auto;
	max-height: 300px;
	width: 240px;
	background-color: transparent;
    z-index: 1000;
`;
export const ListItem = styled.div`
    border-radius: 25px;
    &:hover {
    	background-color: #F2F2F2;
    }
    &.js-active {
    	background-color: #E8E8E8;
    }
    li {
	position: relative;
	font-size: 13px;
	min-height: 25px;
	display: flex;
	align-items: center;
	font-size: 13px;
	margin: 5px 5px 5px 5px;
	padding: 5px 10px;
    }
    li > * {
    	display: inline-block;
    	width: 100%;
    	overflow: hidden;
        text-overflow: ellipsis;
    }
`;
export const ItemAdd = styled.div`
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
    svg {
        width: 24px;
        height: 24px;
    }

    .svg-point {
        fill: #F58229;
        
    }
    .icon {
        order: 1;
        display: inline-block;
        padding-left: 8px;
    }
    span {
        order: 2;
    }
`;

export const HeaderItem = styled.div`
    display: flex;
	justify-content: center;
	align-items: center;
	padding: 8px;
	flex: 1;
	font-size: 13px;
    cursor: pointer;
    &.js-active {
        background-color: #95B5BB;
	    color: #fff;
    }
`;

export const RemoveAll = styled.div`
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
    svg {
        width: 24px;
        height: 24px;
    }
    .svg-point {
        fill: #F58229;
    }
    .icon {
        order: 1;
        display: inline-block;
        padding-left: 8px;
    }
    span {
        order: 2;
    }
`;

export const UnSelectedList = styled(List)`

    .multiple-select_list_item li{
    	justify-content: flex-start;
    	align-items: center;
    }
    &.js-addable .multiple-select_list_item{
    	top: 50px;
    }
`;
export const SelectedList = styled(List)`

    .multiple-select_list_item{
    	justify-content: center;
    	align-items: center;
    }

    .icon--trash {
    	padding-right: 10px;
    	text-align: end;
    }

    .icon--trash svg {
    	width: 15px;
    	height: 15px;
    }

    .icon--trash .svg-point {
    	fill: #F58229;
    }

    &.js-show-remove-all .multiple-select_list_item{
    	top: 50px;
    }
`;

export const DropDownWrap = styled.div<{ top: number }>`
    position: absolute;
    top: ${(props) => props.top}px;
`


