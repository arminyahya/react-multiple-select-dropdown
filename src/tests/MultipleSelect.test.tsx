import * as React from "react";
import { shallow, mount, render, } from "enzyme";
import MultipleSelect from "./MultipleSelect";
import { DesktopList } from "..";
import { TrashIcon } from "../../src/Icons";

describe("Component: MultipleSelect", () => {
	const component = mount(<MultipleSelect />);
	it.skip("check if items move after click ", () => {

		const reactItem = component.findWhere(n => { return n.text() === "react"; });
		reactItem.find("li").simulate("click");
		expect(component.find(".multiple-select_list--selected").containsMatchingElement
			(<div className="multiple-select_list_item"><li><React.Fragment><span>react</span><TrashIcon /></React.Fragment ></li></div>)).toBe(true);
	});

	it.skip("check if items move back after click on x icon", () => {
		component.find(".icon--trash").simulate("click");
		expect(component.find(".multiple-select_list--unselected").containsMatchingElement(
			<li><span> react</ span></li>
		)).toBe(true);
	});

	it("check if active item change after ArrowDown", () => {
		const map: any = {};
		window.addEventListener = jest.fn((event, cb) => {
			map[event] = cb;
		});


		const props = {
			selectedOptions: [
				{ value: 4, label: "redux" },
				{ value: 5, label: "mobx" }
			],
			options: [
				{ value: 1, label: "react" },
				{ value: 2, label: "reactnative" },
				{ value: 3, label: "nodejs" }

			],
			onChange: () => { /*we gonna test arrows only no need to change*/ }
		};

		const component = mount(<DesktopList {...props} />);

		let acvtiveUnselectedItem: number = component.state().acvtiveUnselectedItem;
		map.keydown({ key: "ArrowDown" });

		expect(component.state().acvtiveUnselectedItem).toBe(acvtiveUnselectedItem + 1);
	});

	it.skip("check if currentList change after ArrowRight", () => {
		//
		const map: any = {};
		window.addEventListener = jest.fn((event, cb) => {
			map[event] = cb;
		});

		const props = {
			selectedOptions: [
				{ value: 4, label: "redux" },
				{ value: 5, label: "mobx" }
			],
			options: [
				{ value: 1, label: "react" },
				{ value: 2, label: "reactnative" },
				{ value: 3, label: "nodejs" }

			],
			onChange: () => { /*we gonna test arrows only no need to change*/ }
		};
		const component = mount(<DesktopList {...props} />);
		let currentList = component.state().currentList;
		map.keydown({ key: "ArrowDown" });
		map.keydown({ key: "ArrowRight" });

		expect(component.state().currentList).toBe(currentList + 1);
	});

});