/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { screen, act } from '@testing-library/react';

import { Checkbox } from './Checkbox';
import { setup } from '../../test-utils';
import { ICONS } from '../../testUtils/constants';

describe('Checkbox', () => {
	test('Render a checkbox with a label', () => {
		const onChange = jest.fn();
		setup(<Checkbox label="Checkbox label" />);
		expect(onChange).not.toHaveBeenCalled();
		expect(screen.getByText(/checkbox label/i)).toBeVisible();
		expect(screen.getByTestId(ICONS.checkboxOff)).toBeVisible();
	});

	test('Click on the checkbox', async () => {
		const onChange = jest.fn();
		const { user } = setup(<Checkbox onChange={onChange} />);
		await act(async () => {
			await user.click(screen.getByTestId(ICONS.checkboxOff));
		});
		expect(onChange).toHaveBeenCalled();
		expect(screen.getByTestId(ICONS.checkboxOn)).toBeVisible();
	});
});
