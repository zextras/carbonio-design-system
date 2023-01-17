/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { ReactElement, useCallback, useState } from 'react';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { isNil } from 'lodash';

import { render } from '../../test-utils';
import { MultipleSelectionOnChange, Select, SelectItem, SingleSelectionOnChange } from './Select';

const items = [
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

type Props = {
	label: string;
	onChange: SingleSelectionOnChange;
	value?: number | undefined;
};

type MultipleProps = {
	label: string;
	onChange: MultipleSelectionOnChange;
	value?: SelectItem | undefined;
};

const ControlledSelect = ({ label, onChange, value }: Props): ReactElement => {
	const [selected, setSelected] = useState<number | undefined>(value);
	const _onChange = useCallback<SingleSelectionOnChange>(
		(ev: string | null) => {
			onChange(ev);
			setSelected(4);
		},
		[onChange]
	);
	return (
		<Select
			items={items}
			label={label}
			onChange={_onChange}
			selection={!isNil(selected) ? items[selected - 1] : undefined}
		/>
	);
};
const MultipleControlledSelect = ({ label, onChange, value }: MultipleProps): ReactElement => {
	const [selected, setSelected] = useState<SelectItem | undefined>(value);
	const _onChange = useCallback<MultipleSelectionOnChange>(
		(ev: SelectItem[]) => {
			onChange(ev);
			setSelected(items[4]);
		},
		[onChange]
	);
	return (
		<Select
			multiple
			items={items}
			label={label}
			onChange={_onChange}
			selection={!isNil(selected) ? [selected] : undefined}
		/>
	);
};
describe('Select', () => {
	describe('single selection ', () => {
		test('uncontrolled mode - no default selection', async () => {
			const label = 'Select an item';
			const onChange = jest.fn();
			render(<Select items={items} label={label} onChange={onChange} />);

			// render the label on screen
			expect(screen.getByText(label)).toBeInTheDocument();
			expect(screen.getByText(label)).toBeVisible();

			// default selection is not visible on screen
			expect(screen.queryByText(items[0].label)).not.toBeInTheDocument();
			expect(screen.queryByText(items[1].label)).not.toBeInTheDocument();
			expect(screen.queryByText(items[2].label)).not.toBeInTheDocument();
			expect(screen.queryByText(items[3].label)).not.toBeInTheDocument();
			expect(screen.queryByText(items[4].label)).not.toBeInTheDocument();

			// doesn't call the onChange
			expect(onChange).not.toHaveBeenCalled();

			// clicking on the Select renders the dropdown items
			await userEvent.click(screen.getByText(label));

			expect(screen.getByText(items[0].label)).toBeInTheDocument();
			expect(screen.getByText(items[1].label)).toBeInTheDocument();
			expect(screen.getByText(items[2].label)).toBeInTheDocument();
			expect(screen.getByText(items[3].label)).toBeInTheDocument();
			expect(screen.getByText(items[4].label)).toBeInTheDocument();

			// clicking on an item the onChange is triggered and the value changes
			await userEvent.click(screen.getByText(items[0].label));
			expect(onChange).toHaveBeenCalled();
			expect(onChange).toHaveBeenCalledTimes(1);
			expect(onChange).toHaveBeenCalledWith(items[0].value);

			// only the selected value is visible on screen
			expect(screen.getByText(items[0].label)).toBeInTheDocument();
			expect(screen.getByText(items[0].label)).toBeVisible();
		});
		test('uncontrolled mode - default selection', async () => {
			const label = 'Select an item';
			const onChange = jest.fn();
			render(
				<Select items={items} label={label} onChange={onChange} defaultSelection={items[0]} />
			);

			// render the label on screen
			expect(screen.getByText(label)).toBeInTheDocument();
			expect(screen.getByText(label)).toBeVisible();

			// default selection is visible on screen
			expect(screen.getByText(items[0].label)).toBeInTheDocument();

			// doesn't call the onChange
			expect(onChange).not.toHaveBeenCalled();
		});
		test('controlled mode - no default selection', async () => {
			const label = 'Select an item';
			const onChange = jest.fn();
			render(<ControlledSelect label={label} onChange={onChange} />);

			// render the label on screen
			expect(screen.getByText(label)).toBeInTheDocument();
			expect(screen.getByText(label)).toBeVisible();

			// default selection is not visible on screen
			expect(screen.queryByText(items[0].label)).not.toBeInTheDocument();
			expect(screen.queryByText(items[1].label)).not.toBeInTheDocument();
			expect(screen.queryByText(items[2].label)).not.toBeInTheDocument();
			expect(screen.queryByText(items[3].label)).not.toBeInTheDocument();
			expect(screen.queryByText(items[4].label)).not.toBeInTheDocument();

			// doesn't call the onChange
			expect(onChange).not.toHaveBeenCalled();

			// clicking on the Select renders the dropdown items
			await userEvent.click(screen.getByText(label));

			expect(screen.getByText(items[0].label)).toBeInTheDocument();
			expect(screen.getByText(items[1].label)).toBeInTheDocument();
			expect(screen.getByText(items[2].label)).toBeInTheDocument();
			expect(screen.getByText(items[3].label)).toBeInTheDocument();
			expect(screen.getByText(items[4].label)).toBeInTheDocument();

			// clicking on an item the onChange is triggered
			await userEvent.click(screen.getByText(items[0].label));
			expect(onChange).toHaveBeenCalled();
			expect(onChange).toHaveBeenCalledTimes(1);

			// the selected value depends from the outer value and not from the selected item
			expect(onChange).toHaveBeenCalledWith(items[0].value);
			expect(screen.getByText(items[3].label)).toBeInTheDocument();
		});
		test('controlled mode - default selection', async () => {
			const label = 'Select an item';
			const onChange = jest.fn();
			render(<ControlledSelect label={label} onChange={onChange} value={1} />);

			// render the label on screen
			expect(screen.getByText(label)).toBeInTheDocument();
			expect(screen.getByText(label)).toBeVisible();

			// default selection is visible on screen
			expect(screen.getByText(items[0].label)).toBeInTheDocument();

			// doesn't call the onChange
			expect(onChange).not.toHaveBeenCalled();
		});
	});
	describe('multiple selection ', () => {
		test('uncontrolled mode - no default selection', async () => {
			const label = 'Select an item';
			const onChange = jest.fn();
			render(<Select items={items} label={label} onChange={onChange} multiple />);

			// render the label on screen
			expect(screen.getByText(label)).toBeInTheDocument();
			expect(screen.getByText(label)).toBeVisible();

			// default selection is not visible on screen
			expect(screen.queryByText(items[0].label)).not.toBeInTheDocument();
			expect(screen.queryByText(items[1].label)).not.toBeInTheDocument();
			expect(screen.queryByText(items[2].label)).not.toBeInTheDocument();
			expect(screen.queryByText(items[3].label)).not.toBeInTheDocument();
			expect(screen.queryByText(items[4].label)).not.toBeInTheDocument();

			// doesn't call the onChange
			expect(onChange).not.toHaveBeenCalled();

			// clicking on the Select renders the dropdown items
			await userEvent.click(screen.getByText(label));

			expect(screen.getByText(items[0].label)).toBeInTheDocument();
			expect(screen.getByText(items[1].label)).toBeInTheDocument();
			expect(screen.getByText(items[2].label)).toBeInTheDocument();
			expect(screen.getByText(items[3].label)).toBeInTheDocument();
			expect(screen.getByText(items[4].label)).toBeInTheDocument();

			// clicking on an item the onChange is triggered and the value changes
			await userEvent.click(screen.getByText(items[0].label));
			expect(onChange).toHaveBeenCalled();
			expect(onChange).toHaveBeenCalledTimes(1);
			expect(onChange).toHaveBeenCalledWith([items[0]]);

			// all the values are visible on screen because the dropdown stays open
			expect(screen.getAllByText(items[0].label)).toHaveLength(2);
			expect(screen.getByText(items[1].label)).toBeInTheDocument();
			expect(screen.getByText(items[2].label)).toBeInTheDocument();
			expect(screen.getByText(items[3].label)).toBeInTheDocument();
			expect(screen.getByText(items[4].label)).toBeInTheDocument();
		});
		test('uncontrolled mode - default selection', async () => {
			const label = 'Select an item';
			const onChange = jest.fn();
			render(
				<Select
					multiple
					items={items}
					label={label}
					onChange={onChange}
					defaultSelection={[items[0]]}
				/>
			);

			// render the label on screen
			expect(screen.getByText(label)).toBeInTheDocument();
			expect(screen.getByText(label)).toBeVisible();

			// default selection is visible on screen
			expect(screen.getByText(items[0].label)).toBeInTheDocument();

			// doesn't call the onChange
			expect(onChange).not.toHaveBeenCalled();
		});
		test('controlled mode - no default selection', async () => {
			const label = 'Select an item';
			const onChange = jest.fn();
			render(<MultipleControlledSelect label={label} onChange={onChange} />);

			// render the label on screen
			expect(screen.getByText(label)).toBeInTheDocument();
			expect(screen.getByText(label)).toBeVisible();

			// default selection is not visible on screen
			expect(screen.queryByText(items[0].label)).not.toBeInTheDocument();
			expect(screen.queryByText(items[1].label)).not.toBeInTheDocument();
			expect(screen.queryByText(items[2].label)).not.toBeInTheDocument();
			expect(screen.queryByText(items[3].label)).not.toBeInTheDocument();
			expect(screen.queryByText(items[4].label)).not.toBeInTheDocument();

			// doesn't call the onChange
			expect(onChange).not.toHaveBeenCalled();

			// clicking on the Select renders the dropdown items
			await userEvent.click(screen.getByText(label));

			expect(screen.getByText(items[0].label)).toBeInTheDocument();
			expect(screen.getByText(items[1].label)).toBeInTheDocument();
			expect(screen.getByText(items[2].label)).toBeInTheDocument();
			expect(screen.getByText(items[3].label)).toBeInTheDocument();
			expect(screen.getByText(items[4].label)).toBeInTheDocument();

			// clicking on an item the onChange is triggered
			await userEvent.click(screen.getByText(items[0].label));
			expect(onChange).toHaveBeenCalled();
			expect(onChange).toHaveBeenCalledTimes(1);

			// the selected value depends from the outer value and not from the selected item
			expect(onChange).toHaveBeenCalledWith([items[0]]);
			expect(screen.getByText(items[3].label)).toBeInTheDocument();
		});
		test('controlled mode - default selection', async () => {
			const label = 'Select an item';
			const onChange = jest.fn();
			render(<MultipleControlledSelect label={label} onChange={onChange} value={items[1]} />);

			// render the label on screen
			expect(screen.getByText(label)).toBeInTheDocument();
			expect(screen.getByText(label)).toBeVisible();

			// default selection is visible on screen
			expect(screen.getByText(items[1].label)).toBeInTheDocument();

			// doesn't call the onChange
			expect(onChange).not.toHaveBeenCalled();
		});
	});
});
