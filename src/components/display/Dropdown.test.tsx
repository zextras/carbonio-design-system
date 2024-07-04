/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { screen, act } from '@testing-library/react';

import { Dropdown, DropdownItem } from './Dropdown';
import { setup, within } from '../../test-utils';
import { SELECTORS } from '../../testUtils/constants';
import { Button } from '../basic/Button';
import { TIMERS } from '../constants';
import { Modal } from '../feedback/Modal';

function findDropdownItem(label: string): HTMLElement {
	const dropdownItem = screen
		.getAllByTestId(SELECTORS.dropdownItem)
		.find((item) => within(item).queryByText(label) !== null);
	expect(dropdownItem).toBeDefined();
	return dropdownItem as HTMLElement;
}

describe('Dropdown', () => {
	it('should render a closed dropdown by default', () => {
		const items = [{ id: '1', label: 'Some Item' }] satisfies DropdownItem[];
		setup(
			<Dropdown items={items} placement="bottom-end">
				<Button icon="ArrowDown" label="Create" onClick={jest.fn()} />
			</Dropdown>
		);
		expect(screen.queryByText('Some Item')).not.toBeInTheDocument();
	});

	it('should show the dropdown when trigger element is clicked', async () => {
		const items = [
			{ id: '1', label: 'Some Item' },
			{ id: '2', label: 'Some Other Item' },
			{ id: '3', label: 'Yet Another Item' }
		] satisfies DropdownItem[];
		const { user } = setup(
			<Dropdown items={items} placement="bottom-end">
				<Button icon="ArrowDown" label="Create" onClick={jest.fn()} />
			</Dropdown>
		);

		await user.click(screen.getByRole('button'));
		expect(screen.getByText('Some Item')).toBeVisible();
		expect(screen.getByText('Some Other Item')).toBeVisible();
		expect(screen.getByText('Yet Another Item')).toBeVisible();
	});

	it('should toggle dropdown visibility when clicking trigger', async () => {
		const items = [{ id: '1', label: 'Some Item' }] satisfies DropdownItem[];
		const { user } = setup(
			<Dropdown items={items}>
				<Button label="opener" onClick={jest.fn()} />
			</Dropdown>
		);
		// first click trigger open
		await user.click(screen.getByRole('button'));
		expect(screen.getByText(/some item/i)).toBeVisible();
		// second click trigger close
		await user.click(screen.getByRole('button'));
		expect(screen.queryByText(/some item/i)).not.toBeInTheDocument();
		// third click trigger open
		await user.click(screen.getByRole('button'));
		expect(screen.getByText(/some item/i)).toBeVisible();
		// fourth click trigger close
		await user.click(screen.getByRole('button'));
		expect(screen.queryByText(/some item/i)).not.toBeInTheDocument();
	});

	it('should open and close properly when rendered inside a modal', async () => {
		const items = [{ id: '1', label: 'Some Item' }] satisfies DropdownItem[];
		const onClose = jest.fn();
		const { user } = setup(
			<Modal open title="modal with dropdown" onClose={onClose}>
				<Dropdown items={items}>
					<Button label="opener" onClick={jest.fn()} />
				</Dropdown>
			</Modal>
		);
		await screen.findByText('modal with dropdown');
		act(() => {
			jest.advanceTimersByTime(TIMERS.MODAL.DELAY_OPEN);
		});
		// modal is open
		expect(screen.getByText('modal with dropdown')).toBeVisible();
		// dropdown is closed
		expect(screen.queryByText(/some item/i)).not.toBeInTheDocument();
		// first click trigger open
		await user.click(screen.getByRole('button', { name: /opener/i }));
		expect(screen.getByText(/some item/i)).toBeVisible();
		// second click trigger close
		await user.click(screen.getByRole('button', { name: /opener/i }));
		expect(screen.queryByText(/some item/i)).not.toBeInTheDocument();
		// third click trigger open
		await user.click(screen.getByRole('button', { name: /opener/i }));
		expect(screen.getByText(/some item/i)).toBeVisible();
		// click on item
		await user.click(screen.getByText(items[0].label));
		// dropdown is close
		expect(screen.queryByText(items[0].label)).not.toBeInTheDocument();
		// modal close callback is not called
		expect(onClose).not.toHaveBeenCalled();
	});

	it('should call onClick of sub-item only and close dropdown when user clicks on sub-item', async () => {
		const subItem = {
			id: '2',
			label: '2',
			onClick: jest.fn()
		} satisfies DropdownItem;
		const parentItem = {
			id: '1',
			label: '1',
			onClick: jest.fn(),
			items: [subItem]
		} satisfies DropdownItem;
		const items = [parentItem];
		const { user } = setup(
			<Dropdown items={items}>
				<Button label="opener" onClick={jest.fn()} />
			</Dropdown>
		);
		await user.click(screen.getByRole('button'));
		await user.hover(screen.getByText(parentItem.label));
		await user.click(screen.getByText(subItem.label));
		expect(subItem.onClick).toHaveBeenCalled();
		expect(parentItem.onClick).not.toHaveBeenCalled();
		expect(screen.queryByText(subItem.label)).not.toBeInTheDocument();
		expect(screen.queryByText(parentItem.label)).not.toBeInTheDocument();
	});

	it('should show a tooltip on disabled item if tooltipLabel is provided', async () => {
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
		const { user } = setup(
			<Dropdown items={dropdownItems}>
				<Button label="opener" onClick={jest.fn()} />
			</Dropdown>
		);

		await user.click(screen.getByRole('button', { name: /opener/i }));
		await user.hover(screen.getByText('item 1'));
		jest.advanceTimersByTime(TIMERS.TOOLTIP.DELAY_SHOW);
		expect(screen.queryByText(/tooltip/i)).not.toBeInTheDocument();
		await user.unhover(screen.getByText('item 1'));
		await user.hover(screen.getByText('item 2'));
		expect(await screen.findByText('tooltip 2')).toBeVisible();
		await user.unhover(screen.getByText('item 2'));
		await user.hover(screen.getByText('item 3'));
		jest.advanceTimersByTime(TIMERS.TOOLTIP.DELAY_SHOW);
		expect(screen.queryByText(/tooltip/i)).not.toBeInTheDocument();
	});

	it('should close dropdown when clicking on trigger component of a contextMenu dropdown', async () => {
		const items = [{ id: '1', label: 'Some Item' }] satisfies DropdownItem[];
		const { user } = setup(
			<Dropdown items={items} contextMenu>
				<Button label="opener" onClick={jest.fn()} />
			</Dropdown>
		);

		expect(screen.getByRole('button', { name: /opener/i })).toBeVisible();
		// dropdown is closed
		expect(screen.queryByText(/some item/i)).not.toBeInTheDocument();
		// right click trigger open
		await user.rightClick(screen.getByRole('button', { name: /opener/i }));
		expect(screen.getByText(/some item/i)).toBeVisible();
		// second right click trigger open of a new dropdown, closing the previous one
		await user.rightClick(screen.getByRole('button', { name: /opener/i }));
		expect(screen.getByText(/some item/i)).toBeVisible();
		await user.click(screen.getByRole('button', { name: /opener/i }));
		expect(screen.queryByText(/some item/i)).not.toBeInTheDocument();
	});

	it('should set focus on first element on open', async () => {
		const items = [{ id: '1', label: 'Some Item' }] satisfies DropdownItem[];
		const firstItem = items[0];
		const { user } = setup(
			<Dropdown items={items}>
				<Button label="opener" onClick={jest.fn()} />
			</Dropdown>
		);
		await user.click(screen.getByRole('button'));
		const firstDropdownItem = findDropdownItem(firstItem.label);
		expect(firstDropdownItem).toHaveFocus();
	});

	it('should keep focus on trigger component if the disabledAutoFocus prop is set to true', async () => {
		const items = [{ id: '1', label: 'Some Item' }] satisfies DropdownItem[];
		const firstItem = items[0];
		const { user } = setup(
			<Dropdown items={items} disableAutoFocus>
				<Button label="opener" onClick={jest.fn()} />
			</Dropdown>
		);
		await user.click(screen.getByRole('button'));
		await screen.findByText(firstItem.label);
		expect(screen.getByRole('button', { name: /opener/i })).toHaveFocus();
	});

	it('should set focus on trigger component on close after clicking an item', async () => {
		const items = [{ id: '1', label: 'Some Item' }] satisfies DropdownItem[];
		const firstItem = items[0];
		const { user } = setup(
			<Dropdown items={items}>
				<Button label="opener" onClick={jest.fn()} />
			</Dropdown>
		);
		await user.click(screen.getByRole('button'));
		await user.click(screen.getByText(firstItem.label));
		expect(screen.queryByText(firstItem.label)).not.toBeInTheDocument();
		expect(screen.getByRole('button', { name: /opener/i })).toHaveFocus();
	});

	it('should not set focus on trigger component on close if disabledRestoreFocus is true', async () => {
		const items = [{ id: '1', label: 'Some Item' }] satisfies DropdownItem[];
		const firstItem = items[0];
		const { user } = setup(
			<Dropdown items={items} disableRestoreFocus>
				<Button label="opener" onClick={jest.fn()} />
			</Dropdown>
		);
		await user.click(screen.getByRole('button'));
		await screen.findByText(firstItem.label);
		await user.click(screen.getByText(firstItem.label));
		expect(screen.queryByText(firstItem.label)).not.toBeInTheDocument();
		expect(screen.getByRole('button', { name: /opener/i })).not.toHaveFocus();
	});

	it('should set focus on first sub-item when opening nested dropdown', async () => {
		const subItem = { id: '2', label: 'sub item' } satisfies DropdownItem;
		const items = [
			{ id: '1', label: 'Some Item', items: [subItem, { id: '3', label: 'sub item 2' }] }
		] satisfies DropdownItem[];
		const { user } = setup(
			<Dropdown items={items}>
				<Button label="opener" onClick={jest.fn()} />
			</Dropdown>
		);
		await user.click(screen.getByRole('button'));
		await user.hover(screen.getByText(items[0].label));
		const nestedDropdownItem = findDropdownItem(subItem.label);
		expect(nestedDropdownItem).toHaveFocus();
	});

	it('should set focus on trigger component on close when clicking on a nested item', async () => {
		const subItem: DropdownItem = {
			id: 'sub1',
			label: 'sub1',
			onClick: jest.fn()
		};
		const items = [{ id: '1', label: 'Some Item', items: [subItem] }] satisfies DropdownItem[];
		const firstItem = items[0];
		const { user } = setup(
			<Dropdown items={items}>
				<Button label="opener" onClick={jest.fn()} />
			</Dropdown>
		);
		await user.click(screen.getByRole('button'));
		await user.hover(screen.getByText(firstItem.label));
		await user.click(screen.getByText(subItem.label));
		expect(screen.queryByText(firstItem.label)).not.toBeInTheDocument();
		expect(screen.queryByText(subItem.label)).not.toBeInTheDocument();
		expect(screen.getByRole('button', { name: /opener/i })).toHaveFocus();
	});

	it('should keep nested dropdown open when hovering on subitem', async () => {
		const subItem = { id: '2', label: '2' } satisfies DropdownItem;
		const items = [{ id: '1', label: '1', items: [subItem] }] satisfies DropdownItem[];

		const { user } = setup(
			<Dropdown items={items}>
				<Button label="opener" onClick={jest.fn()} />
			</Dropdown>
		);

		await user.click(screen.getByRole('button'));
		await user.hover(screen.getByText('1'));
		await user.hover(screen.getByText('2'));
		jest.advanceTimersByTime(TIMERS.DROPDOWN.CLOSE_NESTED);
		expect(screen.getByText('1')).toBeVisible();
		expect(screen.getByText('2')).toBeVisible();
	});

	describe('Keyboard shortcuts', () => {
		it('should set focus on next item when pressing arrow down', async () => {
			const items = [
				{ id: '1', label: 'item 1' },
				{ id: '2', label: 'item 2' },
				{ id: '3', label: 'item 3' }
			] satisfies DropdownItem[];
			const { user } = setup(
				<Dropdown items={items} forceOpen>
					<Button label="opener" onClick={jest.fn()} />
				</Dropdown>
			);
			expect(findDropdownItem(items[0].label)).toHaveFocus();
			await user.arrowDown();
			expect(findDropdownItem(items[1].label)).toHaveFocus();
		});

		it('should set focus on previous item when pressing arrow up', async () => {
			const items = [
				{ id: '1', label: 'item 1' },
				{ id: '2', label: 'item 2' },
				{ id: '3', label: 'item 3' }
			] satisfies DropdownItem[];
			const { user } = setup(
				<Dropdown items={items} forceOpen>
					<Button label="opener" onClick={jest.fn()} />
				</Dropdown>
			);
			expect(findDropdownItem(items[0].label)).toHaveFocus();
			await user.arrowDown();
			expect(findDropdownItem(items[1].label)).toHaveFocus();
			await user.arrowUp();
			expect(findDropdownItem(items[0].label)).toHaveFocus();
		});

		it('should set focus on last item when pressing arrow up and focus is on first item', async () => {
			const items = [
				{ id: '1', label: 'item 1' },
				{ id: '2', label: 'item 2' },
				{ id: '3', label: 'item 3' }
			] satisfies DropdownItem[];
			const { user } = setup(
				<Dropdown items={items} forceOpen>
					<Button label="opener" onClick={jest.fn()} />
				</Dropdown>
			);
			expect(findDropdownItem(items[0].label)).toHaveFocus();
			await user.arrowUp();
			expect(findDropdownItem(items[items.length - 1].label)).toHaveFocus();
		});

		it('should set focus on first item when pressing arrow down and focus is on last item', async () => {
			const items = [
				{ id: '1', label: 'item 1' },
				{ id: '2', label: 'item 2' },
				{ id: '3', label: 'item 3' }
			] satisfies DropdownItem[];
			const { user } = setup(
				<Dropdown items={items} forceOpen>
					<Button label="opener" onClick={jest.fn()} />
				</Dropdown>
			);
			expect(findDropdownItem(items[0].label)).toHaveFocus();
			await user.arrowUp();
			expect(findDropdownItem(items[items.length - 1].label)).toHaveFocus();
			await user.arrowDown();
			expect(findDropdownItem(items[0].label)).toHaveFocus();
		});

		it('should set focus on next item when pressing tab', async () => {
			const items = [
				{ id: '1', label: 'item 1' },
				{ id: '2', label: 'item 2' },
				{ id: '3', label: 'item 3' }
			] satisfies DropdownItem[];
			const { user } = setup(
				<Dropdown items={items} forceOpen>
					<Button label="opener" onClick={jest.fn()} />
				</Dropdown>
			);
			expect(findDropdownItem(items[0].label)).toHaveFocus();
			await user.tab();
			expect(findDropdownItem(items[1].label)).toHaveFocus();
		});

		it('should set focus on previous item when pressing shift+tab', async () => {
			const items = [
				{ id: '1', label: 'item 1' },
				{ id: '2', label: 'item 2' },
				{ id: '3', label: 'item 3' }
			] satisfies DropdownItem[];
			const { user } = setup(
				<Dropdown items={items} forceOpen>
					<Button label="opener" onClick={jest.fn()} />
				</Dropdown>
			);
			expect(findDropdownItem(items[0].label)).toHaveFocus();
			await user.tab();
			expect(findDropdownItem(items[1].label)).toHaveFocus();
			await user.tab();
			expect(findDropdownItem(items[2].label)).toHaveFocus();
			await user.tab({ shift: true });
			expect(findDropdownItem(items[1].label)).toHaveFocus();
		});

		it('should open nested dropdown when pressing arrow right', async () => {
			const subItem = { id: '2', label: 'item 2' } satisfies DropdownItem;
			const items = [{ id: '1', label: 'item 1', items: [subItem] }] satisfies DropdownItem[];
			const { user } = setup(
				<Dropdown items={items} forceOpen>
					<Button label="opener" onClick={jest.fn()} />
				</Dropdown>
			);
			expect(findDropdownItem(items[0].label)).toHaveFocus();
			await user.arrowRight();
			expect(screen.getByText(subItem.label)).toBeVisible();
		});

		it('should move focus between items of the open nested dropdown', async () => {
			const subItems = [
				{ id: '2', label: 'item 2' },
				{ id: '3', label: 'item 3' }
			] satisfies DropdownItem[];
			const items = [{ id: '1', label: 'item 1', items: subItems }] satisfies DropdownItem[];
			const { user } = setup(
				<Dropdown items={items} forceOpen>
					<Button label="opener" onClick={jest.fn()} />
				</Dropdown>
			);
			expect(findDropdownItem(items[0].label)).toHaveFocus();
			await user.arrowRight();
			expect(findDropdownItem(subItems[0].label)).toHaveFocus();
			await user.arrowDown();
			expect(findDropdownItem(subItems[1].label)).toHaveFocus();
		});

		it('should close nested dropdown when pressing arrow left', async () => {
			const subItem = { id: '2', label: 'item 2' } satisfies DropdownItem;
			const items = [{ id: '1', label: 'item 1', items: [subItem] }] satisfies DropdownItem[];
			const { user } = setup(
				<Dropdown items={items} forceOpen>
					<Button label="opener" onClick={jest.fn()} />
				</Dropdown>
			);
			expect(findDropdownItem(items[0].label)).toHaveFocus();
			await user.arrowRight();
			expect(findDropdownItem(subItem.label)).toHaveFocus();
			await user.arrowLeft();
			expect(screen.queryByText(subItem.label)).not.toBeInTheDocument();
			expect(screen.getByText(items[0].label)).toBeVisible();
		});

		it('should close dropdown on esc', async () => {
			const items = [{ id: '1', label: 'item 1' }] satisfies DropdownItem[];
			const { user } = setup(
				<Dropdown items={items}>
					<Button label="opener" onClick={jest.fn()} />
				</Dropdown>
			);
			await user.click(screen.getByRole('button'));
			await screen.findByText(items[0].label);
			await user.esc();
			expect(screen.queryByText(items[0].label)).not.toBeInTheDocument();
		});

		it('should close nested dropdown on esc', async () => {
			const subItem = { id: '2', label: 'item 2' } satisfies DropdownItem;
			const items = [{ id: '1', label: 'item 1', items: [subItem] }] satisfies DropdownItem[];
			const { user } = setup(
				<Dropdown items={items} forceOpen>
					<Button label="opener" onClick={jest.fn()} />
				</Dropdown>
			);
			await user.hover(screen.getByText(items[0].label));
			await screen.findByText(subItem.label);
			await user.esc();
			expect(screen.queryByText(subItem.label)).not.toBeInTheDocument();
			expect(screen.getByText(items[0].label)).toBeVisible();
		});

		it('should set focus on parent dropdown when closing a nested dropdown', async () => {
			const subItem = { id: '2', label: 'item 2' } satisfies DropdownItem;
			const items = [{ id: '1', label: 'item 1', items: [subItem] }] satisfies DropdownItem[];
			const { user } = setup(
				<Dropdown items={items} forceOpen>
					<Button label="opener" onClick={jest.fn()} />
				</Dropdown>
			);
			await user.hover(screen.getByText(items[0].label));
			await screen.findByText(subItem.label);
			await user.esc();
			expect(findDropdownItem(items[0].label)).toHaveFocus();
		});

		it('should keep working on second time dropdown is opened', async () => {
			const subItem = { id: '2', label: 'item 2' } satisfies DropdownItem;
			const items = [
				{ id: '1', label: 'item 1', items: [subItem] },
				{ id: '3', label: 'item 3' }
			] satisfies DropdownItem[];
			const { user } = setup(
				<Dropdown items={items}>
					<Button label="opener" onClick={jest.fn()} />
				</Dropdown>
			);
			await user.click(screen.getByRole('button'));
			expect(findDropdownItem(items[0].label)).toHaveFocus();
			await user.arrowDown();
			expect(findDropdownItem(items[1].label)).toHaveFocus();
			await user.click(screen.getByRole('button'));
			expect(screen.queryByText(items[0].label)).not.toBeInTheDocument();
			await user.click(screen.getByRole('button'));
			expect(findDropdownItem(items[0].label)).toHaveFocus();
			await user.arrowDown();
			expect(findDropdownItem(items[1].label)).toHaveFocus();
		});

		it('should invoke the onClick callback of the item on Enter and close dropdown', async () => {
			const parentItem = {
				id: '1',
				label: 'item 1',
				onClick: jest.fn()
			} satisfies DropdownItem;
			const items = [parentItem];
			const { user } = setup(
				<Dropdown items={items}>
					<Button label="opener" onClick={jest.fn()} />
				</Dropdown>
			);
			await user.click(screen.getByRole('button'));
			expect(findDropdownItem(parentItem.label)).toHaveFocus();
			await user.enter();
			expect(parentItem.onClick).toHaveBeenCalled();
			expect(screen.queryByText(parentItem.label)).not.toBeInTheDocument();
		});

		it('should invoke the onClick callback of the nested item on Enter and close dropdown', async () => {
			const subItem = { id: '2', label: 'item 2', onClick: jest.fn() } satisfies DropdownItem;
			const parentItem = {
				id: '1',
				label: 'item 1',
				onClick: jest.fn(),
				items: [subItem]
			} satisfies DropdownItem;
			const items = [parentItem];
			const { user } = setup(
				<Dropdown items={items}>
					<Button label="opener" onClick={jest.fn()} />
				</Dropdown>
			);
			await user.click(screen.getByRole('button'));
			await user.arrowRight();
			expect(findDropdownItem(subItem.label)).toHaveFocus();
			await user.enter();
			expect(subItem.onClick).toHaveBeenCalled();
			expect(parentItem.onClick).not.toHaveBeenCalled();
			expect(screen.queryByText(parentItem.label)).not.toBeInTheDocument();
			expect(screen.queryByText(subItem.label)).not.toBeInTheDocument();
		});
	});
});
