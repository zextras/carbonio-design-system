/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { screen, within } from '@testing-library/react';
import { forEach, map, reject, slice } from 'lodash';

import { Select, SelectItem, SingleSelectionOnChange } from './Select';
import { setup } from '../../test-utils';
import { SELECTORS } from '../../testUtils/constants';

const items: SelectItem<`${number}`>[] = [
	{
		label: 'hi',
		value: '1'
	},
	{
		label: 'hello',
		value: '2'
	},
	{
		label: 'good day',
		value: '3'
	},
	{
		label: 'goodnight',
		value: '4'
	},
	{
		label: 'nothing',
		value: '5'
	}
];

const extendedItems: SelectItem<`${number}`>[] = [
	...items,
	{
		label: 'unselectable',
		value: '6',
		disabled: true
	}
];

describe('Select', () => {
	describe('single selection ', () => {
		test('disabled items are not selectable and does not trigger onChange', async () => {
			const label = 'Select an item';
			const onChange = jest.fn();
			const { user } = setup(
				<Select items={extendedItems} label={label} onChange={onChange} selection={items[0]} />
			);

			await user.click(screen.getByText(label));

			const dropdownItem = within(screen.getByTestId(SELECTORS.dropdown)).getByText(
				extendedItems[5].label
			);
			await user.click(dropdownItem);

			const selectedItemLabels = screen.getAllByText(extendedItems[0].label);

			expect(onChange).not.toHaveBeenCalled();

			expect(selectedItemLabels).toHaveLength(2);
			expect(selectedItemLabels[0]).toBeVisible();
			expect(selectedItemLabels[1]).toBeVisible();
			expect(dropdownItem).toBeVisible();
		});
		describe('controlled mode', () => {
			test('label is visible, item is selected and onChange is not called', () => {
				const label = 'Select an item';
				const onChange = jest.fn();
				setup(<Select items={items} label={label} onChange={onChange} selection={items[0]} />);

				// label is visible
				expect(screen.getByText(label)).toBeInTheDocument();
				expect(screen.getByText(label)).toBeVisible();

				// first item is selected
				expect(screen.getByText(items[0].label)).toBeInTheDocument();

				// onChange is not called
				expect(onChange).not.toHaveBeenCalled();
			});
			test('onChange is not called if the user clicks on the item with the same value as the selected one', async () => {
				const label = 'Select an item';
				const onChange = jest.fn();
				const { user } = setup(
					<Select items={items} label={label} onChange={onChange} selection={items[0]} />
				);

				await user.click(screen.getByText(label));

				const dropdownItem = within(screen.getByTestId(SELECTORS.dropdown)).getByText(
					items[0].label
				);
				await user.click(dropdownItem);

				expect(onChange).not.toHaveBeenCalled();
			});
			test('onChange is called if the user clicks on an item with a different value from the selected one', async () => {
				const label = 'Select an item';
				const onChange = jest.fn();
				const { user } = setup(
					<Select items={items} label={label} onChange={onChange} selection={items[0]} />
				);

				await user.click(screen.getByText(label));

				const dropdownItem = within(screen.getByTestId(SELECTORS.dropdown)).getByText(
					items[1].label
				);
				await user.click(dropdownItem);

				expect(onChange).toHaveBeenCalled();
				expect(onChange).toHaveBeenCalledTimes(1);
				expect(onChange).toHaveBeenCalledWith(items[1].value);
			});
			test('click on an item does not automatically update the value of the select', async () => {
				const label = 'Select an item';
				const onChange = jest.fn();
				const { user } = setup(
					<Select items={items} label={label} onChange={onChange} selection={items[0]} />
				);

				await user.click(screen.getByText(label));
				await user.click(screen.getByText(items[1].label));

				expect(screen.queryByText(items[1].label)).not.toBeInTheDocument();
			});
			test('If the value change, the new value is shown as the selected one', () => {
				const label = 'Select an item';
				const onChange = jest.fn();
				const { rerender } = setup(
					<Select items={items} label={label} onChange={onChange} selection={items[0]} />
				);
				expect(screen.getByText(label)).toBeVisible();
				expect(screen.getByText(items[0].label)).toBeVisible();
				rerender(<Select items={items} label={label} onChange={onChange} selection={items[1]} />);
				expect(screen.queryByText(items[0].label)).not.toBeInTheDocument();
				expect(screen.getByText(items[1].label)).toBeVisible();
			});
		});
		describe('uncontrolled mode', () => {
			test('If there is not a default selection only label is visible, onchange is not called', () => {
				const label = 'Select an item';
				const onChange = jest.fn();
				setup(<Select items={items} label={label} onChange={onChange} />);

				// label is visible
				expect(screen.getByText(label)).toBeInTheDocument();
				expect(screen.getByText(label)).toBeVisible();

				// there is no default selection
				forEach(items, (item) => {
					expect(screen.queryByText(item.label)).not.toBeInTheDocument();
				});

				// onChange is not called
				expect(onChange).not.toHaveBeenCalled();
			});
			test('If there is a default selection label and selected item are visible, onchange is not called', () => {
				const label = 'Select an item';
				const onChange = jest.fn();
				setup(
					<Select items={items} label={label} onChange={onChange} defaultSelection={items[0]} />
				);

				// label is visible
				expect(screen.getByText(label)).toBeInTheDocument();
				expect(screen.getByText(label)).toBeVisible();

				// default selection
				expect(screen.getByText(items[0].label)).toBeInTheDocument();

				// onChange is not called
				expect(onChange).not.toHaveBeenCalled();
			});
			test('onChange is not called if the user clicks on the item with the same value as the selected one', async () => {
				const label = 'Select an item';
				const onChange = jest.fn();
				const { user } = setup(
					<Select items={items} label={label} onChange={onChange} defaultSelection={items[0]} />
				);

				await user.click(screen.getByText(label));

				const dropdownItem = within(screen.getByTestId(SELECTORS.dropdown)).getByText(
					items[0].label
				);
				await user.click(dropdownItem);

				expect(onChange).not.toHaveBeenCalled();
			});
			test('onChange is called if the user clicks on an item with a different value from the selected one', async () => {
				const label = 'Select an item';
				const onChange = jest.fn();
				const { user } = setup(
					<Select items={items} label={label} onChange={onChange} defaultSelection={items[0]} />
				);

				await user.click(screen.getByText(label));

				const dropdownItem = within(screen.getByTestId(SELECTORS.dropdown)).getByText(
					items[1].label
				);
				await user.click(dropdownItem);

				expect(onChange).toBeCalled();
				expect(onChange).toBeCalledTimes(1);
				expect(onChange).toHaveBeenCalledWith(items[1].value);
			});
			test('click on an item automatically update the value of the select', async () => {
				const label = 'Select an item';
				const onChange = jest.fn();
				const { user } = setup(
					<Select items={items} label={label} onChange={onChange} defaultSelection={items[0]} />
				);

				await user.click(screen.getByText(label));
				await user.click(screen.getByText(items[1].label));

				expect(screen.getByText(items[1].label)).toBeInTheDocument();
			});
			test('If the default value change, the new value is not shown as the selected one', () => {
				const label = 'Select an item';
				const onChange = jest.fn();
				const { rerender } = setup(
					<Select items={items} label={label} onChange={onChange} defaultSelection={items[0]} />
				);
				expect(screen.getByText(label)).toBeVisible();
				expect(screen.getByText(items[0].label)).toBeVisible();
				rerender(
					<Select items={items} label={label} onChange={onChange} defaultSelection={items[1]} />
				);
				expect(screen.getByText(items[0].label)).toBeInTheDocument();
				expect(screen.queryByText(items[1].label)).not.toBeInTheDocument();
			});
		});
	});
	describe('multiple selection ', () => {
		test('there is an "All" item available', async () => {
			const label = 'Select an item';
			const onChange = jest.fn();
			const { user } = setup(<Select multiple items={items} label={label} onChange={onChange} />);

			await user.click(screen.getByText(label));
			expect(screen.getByText('All')).toBeInTheDocument();
			expect(screen.getByText('All')).toBeVisible();
		});
		test('clicking "All" item when not all the enabled items are selected, will select them all ignoring the disabled', async () => {
			const label = 'Select an item';
			const onChange = jest.fn();
			const { user } = setup(
				<Select multiple items={extendedItems} label={label} onChange={onChange} />
			);

			await user.click(screen.getByText(label));
			await user.click(screen.getByText('All'));

			expect(onChange).toHaveBeenCalledWith(items);
		});
		test('clicking "All" item when all the enabled items are selected, will de-select them all ignoring the disabled', async () => {
			const label = 'Select an item';
			const onChange = jest.fn();
			const { user } = setup(
				<Select
					multiple
					items={extendedItems}
					label={label}
					onChange={onChange}
					defaultSelection={extendedItems}
				/>
			);

			await user.click(screen.getByText(label));
			await user.click(screen.getByText('All'));

			expect(onChange).toHaveBeenCalledWith([]);
		});
		test('if a disabled item is already selected, it cannot be de-selected', async () => {
			const label = 'Select an item';
			const onChange = jest.fn();
			const { user } = setup(
				<Select
					multiple
					items={extendedItems}
					label={label}
					onChange={onChange}
					defaultSelection={[extendedItems[5]]}
				/>
			);
			await user.click(screen.getByText(label));

			const dropdownItem = within(screen.getByTestId(SELECTORS.dropdown)).getByText(
				extendedItems[5].label
			);
			await user.click(dropdownItem);

			await user.click(screen.getByText(extendedItems[2].label));

			expect(
				screen.getByText(`${extendedItems[5].label}, ${extendedItems[2].label}`)
			).toBeInTheDocument();
		});
		describe('controlled mode', () => {
			test('label is visible, items are selected and onChange is not called', () => {
				const label = 'Select an item';
				const onChange = jest.fn();
				const selection = slice(items, 0, 2);
				const selectedLabel = map(selection, 'label').join(', ');
				setup(
					<Select multiple items={items} label={label} onChange={onChange} selection={selection} />
				);

				// label is visible
				expect(screen.getByText(label)).toBeInTheDocument();
				expect(screen.getByText(label)).toBeVisible();

				// first two items composes the label
				expect(screen.getByText(selectedLabel)).toBeInTheDocument();

				// onChange is not called
				expect(onChange).not.toHaveBeenCalled();
			});
			test('clicking on a selected item will not automatically remove it from selected ones', async () => {
				const label = 'Select an item';
				const onChange = jest.fn();
				const selectedLabel = map(items, 'label').join(', ');
				const { user } = setup(
					<Select multiple items={items} label={label} onChange={onChange} selection={items} />
				);

				await user.click(screen.getByText(label));
				await user.click(screen.getByText(items[2].label));

				expect(onChange).toHaveBeenCalledWith(reject(items, ['label', items[2].label]));
				expect(screen.getByText(selectedLabel)).toBeInTheDocument();
			});
			test('If the value change, the new value is shown as the selected one', () => {
				const label = 'Select an item';
				const onChange = jest.fn();
				const selectedLabel = map(items, 'label').join(', ');

				const { rerender } = setup(
					<Select multiple items={items} label={label} onChange={onChange} selection={items} />
				);
				expect(screen.getByText(label)).toBeVisible();
				expect(screen.getByText(selectedLabel)).toBeVisible();
				rerender(
					<Select multiple items={items} label={label} onChange={onChange} selection={[items[1]]} />
				);
				expect(screen.queryByText(selectedLabel)).not.toBeInTheDocument();
				expect(screen.getByText(items[1].label)).toBeVisible();
			});
		});
		describe('uncontrolled mode', () => {
			test('click on an item automatically update the value of the select', async () => {
				const label = 'Select an item';
				const onChange = jest.fn();
				const previousSelectedLabel = map(items, 'label').join(', ');
				const nextSelectedLabel = map(reject(items, ['label', items[1].label]), 'label').join(', ');
				const { user } = setup(
					<Select
						multiple
						items={items}
						label={label}
						onChange={onChange}
						defaultSelection={items}
					/>
				);

				expect(screen.getByText(previousSelectedLabel)).toBeInTheDocument();

				await user.click(screen.getByText(label));
				await user.click(screen.getByText(items[1].label));

				expect(screen.getByText(nextSelectedLabel)).toBeInTheDocument();
			});
			test('If the default value change, the new value is not shown as the selected one', async () => {
				const label = 'Select an item';
				const onChange = jest.fn();
				const selectedLabel = map(items, 'label').join(', ');
				const { rerender } = setup(
					<Select
						multiple
						items={items}
						label={label}
						onChange={onChange}
						defaultSelection={items}
					/>
				);

				expect(screen.getByText(selectedLabel)).toBeInTheDocument();

				rerender(
					<Select multiple items={items} label={label} onChange={onChange} defaultSelection={[]} />
				);

				expect(screen.getByText(selectedLabel)).toBeInTheDocument();
			});
		});
	});

	test('should accept a value different from a string', async () => {
		type ValueType = Record<`key${number}`, string>;
		const onChangeFn = jest.fn<
			ReturnType<SingleSelectionOnChange<ValueType>>,
			Parameters<SingleSelectionOnChange<ValueType>>
		>();
		const itemsForSelect: SelectItem<ValueType>[] = [
			{
				label: 'item1',
				value: {
					key1: 'item1-value1',
					key2: 'item1-value2'
				}
			},
			{
				label: 'item2',
				value: {
					key1: 'item1-value1',
					key2: 'item1-value2'
				}
			}
		];
		const { user } = setup(
			<Select
				label={'Label'}
				onChange={onChangeFn}
				items={itemsForSelect}
				defaultSelection={itemsForSelect[0]}
			/>
		);

		await user.click(screen.getByText('Label'));
		await user.click(screen.getByText('item2'));
		expect(onChangeFn).toHaveBeenCalledWith(itemsForSelect[1].value);
	});
});
