/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MultiButton, MultiButtonProps } from './MultiButton';
import { render } from '../../test-utils';
import { ICONS } from '../../testUtils/constants';

describe('MultiButton', () => {
	function waitForListenerToBeRegistered(ms = 1): Promise<void> {
		return waitFor(
			() =>
				new Promise((resolve) => {
					setTimeout(resolve, ms);
				})
		);
	}
	test('Click on primary button does not open dropdown', () => {
		const items: MultiButtonProps['items'] = [
			{ id: 'item1', label: 'item1' },
			{ id: 'item2', label: 'item2' }
		];
		const clickFn = jest.fn();
		render(<MultiButton items={items} onClick={clickFn} label="primary" />);

		expect(screen.getByText(/primary/i)).toBeVisible();
		expect(screen.getByTestId(ICONS.multiButtonSecondaryAction)).toBeVisible();
		userEvent.click(screen.getByText(/primary/i));
		expect(clickFn).toHaveBeenCalled();
		expect(screen.queryByText(/item1/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/item2/i)).not.toBeInTheDocument();
	});

	test('Click on secondary button open dropdown', () => {
		const items: MultiButtonProps['items'] = [
			{ id: 'item1', label: 'item1' },
			{ id: 'item2', label: 'item2' }
		];
		const clickFn = jest.fn();
		render(<MultiButton items={items} onClick={clickFn} label="primary" />);

		expect(screen.getByText(/primary/i)).toBeVisible();
		expect(screen.getByTestId(ICONS.multiButtonSecondaryAction)).toBeVisible();
		userEvent.click(screen.getByTestId(ICONS.multiButtonSecondaryAction));
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
		render(<MultiButton items={items} onClick={clickFn} label="primary" />);

		expect(screen.getByText(/primary/i)).toBeVisible();
		expect(screen.getByTestId(ICONS.multiButtonSecondaryAction)).toBeVisible();
		userEvent.click(screen.getByTestId(ICONS.multiButtonSecondaryAction));
		await waitForListenerToBeRegistered(2);
		expect(clickFn).not.toHaveBeenCalled();
		expect(screen.getByText(/item1/i)).toBeVisible();
		expect(screen.getByText(/item2/i)).toBeVisible();
		userEvent.click(screen.getByTestId(ICONS.multiButtonSecondaryAction));
		expect(screen.getByText(/item1/i)).toBeVisible();
		expect(screen.getByText(/item2/i)).toBeVisible();
	});

	test('Click on primary button close opened dropdown', async () => {
		const items: MultiButtonProps['items'] = [
			{ id: 'item1', label: 'item1' },
			{ id: 'item2', label: 'item2' }
		];
		const clickFn = jest.fn();
		render(<MultiButton items={items} onClick={clickFn} label="primary" />);

		expect(screen.getByText(/primary/i)).toBeVisible();
		expect(screen.getByTestId(ICONS.multiButtonSecondaryAction)).toBeVisible();
		userEvent.click(screen.getByTestId(ICONS.multiButtonSecondaryAction));
		await waitForListenerToBeRegistered();
		expect(clickFn).not.toHaveBeenCalled();
		expect(screen.getByText(/item1/i)).toBeVisible();
		expect(screen.getByText(/item2/i)).toBeVisible();
		userEvent.click(screen.getByText(/primary/i));
		expect(clickFn).toHaveBeenCalled();
		expect(screen.queryByText(/item1/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/item2/i)).not.toBeInTheDocument();
	});
});
