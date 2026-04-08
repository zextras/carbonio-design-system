/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { addMonths, format, startOfMonth } from 'date-fns';

import type { DateTimePickerProps } from './DateTimePicker';
import { DateTimePicker } from './DateTimePicker';
import { ICONS, SELECTORS } from '../../../tests/constants';
import { screen, setup, within } from '../../../tests/utils';
import { Button } from '../../basic/button/Button';

const DEFAULT_DATE_FORMAT = 'MMMM d, yyyy h:mm aa';

describe('DateTimePicker', () => {
	function getDatePickerHeader(date: Date | number): string {
		return format(date, 'LLLL yyyy');
	}
	describe('With default input component', () => {
		test('Render a DateTimePicker with an input', async () => {
			setup(<DateTimePicker label={'The label'} />);
			expect(screen.getByRole('textbox', { name: /the label/i })).toBeVisible();
			expect(
				screen.getByRoleWithIcon('button', { icon: ICONS.datePickerShowAction })
			).toBeVisible();
		});

		it('should render the component without invoking onChange', async () => {
			const onChangeFn = vi.fn();
			const { user } = setup(<DateTimePicker label={'label'} onChange={onChangeFn} />);
			expect(onChangeFn).not.toHaveBeenCalled();
		});

		test.each([
			[
				{
					label: 'label',
					defaultValue: null
				}
			],
			[
				{
					label: 'label',
					defaultValue: new Date(2011, 5, 2)
				}
			],
			[
				{
					label: 'label',
					defaultValue: new Date(2011, 5, 2),
					selected: null
				}
			],
			[
				{
					label: 'label',
					defaultValue: new Date(2011, 5, 2),
					selected: new Date(2012, 5, 2)
				}
			]
		])(
			'With props %p - When a new value is set, onChange prop is called once',
			async (props: DateTimePickerProps) => {
				const onChangeFn = vi.fn();
				const propsToUse: DateTimePickerProps = {
					...props,
					onChange: onChangeFn
				};
				const { user } = setup(<DateTimePicker {...propsToUse} />);
				const inputElement = screen.getByRole('textbox');
				const now = new Date();
				const dateString = format(now, 'MM/dd/yyyy HH:mm');
				const parsedDateString = new Date(Date.parse(dateString));
				await user.type(inputElement, dateString);
				await user.keyboard('[Enter]');
				expect(onChangeFn).toHaveBeenCalledTimes(1);
			}
		);

		it('should update when defaultValue changes', async () => {
			const onChangeFn = vi.fn();
			const firstDate = new Date(2010, 0, 1);
			const { user, rerender } = setup(
				<DateTimePicker label={'label'} defaultValue={firstDate} onChange={onChangeFn} />
			);
			expect(screen.getByRole('textbox')).toHaveValue('January 1, 2010 12:00 AM');

			const secondDate = new Date(2025, 0, 1);
			rerender(<DateTimePicker label={'label'} defaultValue={secondDate} onChange={onChangeFn} />);

			expect(screen.getByRole('textbox')).toHaveValue('January 1, 2025 12:00 AM');
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
			const onChangeFn = vi.fn();
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
			const onChangeFn = vi.fn();
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
			const onChangeFn = vi.fn();
			const { user } = setup(
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
			await user.click(screen.getByRoleWithIcon('button', { icon: ICONS.datePickerClearAction }));
			await user.click(screen.getByText('Blur'));
			expect(onChangeFn).toHaveBeenLastCalledWith(null);
			expect(inputElement).toHaveValue('');
		});

		it('should disable the "show calendar" action if component is disabled', () => {
			setup(<DateTimePicker label={'Validate input'} disabled />);
			expect(
				screen.getByRoleWithIcon('button', { icon: ICONS.datePickerShowAction })
			).toBeDisabled();
		});

		it('should disable the "clear" action if component is disabled', () => {
			setup(
				<DateTimePicker label={'Validate input'} defaultValue={new Date()} isClearable disabled />
			);
			expect(
				screen.getByRoleWithIcon('button', { icon: ICONS.datePickerClearAction })
			).toBeDisabled();
		});
	});

	describe('With default chip input component', () => {
		test('Render a DateTimePicker with a chip input', async () => {
			const now = new Date();
			const dateFormat = 'dd/MM/yyyy HH:mm';
			const nowString = format(now, dateFormat);
			setup(
				<DateTimePicker
					label={'The label'}
					enableChips
					defaultValue={now}
					dateFormat={dateFormat}
				/>
			);
			expect(screen.getByRole('textbox', { name: /the label/i })).toBeVisible();
			expect(
				screen.getByRoleWithIcon('button', { icon: ICONS.datePickerShowAction })
			).toBeVisible();
			expect(screen.getByText(nowString)).toBeVisible();
			expect(screen.getByRoleWithIcon('button', { icon: ICONS.close })).toBeVisible();
		});

		test('Click on the input opens the picker', async () => {
			const { user } = setup(<DateTimePicker label={'The label'} enableChips />);
			await user.click(screen.getByRole('textbox'));
			const datePicker = await screen.findByText(getDatePickerHeader(Date.now()));
			expect(datePicker).toBeVisible();
		});

		test('Click on calendar icon inside the input opens the picker', async () => {
			const { user } = setup(<DateTimePicker label={'The label'} enableChips />);
			await user.click(screen.getByRoleWithIcon('button', { icon: ICONS.datePickerShowAction }));
			const datePicker = await screen.findByText(getDatePickerHeader(Date.now()));
			expect(datePicker).toBeVisible();
		});

		test('Selection of a date from the picker creates the chip', async () => {
			const { user } = setup(<DateTimePicker label={'ChipInput DatePicker'} enableChips />);
			await user.click(screen.getByRoleWithIcon('button', { icon: ICONS.datePickerShowAction }));
			await user.click(screen.getAllByText('1')[0]);
			const expectedDate = new Date();
			expectedDate.setDate(1);
			expectedDate.setHours(0, 0, 0, 0);
			const expectedDateString = format(expectedDate, DEFAULT_DATE_FORMAT);
			expect(screen.getByText(expectedDateString)).toBeVisible();
			expect(screen.getByRoleWithIcon('button', { icon: ICONS.close })).toBeVisible();
		});

		test('Selection of a time from the picker creates the chip', async () => {
			const { user } = setup(<DateTimePicker label={'ChipInput DatePicker'} enableChips />);
			await user.click(screen.getByRoleWithIcon('button', { icon: ICONS.datePickerShowAction }));
			await user.click(screen.getByText('11:00 AM'));
			const expectedDate = new Date();
			expectedDate.setHours(11, 0, 0, 0);
			const expectedDateString = format(expectedDate, DEFAULT_DATE_FORMAT);
			expect(screen.getByText(expectedDateString)).toBeVisible();
			expect(screen.getByRoleWithIcon('button', { icon: ICONS.close })).toBeVisible();
		});

		test('Valid value typed in the input is validated and set as date', async () => {
			const { user } = setup(<DateTimePicker label={'Validate input'} enableChips />);
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
			expect(screen.getByRoleWithIcon('button', { icon: ICONS.close })).toBeVisible();
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
			const onChangeFn = vi.fn();
			const { user } = setup(
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
			expect(screen.getByRoleWithIcon('button', { icon: ICONS.close })).toBeVisible();
		});

		test('When the input is cleared, onChange prop is called with the null value', async () => {
			const onChangeFn = vi.fn();
			const { user } = setup(
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
			await user.click(screen.getByRoleWithIcon('button', { icon: ICONS.close }));
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
			expect(screen.queryByRoleWithIcon('button', { icon: ICONS.close })).not.toBeInTheDocument();
			expect(inputElement).toHaveValue('');
		});

		it('should disable the "show calendar" action if component is disabled', () => {
			setup(<DateTimePicker label={'Validate input'} enableChips disabled />);
			expect(
				screen.getByRoleWithIcon('button', { icon: ICONS.datePickerShowAction })
			).toBeDisabled();
		});

		it('should disable the chip if component is disabled', () => {
			setup(
				<DateTimePicker label={'Validate input'} enableChips disabled defaultValue={new Date()} />
			);
			expect(
				within(screen.getByTestId(SELECTORS.chip)).getByRoleWithIcon('button', {
					icon: ICONS.close
				})
			).toBeDisabled();
		});
	});

	describe('With custom input component', () => {
		const CustomComponent = React.forwardRef<
			HTMLDivElement,
			React.ComponentProps<NonNullable<DateTimePickerProps['CustomComponent']>>
		>(function CustomComponentFn({ value, onClick }, ref) {
			return (
				<Button
					onClick={(e) => {
						onClick?.(e);
					}}
					ref={ref}
					label={value || 'no value'}
				/>
			);
		});

		test('Custom component is rendered', () => {
			setup(
				<DateTimePicker
					label="picker label"
					showTimeSelect={false}
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
					showTimeSelect={false}
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
					showTimeSelect={false}
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
