import * as React from "react";
import { shallow, mount, render } from "enzyme";
import MultipleSelect from './MultipleSelect';
import LibMultipleSelect from '../MultipleSelect';


describe("Component: MultipleSelect", () => {

    const component = mount(<MultipleSelect />);
    it("check if items move after click ", () => {
        const reactItem = component.findWhere(n => { return n.text() === 'react' });
        reactItem.find('.multiple-select_list_item').simulate('click');
        expect(component.find('.multiple-select_list--selected').containsMatchingElement(
            <div className="multiple-select_list_item"><span>react</span><i>✖</i></div>
        )).toBe(true);
    });

    it("check if items move back after click on x icon", () => {
        component.find('.multiple-select_list_item_cross-icon').simulate('click');
        expect(component.find('.multiple-select_list--unselected').containsMatchingElement(
            <div className="multiple-select_list_item js-active"><span>react</span></div>
        )).toBe(true);
        // component.unmount()
    });

    it("check if active item change after ArrowDown", () => {
        const map: any = {};
        window.addEventListener = jest.fn((event, cb) => {
            map[event] = cb;
        });

        const props = {
            selectedItems: [],
            unSelectedItems: [
                { value: 1, label: 'react' },
                { value: 2, label: 'reactnative' },
                { value: 3, label: 'nodejs' },
                { value: 4, label: 'redux' },
                { value: 5, label: 'mobx' }
            ],
            onChange: () => { /*we gonna test arrows only no need to change*/ }
        };
        const component = mount(<LibMultipleSelect {...props} />);
        let acvtiveUnselectedItem = component.state().acvtiveUnselectedItem;
        map.keydown({ key: 'ArrowDown' });

        expect(component.state().acvtiveUnselectedItem).toBe(acvtiveUnselectedItem + 1);
    });

    it("check if currentList change after ArrowRight", () => {
        //
        const map: any = {};
        window.addEventListener = jest.fn((event, cb) => {
            map[event] = cb;
        });

        const props = {
            selectedItems: [
                { value: 4, label: 'redux' },
                { value: 5, label: 'mobx' }
            ],
            unSelectedItems: [
                { value: 1, label: 'react' },
                { value: 2, label: 'reactnative' },
                { value: 3, label: 'nodejs' }

            ],
            onChange: () => { /*we gonna test arrows only no need to change*/ }
        };
        const component = mount(<LibMultipleSelect {...props} />);
        let currentList = component.state().currentList;
        map.keydown({ key: 'ArrowDown' });
        map.keydown({ key: 'ArrowRight' });

        expect(component.state().currentList).toBe(currentList + 1);
    });

});