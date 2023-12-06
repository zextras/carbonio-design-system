/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { screen } from '@testing-library/react';

import { MultiButton, MultiButtonProps } from './MultiButton';
import { setup } from '../../test-utils';
import { ICONS } from '../../testUtils/constants';
import { TIMERS } from '../constants';

describe('MultiButton', () => {
	test('Click on primary button does not open dropdown', async () => {
		const items: MultiButtonProps['items'] = [
			{ id: 'item1', label: 'item1' },
			{ id: 'item2', label: 'item2' }
		];
		const clickFn = jest.fn();
		const { user } = setup(<MultiButton items={items} onClick={clickFn} label="primary" />);

		expect(screen.getByText(/primary/i)).toBeVisible();
		expect(screen.getByTestId(ICONS.multiButtonSecondaryAction)).toBeVisible();
		await user.click(screen.getByText(/primary/i));
		expect(clickFn).toHaveBeenCalled();
		expect(screen.queryByText(/item1/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/item2/i)).not.toBeInTheDocument();
	});

	test('Click on secondary button open dropdown', async () => {
		const items: MultiButtonProps['items'] = [
			{ id: 'item1', label: 'item1' },
			{ id: 'item2', label: 'item2' }
		];
		const clickFn = jest.fn();
		const { user } = setup(<MultiButton items={items} onClick={clickFn} label="primary" />);

		expect(screen.getByText(/primary/i)).toBeVisible();
		expect(screen.getByTestId(ICONS.multiButtonSecondaryAction)).toBeVisible();
		await user.click(screen.getByTestId(ICONS.multiButtonSecondaryAction));
		expect(clickFn).not.toHaveBeenCalled();
		expect(screen.getByText(/item1/i)).toBeVisible();
		expect(screen.getByText(/item2/i)).toBeVisible();
	});

	test('Multiple clicks on secondary button keep dropdown open', async () => {
		const items: MultiButtonProps['items'] = [
			{ id: 'item1', label: 'item1' },
			{ id: 'item2', label: 'item2' }
		];
		const clickFn = jest.fn();
		const { user } = setup(<MultiButton items={items} onClick={clickFn} label="primary" />);

		expect(screen.getByText(/primary/i)).toBeVisible();
		expect(screen.getByTestId(ICONS.multiButtonSecondaryAction)).toBeVisible();
		await user.click(screen.getByTestId(ICONS.multiButtonSecondaryAction));
		// wait for listeners to be registered
		jest.advanceTimersByTime(TIMERS.DROPDOWN.REGISTER_LISTENER);
		expect(clickFn).not.toHaveBeenCalled();
		expect(screen.getByText(/item1/i)).toBeVisible();
		expect(screen.getByText(/item2/i)).toBeVisible();
		await user.click(screen.getByTestId(ICONS.multiButtonSecondaryAction));
		expect(screen.getByText(/item1/i)).toBeVisible();
		expect(screen.getByText(/item2/i)).toBeVisible();
	});

	test('Click on primary button close opened dropdown', async () => {
		const items: MultiButtonProps['items'] = [
			{ id: 'item1', label: 'item1' },
			{ id: 'item2', label: 'item2' }
		];
		const clickFn = jest.fn();
		const { user } = setup(<MultiButton items={items} onClick={clickFn} label="primary" />);

		expect(screen.getByText(/primary/i)).toBeVisible();
		expect(screen.getByTestId(ICONS.multiButtonSecondaryAction)).toBeVisible();
		await user.click(screen.getByTestId(ICONS.multiButtonSecondaryAction));
		jest.advanceTimersByTime(1);
		expect(clickFn).not.toHaveBeenCalled();
		expect(screen.getByText(/item1/i)).toBeVisible();
		expect(screen.getByText(/item2/i)).toBeVisible();
		await user.click(screen.getByText(/primary/i));
		expect(clickFn).toHaveBeenCalled();
		expect(screen.queryByText(/item1/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/item2/i)).not.toBeInTheDocument();
	});
});
