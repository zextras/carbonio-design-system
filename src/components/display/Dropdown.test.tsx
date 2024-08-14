/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { act } from '@testing-library/react';

import { Dropdown, DropdownItem } from './Dropdown';
import { setup, within, screen, UserEvent } from '../../test-utils';
import { SELECTORS } from '../../testUtils/constants';
import { Button } from '../basic/button/Button';
import { TIMERS } from '../constants';
import { Modal } from '../feedback/Modal';

function findDropdownItem(label: string, container: HTMLElement = document.body): HTMLElement {
	function findNested(fromElement: HTMLElement): HTMLElement | undefined {
		return within(fromElement)
			.queryAllByTestId(SELECTORS.dropdownItem)
			.find((item) => within(item).queryByText(label) !== null && findNested(item) === undefined);
	}

	const dropdownItem = findNested(container);
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

	it('should render the icon of the dropdown item if set', async () => {
		const items = [{ id: '1', label: 'Some Item', icon: 'People' }] satisfies DropdownItem[];
		const { user } = setup(
			<Dropdown items={items} placement="bottom-end">
				<Button icon="ArrowDown" label="Create" onClick={jest.fn()} />
			</Dropdown>
		);

		await user.click(screen.getByRole('button'));
		expect(screen.getByTestId('icon: People')).toBeVisible();
	});

	it('should render a divider if the item has type "divider"', async () => {
		const items = [
			{ id: '1', label: 'Some Item', icon: 'People' },
			{ id: '2', type: 'divider' }
		] satisfies DropdownItem[];
		const { user } = setup(
			<Dropdown items={items} placement="bottom-end">
				<Button icon="ArrowDown" label="Create" onClick={jest.fn()} />
			</Dropdown>
		);

		await user.click(screen.getByRole('button'));
		expect(screen.getByTestId(SELECTORS.divider)).toBeVisible();
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

	it('should set focus on selected item on open', async () => {
		const items = [
			{ id: '1', label: 'item 1' },
			{ id: '2', label: 'item 2', selected: true }
		] satisfies DropdownItem[];
		const { user } = setup(
			<Dropdown items={items}>
				<Button label="opener" onClick={jest.fn()} />
			</Dropdown>
		);
		await user.click(screen.getByRole('button'));
		const firstDropdownItem = findDropdownItem(items[1].label);
		expect(firstDropdownItem).toHaveFocus();
	});

	it('should set focus on selected sub-item on open of nested dropdown', async () => {
		const subitems = [
			{ id: '2', label: 'item 2' },
			{ id: '3', label: 'item 3', selected: true }
		] satisfies DropdownItem[];
		const items = [
			{ id: '1', label: 'item 1', items: subitems },
			{ id: '4', label: 'item 4', selected: true }
		] satisfies DropdownItem[];
		const { user } = setup(
			<Dropdown items={items}>
				<Button label="opener" onClick={jest.fn()} />
			</Dropdown>
		);
		await user.click(screen.getByRole('button'));
		expect(findDropdownItem(items[1].label)).toHaveFocus();
		await user.hover(screen.getByText(items[0].label));
		expect(findDropdownItem(subitems[1].label)).toHaveFocus();
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
				{/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
				<div tabIndex={0}>opener</div>
			</Dropdown>
		);
		await user.click(screen.getByText('opener'));
		await user.click(screen.getByText(firstItem.label));
		expect(screen.queryByText(firstItem.label)).not.toBeInTheDocument();
		expect(screen.getByText('opener')).toHaveFocus();
	});

	it('should set focus on first focusable element inside trigger component on close after clicking an item', async () => {
		const items = [{ id: '1', label: 'Some Item' }] satisfies DropdownItem[];
		const firstItem = items[0];
		const { user } = setup(
			<Dropdown items={items}>
				<div>
					<div>Non focusable element</div>
					{/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
					<div tabIndex={0}>opener</div>
					{/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
					<div tabIndex={0}>another focusable element</div>
				</div>
			</Dropdown>
		);
		await user.click(screen.getByText('Non focusable element'));
		await user.click(screen.getByText(firstItem.label));
		expect(screen.queryByText(firstItem.label)).not.toBeInTheDocument();
		expect(screen.getByText('opener')).toHaveFocus();
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
		const subItem = {
			id: 'sub1',
			label: 'sub1',
			onClick: jest.fn()
		} satisfies DropdownItem;
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

	it('should keep nested dropdown open if mouse leaves it and then quickly enter again in it', async () => {
		const subItem = { id: '2', label: '2' } satisfies DropdownItem;
		const items = [
			{ id: '1', label: '1', items: [subItem] },
			{ id: '3', label: 'item 3' }
		] satisfies DropdownItem[];

		const { user } = setup(
			<Dropdown items={items}>
				<Button label="opener" onClick={jest.fn()} />
			</Dropdown>
		);

		await user.click(screen.getByRole('button'));
		await user.hover(screen.getByText(items[0].label));
		await user.hover(screen.getByText(subItem.label));
		await user.hover(screen.getByText(items[1].label));
		jest.advanceTimersByTime(TIMERS.DROPDOWN.CLOSE_NESTED - 1);
		expect(screen.getByText(subItem.label)).toBeVisible();
		await user.hover(screen.getByText(subItem.label));
		jest.runOnlyPendingTimers();
		expect(screen.getByText(subItem.label)).toBeVisible();
	});

	it('should keep nested dropdown open when hovering from nested dropdown to parent item', async () => {
		const subItem = { id: '2', label: '2' } satisfies DropdownItem;
		const items = [{ id: '1', label: '1', items: [subItem] }] satisfies DropdownItem[];

		const { user } = setup(
			<Dropdown items={items}>
				<Button label="opener" onClick={jest.fn()} />
			</Dropdown>
		);

		await user.click(screen.getByRole('button'));
		await user.hover(screen.getByText(items[0].label));
		await user.hover(screen.getByText(subItem.label));
		jest.advanceTimersByTime(TIMERS.DROPDOWN.CLOSE_NESTED - 1);
		await user.hover(screen.getByText(items[0].label));
		jest.runOnlyPendingTimers();
		expect(screen.getByText(subItem.label)).toBeVisible();
	});

	it('should close nested dropdown if mouse leaves the nested dropdown and enter a different item', async () => {
		const subItem = { id: '2', label: '2' } satisfies DropdownItem;
		const items = [
			{ id: '1', label: '1', items: [subItem] },
			{ id: '3', label: 'item 3' }
		] satisfies DropdownItem[];

		const { user } = setup(
			<Dropdown items={items}>
				<Button label="opener" onClick={jest.fn()} />
			</Dropdown>
		);

		await user.click(screen.getByRole('button'));
		await user.hover(screen.getByText(items[0].label));
		await user.hover(screen.getByText(subItem.label));
		await user.hover(screen.getByText(items[1].label));
		act(() => {
			jest.advanceTimersByTime(TIMERS.DROPDOWN.CLOSE_NESTED);
		});
		expect(screen.queryByText(subItem.label)).not.toBeInTheDocument();
	});

	it('should keep dropdown open when clicking on item if keepOpen is set on it', async () => {
		const items = [
			{ id: '1', label: '1', keepOpen: true, onClick: jest.fn() }
		] satisfies DropdownItem[];

		const { user } = setup(
			<Dropdown items={items}>
				<Button label="opener" onClick={jest.fn()} />
			</Dropdown>
		);

		await user.click(screen.getByRole('button'));
		await user.click(screen.getByText(items[0].label));
		expect(items[0].onClick).toHaveBeenCalled();
		expect(screen.getByText(items[0].label)).toBeVisible();
	});

	it('should keep dropdown open when clicking on sub-item if keepOpen is set on it', async () => {
		const subItem = {
			id: '2',
			label: 'item 2',
			keepOpen: true,
			onClick: jest.fn()
		} satisfies DropdownItem;
		const items = [
			{ id: '1', label: 'item 1', onClick: jest.fn(), items: [subItem] }
		] satisfies DropdownItem[];

		const { user } = setup(
			<Dropdown items={items}>
				<Button label="opener" onClick={jest.fn()} />
			</Dropdown>
		);

		await user.click(screen.getByRole('button'));
		await user.hover(screen.getByText(items[0].label));
		await user.click(screen.getByText(subItem.label));
		expect(subItem.onClick).toHaveBeenCalled();
		expect(items[0].onClick).not.toHaveBeenCalled();
		expect(screen.getByText(items[0].label)).toBeVisible();
		expect(screen.getByText(subItem.label)).toBeVisible();
	});

	it('should not call onClick on disabled item', async () => {
		const items = [
			{ id: '1', label: 'item 1', onClick: jest.fn(), disabled: true }
		] satisfies DropdownItem[];

		const { user } = setup(
			<Dropdown items={items}>
				<Button label="opener" onClick={jest.fn()} />
			</Dropdown>
		);

		await user.click(screen.getByRole('button'));
		await user.click(screen.getByText(items[0].label));
		expect(items[0].onClick).not.toHaveBeenCalled();
	});

	it('should keep second level open while hovering on third level', async () => {
		const items = [
			{
				id: '1',
				label: 'item 1',
				items: [
					{
						id: '2',
						label: 'item 2',
						items: [
							{
								id: '3',
								label: 'item 3'
							}
						]
					}
				]
			}
		] satisfies DropdownItem[];

		const { user } = setup(
			<Dropdown items={items}>
				<Button label="opener" onClick={jest.fn()} />
			</Dropdown>
		);
		await user.click(screen.getByRole('button'));
		await user.hover(screen.getByText('item 1'));
		await user.hover(screen.getByText('item 2'));
		await user.hover(screen.getByText('item 3'));
		act(() => {
			jest.advanceTimersByTime(TIMERS.DROPDOWN.CLOSE_NESTED);
		});
		expect(screen.getByText('item 1')).toBeVisible();
		expect(screen.getByText('item 2')).toBeVisible();
		expect(screen.getByText('item 3')).toBeVisible();
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

		it('should set focus on last item when pressing shift+tab and focus is on first item', async () => {
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
			await user.tab({ shift: true });
			expect(findDropdownItem(items[items.length - 1].label)).toHaveFocus();
		});

		it('should set focus on first item when pressing tab and focus is on last item', async () => {
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
			await user.tab({ shift: true });
			expect(findDropdownItem(items[items.length - 1].label)).toHaveFocus();
			await user.tab();
			expect(findDropdownItem(items[0].label)).toHaveFocus();
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

		it('should close only nested dropdown when pressing arrow left', async () => {
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

		it('should close only nested dropdown on esc', async () => {
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

		it('should not call onClick for disabled item when pressing Enter', async () => {
			const item = {
				id: '1',
				label: 'item 1',
				onClick: jest.fn(),
				disabled: true
			} satisfies DropdownItem;
			const items = [item];
			const { user } = setup(
				<Dropdown items={items}>
					<Button label="opener" onClick={jest.fn()} />
				</Dropdown>
			);
			await user.click(screen.getByRole('button'));
			await user.enter();
			expect(item.onClick).not.toHaveBeenCalled();
		});

		it('should keep dropdown open when pressing Enter on item with keepOpen set on it', async () => {
			const items = [
				{ id: '1', label: '1', keepOpen: true, onClick: jest.fn() }
			] satisfies DropdownItem[];

			const { user } = setup(
				<Dropdown items={items}>
					<Button label="opener" onClick={jest.fn()} />
				</Dropdown>
			);

			await user.click(screen.getByRole('button'));
			await user.enter();
			expect(items[0].onClick).toHaveBeenCalled();
			expect(screen.getByText(items[0].label)).toBeVisible();
		});

		it('should keep dropdown open when pressing Enter on sub-item if keepOpen is set on it', async () => {
			const subItem = {
				id: '2',
				label: 'item 2',
				keepOpen: true,
				onClick: jest.fn()
			} satisfies DropdownItem;
			const items = [
				{ id: '1', label: 'item 1', onClick: jest.fn(), items: [subItem] }
			] satisfies DropdownItem[];

			const { user } = setup(
				<Dropdown items={items}>
					<Button label="opener" onClick={jest.fn()} />
				</Dropdown>
			);

			await user.click(screen.getByRole('button'));
			await user.hover(screen.getByText(items[0].label));
			await user.enter();
			expect(subItem.onClick).toHaveBeenCalled();
			expect(items[0].onClick).not.toHaveBeenCalled();
			expect(screen.getByText(items[0].label)).toBeVisible();
			expect(screen.getByText(subItem.label)).toBeVisible();
		});

		it('should open the dropdown with Enter if the trigger element is not a button and handleTriggerEvents is set to true', async () => {
			const items = [{ id: '1', label: 'item 1', onClick: jest.fn() }] satisfies DropdownItem[];

			const { user } = setup(
				<Dropdown items={items} handleTriggerEvents>
					{/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
					<div tabIndex={0}>opener</div>
				</Dropdown>
			);
			await user.tab();
			expect(screen.getByText('opener')).toHaveFocus();
			await user.enter();
			expect(screen.getByText(items[0].label)).toBeVisible();
		});

		it('should not open the dropdown with Enter if the trigger element is not a button and handleTriggerEvents is set to false', async () => {
			const items = [{ id: '1', label: 'item 1', onClick: jest.fn() }] satisfies DropdownItem[];

			const { user } = setup(
				<Dropdown items={items} handleTriggerEvents={false}>
					{/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
					<div tabIndex={0}>opener</div>
				</Dropdown>
			);
			await user.tab();
			expect(screen.getByText('opener')).toHaveFocus();
			await user.enter();
			expect(screen.queryByText(items[0].label)).not.toBeInTheDocument();
		});

		it.each<keyof Pick<UserEvent, 'esc' | 'arrowLeft'>>(['esc', 'arrowLeft'])(
			'should keep second level open when pressing %s on third level',
			async (key) => {
				const items = [
					{
						id: '1',
						label: 'item 1',
						items: [
							{
								id: '2',
								label: 'item 2',
								items: [
									{
										id: '3',
										label: 'item 3'
									}
								]
							}
						]
					}
				] satisfies DropdownItem[];

				const { user } = setup(
					<Dropdown items={items}>
						<Button label={'opener'} onClick={jest.fn()} />
					</Dropdown>
				);

				await user.click(screen.getByRole('button'));
				await user.arrowRight();
				await user.arrowRight();
				expect(screen.getByText('item 3')).toBeVisible();
				await user[key]();
				expect(screen.getByText('item 2')).toBeVisible();
				expect(screen.queryByText('item 3')).not.toBeInTheDocument();
			}
		);
	});
});
