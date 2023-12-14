/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { screen, act, fireEvent } from '@testing-library/react';

import { Dropdown, DropdownItem } from './Dropdown';
import { setup } from '../../test-utils';
import { ICONS } from '../../testUtils/constants';
import { Button } from '../basic/Button';
import { TIMERS } from '../constants';
import { Modal } from '../feedback/Modal';

const items: DropdownItem[] = [
	{
		id: 'item-1',
		icon: 'item',
		label: 'Some Item',
		onClick: jest.fn()
	},
	{
		id: 'item-2',
		icon: 'Plus',
		label: 'Some Other Item',
		onClick: jest.fn(),
		disabled: true
	},
	{
		id: 'item-3',
		icon: 'item',
		label: 'Yet Another Item',
		onClick: jest.fn()
	},
	{
		id: 'item-4',
		icon: 'item',
		label: 'Item 4',
		onClick: jest.fn(),
		items: [
			{
				id: 'item-4-1',
				icon: 'item',
				label: 'item 4 sub 1',
				onClick: jest.fn()
			},
			{
				id: 'item-4-2',
				icon: 'item',
				label: 'item 4 sub 2',
				onClick: jest.fn()
			}
		]
	}
];

describe('Dropdown', () => {
	test('Render closed dropdown', () => {
		const onClick = jest.fn();
		setup(
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
		const { user } = setup(
			<Dropdown items={items} placement="bottom-end">
				<Button icon="ArrowDown" label="Create" onClick={onClick} />
			</Dropdown>
		);

		await user.click(screen.getByRole('button'));

		expect(screen.getByText('Some Item')).toBeVisible();
		expect(screen.getByText('Some Other Item')).toBeVisible();
		expect(screen.getByText('Yet Another Item')).toBeVisible();
		// wait for listeners to be registered
		jest.advanceTimersByTime(TIMERS.DROPDOWN.REGISTER_LISTENER);
	});

	test('click on dropdown trigger toggle dropdown visibility', async () => {
		const onClick = jest.fn();
		const { user } = setup(
			<Dropdown items={items}>
				<Button label="opener" onClick={onClick} />
			</Dropdown>
		);

		expect(screen.getByRole('button', { name: /opener/i })).toBeVisible();
		// dropdown is closed
		expect(screen.queryByText(/some item/i)).not.toBeInTheDocument();
		// first click trigger open
		await user.click(screen.getByRole('button', { name: /opener/i }));
		await screen.findByText(/some item/i);
		// wait for listeners to be registered
		jest.advanceTimersByTime(TIMERS.DROPDOWN.REGISTER_LISTENER);
		expect(screen.getByText(/some item/i)).toBeVisible();
		expect(screen.getByText(/Some Other Item/i)).toBeVisible();
		expect(screen.getByText(/Yet Another Item/i)).toBeVisible();
		// second click trigger close
		await user.click(screen.getByRole('button', { name: /opener/i }));
		expect(screen.queryByText(/some item/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Some Other Item/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Yet Another Item/i)).not.toBeInTheDocument();
		// third click trigger open
		await user.click(screen.getByRole('button', { name: /opener/i }));
		await screen.findByText(/some item/i);
		// wait for listeners to be registered
		jest.advanceTimersByTime(TIMERS.DROPDOWN.REGISTER_LISTENER);
		expect(screen.getByText(/some item/i)).toBeVisible();
		expect(screen.getByText(/Some Other Item/i)).toBeVisible();
		expect(screen.getByText(/Yet Another Item/i)).toBeVisible();
		// fourth click trigger close
		await user.click(screen.getByRole('button', { name: /opener/i }));
		expect(screen.queryByText(/some item/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Some Other Item/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Yet Another Item/i)).not.toBeInTheDocument();
	});

	test('dropdown inside a modal open and close properly', async () => {
		const onClose = jest.fn();
		const onClick = jest.fn();
		const { user } = setup(
			<Modal open title="modal with dropdown" onClose={onClose}>
				<Dropdown items={items}>
					<Button label="opener" onClick={onClick} />
				</Dropdown>
			</Modal>
		);
		await screen.findByText('modal with dropdown');
		act(() => {
			jest.advanceTimersByTime(TIMERS.MODAL.DELAY_OPEN);
		});
		// modal is open
		expect(screen.getByText('modal with dropdown')).toBeVisible();
		expect(screen.getByRole('button', { name: /opener/i })).toBeVisible();
		// dropdown is closed
		expect(screen.queryByText(/some item/i)).not.toBeInTheDocument();
		// first click trigger open
		await user.click(screen.getByRole('button', { name: /opener/i }));
		await screen.findByText(/some item/i);
		// wait for listeners to be registered
		jest.advanceTimersByTime(TIMERS.DROPDOWN.REGISTER_LISTENER);
		expect(screen.getByText(/some item/i)).toBeVisible();
		expect(screen.getByText(/Some Other Item/i)).toBeVisible();
		expect(screen.getByText(/Yet Another Item/i)).toBeVisible();
		// second click trigger close
		await user.click(screen.getByRole('button', { name: /opener/i }));
		expect(screen.queryByText(/some item/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Some Other Item/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Yet Another Item/i)).not.toBeInTheDocument();
		// third click trigger open
		await user.click(screen.getByRole('button', { name: /opener/i }));
		await screen.findByText(/some item/i);
		// wait for listeners to be registered
		jest.advanceTimersByTime(TIMERS.DROPDOWN.REGISTER_LISTENER);
		expect(screen.getByText(/some item/i)).toBeVisible();
		expect(screen.getByText(/Some Other Item/i)).toBeVisible();
		expect(screen.getByText(/Yet Another Item/i)).toBeVisible();
		// fourth click trigger close
		await user.click(screen.getByRole('button', { name: /opener/i }));
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
		(items[3].items as DropdownItem[])[0].onClick = item3Sub1ClickFn;
		items[3].onClick = item3ClickFn;
		const { user } = setup(
			<Dropdown items={items}>
				<Button label="opener" onClick={onClick} />
			</Dropdown>
		);
		expect(screen.getByRole('button', { name: /opener/i })).toBeVisible();
		// dropdown is closed
		expect(screen.queryByText(/some item/i)).not.toBeInTheDocument();
		// first click trigger open
		await user.click(screen.getByRole('button', { name: /opener/i }));
		await screen.findByText(/item 4/i);
		// wait for listeners to be registered
		jest.advanceTimersByTime(TIMERS.DROPDOWN.REGISTER_LISTENER);
		expect(screen.getByTestId(ICONS.dropdownNestedLevel)).toBeVisible();
		await user.hover(screen.getByTestId(ICONS.dropdownNestedLevel));
		await screen.findByText(/item 4 sub 1/i);
		// wait for listeners to be registered
		jest.advanceTimersByTime(TIMERS.DROPDOWN.REGISTER_LISTENER);
		expect(screen.getByText(/item 4 sub 1/i)).toBeVisible();
		await user.click(screen.getByText(/item 4 sub 1/i));
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
		const { user } = setup(
			<Dropdown items={dropdownItems}>
				<Button label="opener" onClick={onClick} />
			</Dropdown>
		);

		expect(screen.getByRole('button', { name: /opener/i })).toBeVisible();
		// dropdown is closed
		expect(screen.queryByText(/item/i)).not.toBeInTheDocument();
		// open dropdown
		await user.click(screen.getByRole('button', { name: /opener/i }));
		await screen.findAllByText(/item/i);
		// wait for listeners to be registered
		jest.advanceTimersByTime(TIMERS.DROPDOWN.REGISTER_LISTENER);
		expect(screen.getByText('item 1')).toBeVisible();
		expect(screen.getByText('item 2')).toBeVisible();
		expect(screen.getByText('item 3')).toBeVisible();
		expect(screen.queryByText(/tooltip/i)).not.toBeInTheDocument();
		// wait so tooltip can register the listeners
		jest.advanceTimersByTime(TIMERS.TOOLTIP.REGISTER_LISTENER);
		await user.hover(screen.getByText('item 1'));
		jest.advanceTimersByTime(TIMERS.TOOLTIP.DELAY_SHOW);
		expect(screen.queryByText(/tooltip/i)).not.toBeInTheDocument();
		await user.hover(screen.getByText('item 2'));
		await screen.findByText(/tooltip/i);
		expect(screen.getByText('tooltip 2')).toBeVisible();
		await act(async () => {
			await user.unhover(screen.getByText('item 2'));
		});
		await user.hover(screen.getByText('item 3'));
		jest.advanceTimersByTime(TIMERS.TOOLTIP.DELAY_SHOW);
		expect(screen.queryByText(/tooltip/i)).not.toBeInTheDocument();
	});

	test('Click on trigger component of a contextMenu dropdown close the dropdown', async () => {
		const onClick = jest.fn();
		const { user } = setup(
			<Dropdown items={items} contextMenu>
				<Button label="opener" onClick={onClick} />
			</Dropdown>
		);

		expect(screen.getByRole('button', { name: /opener/i })).toBeVisible();
		// dropdown is closed
		expect(screen.queryByText(/some item/i)).not.toBeInTheDocument();
		// right click trigger open
		fireEvent.contextMenu(screen.getByRole('button', { name: /opener/i }));
		await screen.findByText(/some item/i);
		expect(screen.getByText(/some item/i)).toBeVisible();
		expect(screen.getByText(/Some Other Item/i)).toBeVisible();
		expect(screen.getByText(/Yet Another Item/i)).toBeVisible();
		// second right click trigger open of a new dropdown, closing the previous one
		fireEvent.contextMenu(screen.getByRole('button', { name: /opener/i }));
		await screen.findByText(/some item/i);
		expect(screen.getByText(/some item/i)).toBeVisible();
		expect(screen.getByText(/Some Other Item/i)).toBeVisible();
		expect(screen.getByText(/Yet Another Item/i)).toBeVisible();
		// left click trigger close
		await act(async () => {
			await user.click(screen.getByRole('button', { name: /opener/i }));
		});
		expect(screen.queryByText(/some item/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Some Other Item/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Yet Another Item/i)).not.toBeInTheDocument();
	});
});
