/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { format, addMonths, startOfMonth } from 'date-fns';

import { render } from '../../test-utils';
import { ICONS } from '../../testUtils/constants';
import { DateTimePicker } from './DateTimePicker';

describe('DateTimePicker', () => {
	test('Render a DateTimePicker with an input', async () => {
		const { getByRoleWithIcon } = render(<DateTimePicker label={'The label'} />);
		expect(screen.getByRole('textbox', { name: /the label/i })).toBeVisible();
		expect(getByRoleWithIcon('button', { icon: ICONS.datePickerAction })).toBeVisible();
	});

	test('Click on the input opens the picker', async () => {
		render(<DateTimePicker label={'The label'} />);
		userEvent.click(screen.getByTestId(ICONS.datePickerAction));
		const currentMonthAndYear = format(Date.now(), 'LLLL yyyy');
		const datePicker = await screen.findByText(currentMonthAndYear);
		expect(datePicker).toBeVisible();
	});

	test('Click on the input opens the picker', async () => {
		render(<DateTimePicker label={'The label'} />);
		userEvent.click(screen.getByRole('textbox'));
		const currentMonthAndYear = format(Date.now(), 'LLLL yyyy');
		const datePicker = await screen.findByText(currentMonthAndYear);
		expect(datePicker).toBeVisible();
	});

	test('Click on calendar icon inside the input opens the picker', async () => {
		const { getByRoleWithIcon } = render(<DateTimePicker label={'The label'} />);
		userEvent.click(getByRoleWithIcon('button', { icon: ICONS.datePickerAction }));
		const currentMonthAndYear = format(Date.now(), 'LLLL yyyy');
		const datePicker = await screen.findByText(currentMonthAndYear);
		expect(datePicker).toBeVisible();
	});

	test('Valid value typed in the input is validated and set as date', () => {
		render(<DateTimePicker label={'Validate input'} />);
		const inputElement = screen.getByRole('textbox');
		const now = new Date();
		const firstOfNextMonth = addMonths(startOfMonth(now), 1);
		firstOfNextMonth.setHours(now.getHours());
		firstOfNextMonth.setMinutes(now.getMinutes());
		const dateString = format(firstOfNextMonth, 'MM/dd/yyyy HH:mm');
		userEvent.type(inputElement, dateString);
		userEvent.keyboard('[Enter]');
		const defaultFormat = 'MMMM d, yyyy h:mm aa';
		const expectedInputValue = format(firstOfNextMonth, defaultFormat);
		expect(inputElement).toHaveValue(expectedInputValue);
	});

	test('If an invalid value is typed in the input with a defaultValue, on select the value of the input is reset to the previous valid date', () => {
		const now = new Date();
		render(<DateTimePicker label={'Validate input'} defaultValue={now} />);
		const inputElement = screen.getByRole('textbox');
		const defaultFormat = 'MMMM d, yyyy h:mm aa';
		const defaultInputValue = format(now, defaultFormat);
		expect(inputElement).toHaveValue(defaultInputValue);
		userEvent.type(inputElement, 'invalid date format');
		userEvent.keyboard('[Enter]');
		expect(inputElement).toHaveValue(defaultInputValue);
	});

	test('If an invalid value is typed in the input without a default value, on select the value of the input is reset to be empty', () => {
		render(<DateTimePicker label={'Validate input'} />);
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toHaveValue('');
		userEvent.type(inputElement, 'invalid date format');
		userEvent.keyboard('[Enter]');
		expect(inputElement).toHaveValue('');
	});
});
