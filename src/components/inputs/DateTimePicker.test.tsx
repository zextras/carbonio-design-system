/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { act, screen } from '@testing-library/react';
import { format, addMonths, startOfMonth } from 'date-fns';
import { noop } from 'lodash';

import { DateTimePicker, DateTimePickerProps } from './DateTimePicker';
import { setup } from '../../test-utils';
import { ICONS } from '../../testUtils/constants';
import { Button } from '../basic/Button';

const DEFAULT_DATE_FORMAT = 'MMMM d, yyyy h:mm aa';

describe('DateTimePicker', () => {
	function getDatePickerHeader(date: Date | number): string {
		return format(date, 'LLLL yyyy');
	}
	describe('With default input component', () => {
		test('Render a DateTimePicker with an input', async () => {
			const { getByRoleWithIcon } = setup(<DateTimePicker label={'The label'} />);
			expect(screen.getByRole('textbox', { name: /the label/i })).toBeVisible();
			expect(getByRoleWithIcon('button', { icon: ICONS.datePickerShowAction })).toBeVisible();
		});

		test('Click on the input opens the picker', async () => {
			const { user } = setup(<DateTimePicker label={'The label'} />);
			await user.click(screen.getByRole('textbox'));
			const datePicker = await screen.findByText(getDatePickerHeader(Date.now()));
			expect(datePicker).toBeVisible();
		});

		test('Click on calendar icon inside the input opens the picker', async () => {
			const { getByRoleWithIcon, user } = setup(<DateTimePicker label={'The label'} />);
			await user.click(getByRoleWithIcon('button', { icon: ICONS.datePickerShowAction }));
			const datePicker = await screen.findByText(getDatePickerHeader(Date.now()));
			expect(datePicker).toBeVisible();
		});

		test('Valid value typed in the input is validated and set as date', async () => {
			const { user } = setup(<DateTimePicker label={'Validate input'} />);
			const inputElement = screen.getByRole('textbox');
			const now = new Date();
			const firstOfNextMonth = addMonths(startOfMonth(now), 1);
			firstOfNextMonth.setHours(now.getHours());
			firstOfNextMonth.setMinutes(now.getMinutes());
			const dateString = format(firstOfNextMonth, 'MM/dd/yyyy HH:mm');
			await user.type(inputElement, dateString);
			await screen.findAllByText(getDatePickerHeader(firstOfNextMonth));
			await user.keyboard('[Enter]');
			const expectedInputValue = format(firstOfNextMonth, DEFAULT_DATE_FORMAT);
			expect(inputElement).toHaveValue(expectedInputValue);
		});

		test('If an invalid value is typed in the input with a defaultValue, on select the value of the input is reset to the previous valid date', async () => {
			const now = new Date();
			const { user } = setup(<DateTimePicker label={'Validate input'} defaultValue={now} />);
			const inputElement = screen.getByRole('textbox');
			const defaultInputValue = format(now, DEFAULT_DATE_FORMAT);
			expect(inputElement).toHaveValue(defaultInputValue);
			await user.type(inputElement, 'invalid date format');
			await user.keyboard('[Enter]');
			expect(inputElement).toHaveValue(defaultInputValue);
		});

		test('If an invalid value is typed in the input without a default value, on select the value of the input is reset to be empty', async () => {
			const { user } = setup(<DateTimePicker label={'Validate input'} />);
			const inputElement = screen.getByRole('textbox');
			expect(inputElement).toHaveValue('');
			await user.type(inputElement, 'invalid date format');
			await user.keyboard('[Enter]');
			expect(inputElement).toHaveValue('');
		});

		test('When a new value is set, onChange prop is called with the new value', async () => {
			const onChangeFn = jest.fn();
			const { user } = setup(<DateTimePicker label={'label'} onChange={onChangeFn} />);
			const inputElement = screen.getByRole('textbox');
			const now = new Date();
			const dateString = format(now, 'MM/dd/yyyy HH:mm');
			const parsedDateString = new Date(Date.parse(dateString));
			await user.type(inputElement, dateString);
			await user.keyboard('[Enter]');
			expect(onChangeFn).toHaveBeenLastCalledWith(parsedDateString);
		});

		test('When the input is cleared, onChange prop is called with the null value', async () => {
			const onChangeFn = jest.fn();
			const { user } = setup(
				<>
					<DateTimePicker label={'label'} defaultValue={new Date()} onChange={onChangeFn} />
					<span>Blur</span>
				</>
			);
			const inputElement = screen.getByRole('textbox');
			await user.clear(inputElement);
			await user.keyboard('[Enter]');
			await user.click(screen.getByText('Blur'));
			expect(onChangeFn).toHaveBeenLastCalledWith(null);
			expect(inputElement).toHaveValue('');
		});

		test('When the value is cleared with the clear action, onChange prop is called with the null value and input is cleared', async () => {
			const onChangeFn = jest.fn();
			const { getByRoleWithIcon, user } = setup(
				<>
					<DateTimePicker
						label={'label'}
						defaultValue={new Date()}
						onChange={onChangeFn}
						isClearable
					/>
					<span>Blur</span>
				</>
			);
			const inputElement = screen.getByRole('textbox');
			await user.click(getByRoleWithIcon('button', { icon: ICONS.datePickerClearAction }));
			await user.click(screen.getByText('Blur'));
			expect(onChangeFn).toHaveBeenLastCalledWith(null);
			expect(inputElement).toHaveValue('');
		});
	});

	describe('With default chip input component', () => {
		test('Render a DateTimePicker with a chip input', async () => {
			const now = new Date();
			const dateFormat = 'dd/MM/yyyy HH:mm';
			const nowString = format(now, dateFormat);
			const { getByRoleWithIcon } = setup(
				<DateTimePicker
					label={'The label'}
					enableChips
					defaultValue={now}
					dateFormat={dateFormat}
				/>
			);
			expect(screen.getByRole('textbox', { name: /the label/i })).toBeVisible();
			expect(getByRoleWithIcon('button', { icon: ICONS.datePickerShowAction })).toBeVisible();
			expect(screen.getByText(nowString)).toBeVisible();
			expect(getByRoleWithIcon('button', { icon: ICONS.close })).toBeVisible();
		});

		test('Click on the input opens the picker', async () => {
			const { user } = setup(<DateTimePicker label={'The label'} enableChips />);
			await user.click(screen.getByRole('textbox'));
			const datePicker = await screen.findByText(getDatePickerHeader(Date.now()));
			expect(datePicker).toBeVisible();
		});

		test('Click on calendar icon inside the input opens the picker', async () => {
			const { getByRoleWithIcon, user } = setup(<DateTimePicker label={'The label'} enableChips />);
			await user.click(getByRoleWithIcon('button', { icon: ICONS.datePickerShowAction }));
			const datePicker = await screen.findByText(getDatePickerHeader(Date.now()));
			expect(datePicker).toBeVisible();
		});

		test('Selection of a date from the picker creates the chip', async () => {
			const { getByRoleWithIcon, user } = setup(
				<DateTimePicker label={'ChipInput DatePicker'} enableChips />
			);
			await user.click(getByRoleWithIcon('button', { icon: ICONS.datePickerShowAction }));
			await user.click(screen.getAllByText('1')[0]);
			const expectedDate = new Date();
			expectedDate.setDate(1);
			expectedDate.setHours(0, 0, 0, 0);
			const expectedDateString = format(expectedDate, DEFAULT_DATE_FORMAT);
			expect(screen.getByText(expectedDateString)).toBeVisible();
			expect(getByRoleWithIcon('button', { icon: ICONS.close })).toBeVisible();
		});

		test('Selection of a time from the picker creates the chip', async () => {
			const { getByRoleWithIcon, user } = setup(
				<DateTimePicker label={'ChipInput DatePicker'} enableChips />
			);
			await user.click(getByRoleWithIcon('button', { icon: ICONS.datePickerShowAction }));
			await user.click(screen.getByText('11:00 AM'));
			const expectedDate = new Date();
			expectedDate.setHours(11, 0, 0, 0);
			const expectedDateString = format(expectedDate, DEFAULT_DATE_FORMAT);
			expect(screen.getByText(expectedDateString)).toBeVisible();
			expect(getByRoleWithIcon('button', { icon: ICONS.close })).toBeVisible();
		});

		test('Valid value typed in the input is validated and set as date', async () => {
			const { getByRoleWithIcon, user } = setup(
				<DateTimePicker label={'Validate input'} enableChips />
			);
			const inputElement = screen.getByRole('textbox');
			const now = new Date();
			const firstOfNextMonth = addMonths(startOfMonth(now), 1);
			firstOfNextMonth.setHours(now.getHours());
			firstOfNextMonth.setMinutes(now.getMinutes());
			const dateString = format(firstOfNextMonth, 'MM/dd/yyyy HH:mm');
			await user.type(inputElement, dateString);
			await screen.findAllByText(getDatePickerHeader(firstOfNextMonth));
			await user.keyboard('[Enter]');
			const expectedInputValue = format(firstOfNextMonth, DEFAULT_DATE_FORMAT);
			expect(screen.getByText(expectedInputValue)).toBeVisible();
			expect(getByRoleWithIcon('button', { icon: ICONS.close })).toBeVisible();
		});

		test('Input is disabled if a default value is present', () => {
			const now = new Date();
			setup(<DateTimePicker label={'Validate input'} defaultValue={now} enableChips />);
			expect(screen.getByRole('textbox')).toBeDisabled();
		});

		test('Input becomes disabled if a value is set', async () => {
			const { user } = setup(<DateTimePicker label={'Validate input'} enableChips />);
			const inputElement = screen.getByRole('textbox');
			expect(inputElement).toBeEnabled();
			await user.click(inputElement);
			await user.click(screen.getAllByText('1')[0]);
			act(() => {
				jest.runOnlyPendingTimers();
			});
			expect(inputElement).toBeDisabled();
		});

		test('If an invalid value is typed, on select the value of the input is reset to be empty', async () => {
			const { user } = setup(<DateTimePicker label={'Validate input'} enableChips />);
			const inputElement = screen.getByRole('textbox');
			expect(inputElement).toHaveValue('');
			await user.type(inputElement, 'invalid date format');
			await user.keyboard('[Enter]');
			expect(inputElement).toHaveValue('');
		});

		test('When a new value is set, onChange prop is called with the new value', async () => {
			const onChangeFn = jest.fn();
			const { getByRoleWithIcon, user } = setup(
				<>
					<DateTimePicker label={'label'} onChange={onChangeFn} enableChips />
					<span>Blur</span>
				</>
			);
			const inputElement = screen.getByRole('textbox');
			const now = new Date();
			const firstOfNextMonth = addMonths(startOfMonth(now), 1);
			firstOfNextMonth.setHours(now.getHours());
			firstOfNextMonth.setMinutes(now.getMinutes());
			const dateString = format(firstOfNextMonth, 'MM/dd/yyyy HH:mm');
			const parsedDateString = new Date(Date.parse(dateString));
			await user.type(inputElement, dateString);
			await screen.findAllByText(getDatePickerHeader(firstOfNextMonth));
			await user.keyboard('[Enter]');
			await user.click(screen.getByText('Blur'));
			expect(onChangeFn).toHaveBeenLastCalledWith(parsedDateString);
			expect(screen.getByText(format(parsedDateString, DEFAULT_DATE_FORMAT))).toBeVisible();
			expect(getByRoleWithIcon('button', { icon: ICONS.close })).toBeVisible();
		});

		test('When the input is cleared, onChange prop is called with the null value', async () => {
			const onChangeFn = jest.fn();
			const { getByRoleWithIcon, queryByRoleWithIcon, user } = setup(
				<>
					<DateTimePicker
						label={'label'}
						defaultValue={new Date()}
						onChange={onChangeFn}
						enableChips
					/>
					<span>Blur</span>
				</>
			);
			const inputElement = screen.getByRole('textbox');
			await user.click(getByRoleWithIcon('button', { icon: ICONS.close }));
			expect(onChangeFn).toHaveBeenLastCalledWith(null);
			const now = new Date();
			const firstOfNextMonth = addMonths(startOfMonth(now), 1);
			firstOfNextMonth.setHours(now.getHours());
			firstOfNextMonth.setMinutes(now.getMinutes());
			const dateString = format(firstOfNextMonth, 'MM/dd/yyyy HH:mm');
			await user.type(inputElement, dateString);
			await user.clear(inputElement);
			await user.click(screen.getByText('Blur'));
			expect(onChangeFn).toHaveBeenLastCalledWith(null);
			expect(queryByRoleWithIcon('button', { icon: ICONS.close })).not.toBeInTheDocument();
			expect(inputElement).toHaveValue('');
		});
	});

	describe('With custom input component', () => {
		const CustomComponent = React.forwardRef<
			HTMLDivElement,
			React.ComponentProps<NonNullable<DateTimePickerProps['CustomComponent']>>
		>(function CustomComponentFn({ value, onClick = noop }, ref) {
			return <Button onClick={onClick} ref={ref} label={value || 'no value'} />;
		});

		test('Custom component is setuped', () => {
			setup(
				<DateTimePicker
					label="picker label"
					includeTime={false}
					dateFormat="dd/MM/yyyy"
					CustomComponent={CustomComponent}
				/>
			);

			expect(screen.getByRole('button', { name: /no value/i })).toBeVisible();
			expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
			expect(screen.queryByText(/picker label/i)).not.toBeInTheDocument();
		});

		test('On click is passed to the component to open the picker', async () => {
			const { user } = setup(
				<DateTimePicker
					label="picker label"
					includeTime={false}
					dateFormat="dd/MM/yyyy"
					CustomComponent={CustomComponent}
				/>
			);

			await user.click(screen.getByRole('button'));
			expect(screen.getByText(getDatePickerHeader(Date.now()))).toBeVisible();
		});

		test('Updated value is passed to the custom component', async () => {
			const dateFormat = 'dd/MM/yyyy';
			const { user } = setup(
				<DateTimePicker
					label="picker label"
					includeTime={false}
					dateFormat={dateFormat}
					CustomComponent={CustomComponent}
				/>
			);

			await user.click(screen.getByRole('button'));
			await user.click(screen.getAllByText('1')[0]);
			expect(
				screen.getByRole('button', { name: format(startOfMonth(Date.now()), dateFormat) })
			).toBeVisible();
		});
	});
});
