/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
/* eslint-disable import/no-extraneous-dependencies, no-console */
import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { waitFor } from '@testing-library/react';
import { render } from '../../test-utils';
import { Button } from '../basic/Button';
import { Dropdown, DropdownItem } from './Dropdown';
import { Modal } from '../feedback/Modal';

const items = [
	{
		id: 'item-1',
		icon: 'item',
		label: 'Some Item',
		click: jest.fn()
	},
	{
		id: 'item-2',
		icon: 'Plus',
		label: 'Some Other Item',
		click: jest.fn(),
		disabled: true
	},
	{
		id: 'item-3',
		icon: 'item',
		label: 'Yet Another Item',
		click: jest.fn()
	},
	{
		id: 'item-4',
		icon: 'item',
		label: 'Item 4',
		click: jest.fn(),
		items: [
			{
				id: 'item-4-1',
				icon: 'item',
				label: 'item 4 sub 1',
				click: jest.fn()
			},
			{
				id: 'item-4-2',
				icon: 'item',
				label: 'item 4 sub 2',
				click: jest.fn()
			}
		]
	}
];

describe('Dropdown', () => {
	test('Render closed dropdown', () => {
		const onClick = jest.fn();
		render(
			<Dropdown items={items} placement="bottom-end">
				<Button icon="ArrowDown" label="Create" onClick={onClick} />
			</Dropdown>
		);

		expect(screen.queryByText('Some Item')).not.toBeInTheDocument();
		expect(screen.queryByText('Some Other Item')).not.toBeInTheDocument();
		expect(screen.queryByText('Yet Another Item')).not.toBeInTheDocument();
	});

	test('Render opened dropdown', async () => {
		const onClick = jest.fn();
		render(
			<Dropdown items={items} placement="bottom-end">
				<Button icon="ArrowDown" label="Create" onClick={onClick} />
			</Dropdown>
		);

		userEvent.click(screen.getByRole('button'));

		expect(screen.getByText('Some Item')).toBeInTheDocument();
		expect(screen.getByText('Some Other Item')).toBeInTheDocument();
		expect(screen.getByText('Yet Another Item')).toBeInTheDocument();
		// wait for listeners to be registered
		await waitFor(
			() =>
				new Promise((resolve) => {
					setTimeout(resolve, 1);
				})
		);
	});

	test('click on dropdown trigger toggle dropdown visibility', async () => {
		const onClick = jest.fn();
		render(
			<Dropdown items={items}>
				<Button label="opener" onClick={onClick} />
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
		const onClick = jest.fn();
		render(
			<Modal open title="modal with dropdown" onClose={onClose}>
				<Dropdown items={items}>
					<Button label="opener" onClick={onClick} />
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

	test('Click on a nested item calls nested item click callback and close dropdown', async () => {
		const onClick = jest.fn();
		const item3Sub1ClickFn = jest.fn((e: React.SyntheticEvent | KeyboardEvent) => {
			e.preventDefault();
		});
		const item3ClickInternalFn = jest.fn();
		const item3ClickFn = jest.fn((e: React.SyntheticEvent | KeyboardEvent) => {
			if (!e.defaultPrevented) {
				item3ClickInternalFn();
			}
		});
		(items[3].items as DropdownItem[])[0].click = item3Sub1ClickFn;
		items[3].click = item3ClickFn;
		render(
			<Dropdown items={items}>
				<Button label="opener" onClick={onClick} />
			</Dropdown>
		);
		expect(screen.getByRole('button', { name: /opener/i })).toBeInTheDocument();
		// dropdown is closed
		expect(screen.queryByText(/some item/i)).not.toBeInTheDocument();
		// first click trigger open
		userEvent.click(screen.getByRole('button', { name: /opener/i }));
		await screen.findByText(/item 4/i);
		// wait for listeners to be registered
		await waitFor(
			() =>
				new Promise((resolve) => {
					setTimeout(resolve, 1);
				})
		);
		expect(screen.getByTestId('icon: ChevronRight')).toBeVisible();
		userEvent.hover(screen.getByTestId('icon: ChevronRight'));
		await screen.findByText(/item 4 sub 1/i);
		// wait for listeners to be registered
		await waitFor(
			() =>
				new Promise((resolve) => {
					setTimeout(resolve, 1);
				})
		);
		expect(screen.getByText(/item 4 sub 1/i)).toBeVisible();
		userEvent.click(screen.getByText(/item 4 sub 1/i));
		expect(item3Sub1ClickFn).toHaveBeenCalled();
		expect(item3ClickFn).toHaveBeenCalled();
		expect(item3ClickInternalFn).not.toHaveBeenCalled();
		expect(screen.queryByText(/item 4/i)).not.toBeInTheDocument();
	});
});
