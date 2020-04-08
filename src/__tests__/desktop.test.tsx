import React, { useState } from 'react'
import { render, fireEvent, waitFor, prettyDOM, wait, waitForElement } from '@testing-library/react'
import MultipleSelect from '../Desktop';
import { ValueLabelModel } from '../models';
import '@testing-library/jest-dom/extend-expect'


const DropDownWrapComponent = () => {
    const [selectedItems, setSelectedItems] = useState<ValueLabelModel[]>([]);
    const [unSelectedItems, setUnSelectedItems] = useState([
        { value: 'yarn', label: 'yarn' },
        { value: 'npm', label: 'npm' },
        { value: 'deno', label: 'deno' },
        { value: 'angular', label: 'angular' },

    ]);

    const onChange = (selectedItems: ValueLabelModel[]) => {
        setSelectedItems(selectedItems);
    };

    return (
        <MultipleSelect
            selectedOptions={selectedItems}
            options={unSelectedItems}
            onChange={onChange}
            direction={'ltr'}
            theme={'dark'}
            breackPoint="1199"
        // renderUnSelectedItem={item => <div className="custome unselected">{item.label} </div>}
        // renderSelectedItem={item => <div className="custome selected">{item.label} </div>}
        />
    );

}

test('check if dropdown open on focus', async () => {
    const { container, getByText } = render(<DropDownWrapComponent />);
    const input = container.querySelector('input');

    (input as HTMLInputElement).focus();
    await waitFor(() => {
        expect(getByText('yarn')).toBeDefined()
    })
})

test('check if selecting work', async () => {
    const { container, getByText } = render(<DropDownWrapComponent />);
    const input = container.querySelector('input');

    (input as HTMLInputElement).focus();
    await waitFor(() => {
        fireEvent.click(getByText('yarn'));
    })

    await waitFor(() => {
        const selectedList = container.querySelector('.multiple-select_list--selected--virutual') as HTMLDivElement;
        expect(selectedList.querySelectorAll('.multiple-select_list_item')).toHaveLength(1);
    })

})

test('check if unselecting work', async () => {
    const { container, getByText, rerender } = render(<DropDownWrapComponent />);
    const input = container.querySelector('input');

    (input as HTMLInputElement).focus();
    await waitFor(() => {
        fireEvent.click(getByText('yarn'));
    })

    await waitFor(() => {
        const selectedList = container.querySelector('.multiple-select_list--selected--virutual') as HTMLDivElement;

        // this is the yarn again
        fireEvent.click(selectedList.querySelector('li') as HTMLLIElement);
    })

    const selectedList = container.querySelector('.multiple-select_list--selected--virutual') as HTMLDivElement;
    // close unselected list after unselecting all of them in this case there is one
    expect(selectedList).not.toBeInTheDocument();
})


test('check if active item change on keydown', async () => {
    const { container, getByText, rerender } = render(<DropDownWrapComponent />);
    const input = container.querySelector('input');
    (input as HTMLInputElement).focus();

    fireEvent.keyDown(window.document.body, { key: 'ArrowDown', keyCode: 40 })
    await waitFor(() => {
        expect((getByText('npm').closest('.multiple-select_list_item') as HTMLDivElement).classList.contains('js-active')).toBeTruthy();

    });
})
