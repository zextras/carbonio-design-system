/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { waitFor } from '@testing-library/react';
import { render } from '../../test-utils';
import Button from '../basic/Button';
import Dropdown from './Dropdown';
import { Modal } from '../feedback/Modal';

const items = [
	{
		id: 'activity-1',
		icon: 'Activity',
		label: 'Some Item',
		click: () => console.log('click1')
	},
	{
		id: 'activity-2',
		icon: 'Plus',
		label: 'Some Other Item',
		click: () => console.log('click2'),
		disabled: true
	},
	{
		id: 'activity-3',
		icon: 'Activity',
		label: 'Yet Another Item',
		click: () => console.log('click3')
	}
];

describe('Dropdown', () => {
	const item1 = () => screen.getByText('Some Item');
	const item2 = () => screen.getByText('Some Other Item');
	const item3 = () => screen.getByText('Yet Another Item');

	test('Render closed dropdown', () => {
		render(
			<>
				<Dropdown items={items} placement="bottom-end">
					<Button icon="ArrowDown" label="Create" />
				</Dropdown>
			</>
		);

		expect(item1).toThrowError();
		expect(item2).toThrowError();
		expect(item3).toThrowError();
	});

	test('Render opened dropdown', () => {
		render(
			<>
				<Dropdown items={items} placement="bottom-end">
					<Button icon="ArrowDown" label="Create" />
				</Dropdown>
			</>
		);

		userEvent.click(screen.getByRole('button'));

		expect(item1()).toBeInTheDocument();
		expect(item2()).toBeInTheDocument();
		expect(item3()).toBeInTheDocument();
	});

	test('click on dropdown trigger toggle dropdown visibility', async () => {
		render(
			<Dropdown items={items}>
				<Button label="opener" />
			</Dropdown>
		);

		expect(screen.getByRole('button', { name: /opener/i })).toBeInTheDocument();
		// dropdown is closed
		expect(screen.queryByText(/some item/i)).not.toBeInTheDocument();
		// first click trigger open
		userEvent.click(screen.getByRole('button', { name: /opener/i }));
		await screen.findByText(/some item/i);
		// wait for listeners to be registered
		await waitFor(
			() =>
				new Promise((resolve) => {
					setTimeout(resolve, 1);
				})
		);
		expect(screen.getByText(/some item/i)).toBeInTheDocument();
		expect(screen.getByText(/Some Other Item/i)).toBeInTheDocument();
		expect(screen.getByText(/Yet Another Item/i)).toBeInTheDocument();
		// second click trigger close
		userEvent.click(screen.getByRole('button', { name: /opener/i }));
		expect(screen.queryByText(/some item/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Some Other Item/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Yet Another Item/i)).not.toBeInTheDocument();
		// third click trigger open
		userEvent.click(screen.getByRole('button', { name: /opener/i }));
		await screen.findByText(/some item/i);
		// wait for listeners to be registered
		await waitFor(
			() =>
				new Promise((resolve) => {
					setTimeout(resolve, 1);
				})
		);
		expect(screen.getByText(/some item/i)).toBeInTheDocument();
		expect(screen.getByText(/Some Other Item/i)).toBeInTheDocument();
		expect(screen.getByText(/Yet Another Item/i)).toBeInTheDocument();
		// fourth click trigger close
		userEvent.click(screen.getByRole('button', { name: /opener/i }));
		expect(screen.queryByText(/some item/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Some Other Item/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Yet Another Item/i)).not.toBeInTheDocument();
	});

	test('dropdown inside a modal open and close properly', async () => {
		const onClose = jest.fn();
		render(
			<Modal open title="modal with dropdown" onClose={onClose}>
				<Dropdown items={items}>
					<Button label="opener" />
				</Dropdown>
			</Modal>
		);

		// modal is open
		expect(screen.getByText('modal with dropdown')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /opener/i })).toBeInTheDocument();
		// dropdown is closed
		expect(screen.queryByText(/some item/i)).not.toBeInTheDocument();
		// first click trigger open
		userEvent.click(screen.getByRole('button', { name: /opener/i }));
		await screen.findByText(/some item/i);
		// wait for listeners to be registered
		await waitFor(
			() =>
				new Promise((resolve) => {
					setTimeout(resolve, 1);
				})
		);
		expect(screen.getByText(/some item/i)).toBeInTheDocument();
		expect(screen.getByText(/Some Other Item/i)).toBeInTheDocument();
		expect(screen.getByText(/Yet Another Item/i)).toBeInTheDocument();
		// second click trigger close
		userEvent.click(screen.getByRole('button', { name: /opener/i }));
		expect(screen.queryByText(/some item/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Some Other Item/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Yet Another Item/i)).not.toBeInTheDocument();
		// third click trigger open
		userEvent.click(screen.getByRole('button', { name: /opener/i }));
		await screen.findByText(/some item/i);
		// wait for listeners to be registered
		await waitFor(
			() =>
				new Promise((resolve) => {
					setTimeout(resolve, 1);
				})
		);
		expect(screen.getByText(/some item/i)).toBeInTheDocument();
		expect(screen.getByText(/Some Other Item/i)).toBeInTheDocument();
		expect(screen.getByText(/Yet Another Item/i)).toBeInTheDocument();
		// fourth click trigger close
		userEvent.click(screen.getByRole('button', { name: /opener/i }));
		expect(screen.queryByText(/some item/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Some Other Item/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Yet Another Item/i)).not.toBeInTheDocument();
		// modal close callback is not called
		expect(onClose).not.toHaveBeenCalled();
	});
});
