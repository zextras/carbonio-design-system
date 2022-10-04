/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { screen, act, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from '../../test-utils';
import { Button } from '../basic/Button';
import { Modal } from '../feedback/Modal';
import { Dropdown, DropdownItem } from './Dropdown';

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

	test('Disabled items show a tooltip if tooltipLabel is provided', async () => {
		const dropdownItems: DropdownItem[] = [
			{
				id: 'item1',
				label: 'item 1',
				disabled: false,
				tooltipLabel: 'tooltip 1'
			},
			{
				id: 'item2',
				label: 'item 2',
				disabled: true,
				tooltipLabel: 'tooltip 2'
			},
			{
				id: 'item3',
				label: 'item 3',
				disabled: true,
				tooltipLabel: undefined
			}
		];
		const onClick = jest.fn();
		render(
			<Dropdown items={dropdownItems}>
				<Button label="opener" onClick={onClick} />
			</Dropdown>
		);

		expect(screen.getByRole('button', { name: /opener/i })).toBeInTheDocument();
		// dropdown is closed
		expect(screen.queryByText(/item/i)).not.toBeInTheDocument();
		// open dropdown
		userEvent.click(screen.getByRole('button', { name: /opener/i }));
		await screen.findAllByText(/item/i);
		// wait for listeners to be registered
		await waitFor(
			() =>
				new Promise((resolve) => {
					setTimeout(resolve, 1);
				})
		);
		expect(screen.getByText('item 1')).toBeVisible();
		expect(screen.getByText('item 2')).toBeVisible();
		expect(screen.getByText('item 3')).toBeVisible();
		expect(screen.queryByText(/tooltip/i)).not.toBeInTheDocument();
		userEvent.hover(screen.getByText('item 1'));
		await waitFor(
			() =>
				new Promise((resolve) => {
					setTimeout(resolve, 500);
				})
		);
		expect(screen.queryByText(/tooltip/i)).not.toBeInTheDocument();
		userEvent.hover(screen.getByText('item 2'));
		await screen.findByText(/tooltip/i);
		expect(screen.getByText('tooltip 2')).toBeVisible();
		act(() => {
			userEvent.unhover(screen.getByText('item 2'));
		});
		userEvent.hover(screen.getByText('item 3'));
		await waitFor(
			() =>
				new Promise((resolve) => {
					setTimeout(resolve, 500);
				})
		);
		expect(screen.queryByText(/tooltip/i)).not.toBeInTheDocument();
	});

	test('Click on trigger component of a contextMenu dropdown close the dropdown', async () => {
		const onClick = jest.fn();
		render(
			<Dropdown items={items} contextMenu>
				<Button label="opener" onClick={onClick} />
			</Dropdown>
		);

		expect(screen.getByRole('button', { name: /opener/i })).toBeInTheDocument();
		// dropdown is closed
		expect(screen.queryByText(/some item/i)).not.toBeInTheDocument();
		// right click trigger open
		fireEvent.contextMenu(screen.getByRole('button', { name: /opener/i }));
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
		// second right click trigger open of a new dropdown, closing the previous one
		fireEvent.contextMenu(screen.getByRole('button', { name: /opener/i }));
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
		// left click trigger close
		userEvent.click(screen.getByRole('button', { name: /opener/i }));
		expect(screen.queryByText(/some item/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Some Other Item/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Yet Another Item/i)).not.toBeInTheDocument();
	});
});
