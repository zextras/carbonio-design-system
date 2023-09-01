/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { screen, act, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { find, noop } from 'lodash';

import { Dropdown, DropdownItem } from './Dropdown';
import { render, within } from '../../test-utils';
import { ICONS, SELECTORS } from '../../testUtils/constants';
import { Button } from '../basic/Button';
import { Modal } from '../feedback/Modal';

const generateItems = (): DropdownItem[] => [
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

function findDropdownItem(label: string): HTMLElement {
	const dropdownItem = find(
		screen.getAllByTestId(SELECTORS.dropdownItem),
		(item) => within(item).queryByText(label) !== null
	);
	expect(dropdownItem).toBeDefined();
	return dropdownItem as HTMLElement;
}

describe('Dropdown', () => {
	test('Render closed dropdown', () => {
		const onClick = jest.fn();
		render(
			<Dropdown items={generateItems()} placement="bottom-end">
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
			<Dropdown items={generateItems()} placement="bottom-end">
				<Button icon="ArrowDown" label="Create" onClick={onClick} />
			</Dropdown>
		);

		userEvent.click(screen.getByRole('button'));

		expect(screen.getByText('Some Item')).toBeInTheDocument();
		expect(screen.getByText('Some Other Item')).toBeInTheDocument();
		expect(screen.getByText('Yet Another Item')).toBeInTheDocument();
	});

	test('click on dropdown trigger toggle dropdown visibility', async () => {
		const onClick = jest.fn();
		render(
			<Dropdown items={generateItems()}>
				<Button label="opener" onClick={onClick} />
			</Dropdown>
		);

		expect(screen.getByRole('button', { name: /opener/i })).toBeInTheDocument();
		// dropdown is closed
		expect(screen.queryByText(/some item/i)).not.toBeInTheDocument();
		// first click trigger open
		userEvent.click(screen.getByRole('button', { name: /opener/i }));
		await screen.findByText(/some item/i);
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
				<Dropdown items={generateItems()}>
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
		const items = generateItems();
		(items[3].items as DropdownItem[])[0].onClick = item3Sub1ClickFn;
		items[3].onClick = item3ClickFn;
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
		expect(screen.getByTestId(ICONS.dropdownNestedLevel)).toBeVisible();
		userEvent.hover(screen.getByTestId(ICONS.dropdownNestedLevel));
		await screen.findByText(/item 4 sub 1/i);
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
			<Dropdown items={generateItems()} contextMenu>
				<Button label="opener" onClick={onClick} />
			</Dropdown>
		);

		expect(screen.getByRole('button', { name: /opener/i })).toBeInTheDocument();
		// dropdown is closed
		expect(screen.queryByText(/some item/i)).not.toBeInTheDocument();
		// right click trigger open
		fireEvent.contextMenu(screen.getByRole('button', { name: /opener/i }));
		await screen.findByText(/some item/i);
		expect(screen.getByText(/some item/i)).toBeInTheDocument();
		expect(screen.getByText(/Some Other Item/i)).toBeInTheDocument();
		expect(screen.getByText(/Yet Another Item/i)).toBeInTheDocument();
		// second right click trigger open of a new dropdown, closing the previous one
		fireEvent.contextMenu(screen.getByRole('button', { name: /opener/i }));
		await screen.findByText(/some item/i);
		expect(screen.getByText(/some item/i)).toBeInTheDocument();
		expect(screen.getByText(/Some Other Item/i)).toBeInTheDocument();
		expect(screen.getByText(/Yet Another Item/i)).toBeInTheDocument();
		// left click trigger close
		userEvent.click(screen.getByRole('button', { name: /opener/i }));
		expect(screen.queryByText(/some item/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Some Other Item/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Yet Another Item/i)).not.toBeInTheDocument();
	});

	test('should set focus on first element on open', async () => {
		const items = generateItems();
		const firstItem = items[0];
		render(
			<Dropdown items={items}>
				<Button label="opener" onClick={noop} />
			</Dropdown>
		);
		userEvent.click(screen.getByRole('button'));
		await screen.findByText(firstItem.label);
		const firstDropdownItem = findDropdownItem(firstItem.label);
		await waitFor(() => expect(firstDropdownItem).toHaveFocus());
	});

	test('should keep focus on trigger component if the disabledAutoFocus prop is set to true', async () => {
		const items = generateItems();
		const firstItem = items[0];
		render(
			<Dropdown items={items} disableAutoFocus>
				<Button label="opener" onClick={noop} />
			</Dropdown>
		);
		userEvent.click(screen.getByRole('button'));
		await screen.findByText(firstItem.label);
		expect(screen.getByRole('button', { name: /opener/i })).toHaveFocus();
	});

	test('should set focus on trigger component on close', async () => {
		const items = generateItems();
		const firstItem = items[0];
		const { user } = render(
			<Dropdown items={items}>
				<Button label="opener" onClick={noop} />
			</Dropdown>
		);
		await user.click(screen.getByRole('button'));
		const firstItemElement = await screen.findByText(firstItem.label);
		await user.click(firstItemElement);
		expect(screen.getByRole('button', { name: /opener/i })).toHaveFocus();
	});

	test('should not set focus on trigger component on close if disabledRestoreFocus is true', async () => {
		const items = generateItems();
		const firstItem = items[0];
		render(
			<Dropdown items={items} disableRestoreFocus>
				<Button label="opener" onClick={noop} />
			</Dropdown>
		);
		userEvent.click(screen.getByRole('button'));
		await screen.findByText(firstItem.label);
		userEvent.click(screen.getByText(firstItem.label));
		expect(screen.getByRole('button', { name: /opener/i })).not.toHaveFocus();
	});

	test('should set focus on first sub-item when opening nested dropdown', async () => {
		const items = generateItems();
		const itemWithSubItems = items[3];
		const firstSubItem = itemWithSubItems.items?.[0] as DropdownItem;
		render(
			<Dropdown items={items}>
				<Button label="opener" onClick={noop} />
			</Dropdown>
		);
		userEvent.click(screen.getByRole('button'));
		const parentItem = await screen.findByText(itemWithSubItems.label);
		userEvent.hover(parentItem);
		await screen.findByText(firstSubItem.label);
		const firstNestedDropdownItem = findDropdownItem(firstSubItem.label);
		await waitFor(() => expect(firstNestedDropdownItem).toHaveFocus());
	});

	test('should set focus on trigger component when clicking on a nested item', async () => {
		const items = generateItems();
		const firstItem = items[0];
		const subItem: DropdownItem = {
			id: 'sub1',
			label: 'sub1',
			onClick: jest.fn()
		};
		firstItem.items = [subItem];
		const { user } = render(
			<Dropdown items={items} disableAutoFocus>
				<Button label="opener" onClick={noop} />
			</Dropdown>
		);
		await user.click(screen.getByRole('button'));
		const firstItemElement = await screen.findByText(firstItem.label);
		await user.hover(firstItemElement);
		const subItemElement = await screen.findByText(subItem.label);
		await user.click(subItemElement);
		expect(screen.getByRole('button', { name: /opener/i })).toHaveFocus();
	});

	describe('Keyboard shortcuts', () => {
		test('should set focus on next item when pressing arrow down', async () => {
			const items = generateItems();
			items.forEach((item) => {
				// eslint-disable-next-line no-param-reassign
				item.disabled = false;
			});
			const { user } = render(
				<Dropdown items={items} forceOpen>
					<Button label="opener" onClick={noop} />
				</Dropdown>
			);
			await waitFor(() => expect(findDropdownItem(items[0].label)).toHaveFocus());
			await user.arrowDown();
			await waitFor(() => expect(findDropdownItem(items[1].label)).toHaveFocus());
		});

		test('should set focus on previous item when pressing arrow up', async () => {
			const items = generateItems();
			items.forEach((item) => {
				// eslint-disable-next-line no-param-reassign
				item.disabled = false;
			});
			const { user } = render(
				<Dropdown items={items} forceOpen>
					<Button label="opener" onClick={noop} />
				</Dropdown>
			);
			await waitFor(() => expect(findDropdownItem(items[0].label)).toHaveFocus());
			await user.arrowDown();
			await waitFor(() => expect(findDropdownItem(items[1].label)).toHaveFocus());
			await user.arrowUp();
			await waitFor(() => expect(findDropdownItem(items[0].label)).toHaveFocus());
		});

		test('should set focus on last item when pressing arrow up and focus is on first item', async () => {
			const items = generateItems();
			items.forEach((item) => {
				// eslint-disable-next-line no-param-reassign
				item.disabled = false;
			});
			const { user } = render(
				<Dropdown items={items} forceOpen>
					<Button label="opener" onClick={noop} />
				</Dropdown>
			);
			await waitFor(() => expect(findDropdownItem(items[0].label)).toHaveFocus());
			await user.arrowUp();
			await waitFor(() => expect(findDropdownItem(items[items.length - 1].label)).toHaveFocus());
		});

		test('should set focus on first item when pressing arrow down and focus is on last item', async () => {
			const items = generateItems();
			items.forEach((item) => {
				// eslint-disable-next-line no-param-reassign
				item.disabled = false;
			});
			const { user } = render(
				<Dropdown items={items} forceOpen>
					<Button label="opener" onClick={noop} />
				</Dropdown>
			);
			await waitFor(() => expect(findDropdownItem(items[0].label)).toHaveFocus());
			await user.arrowUp();
			await waitFor(() => expect(findDropdownItem(items[items.length - 1].label)).toHaveFocus());
			await user.arrowDown();
			await waitFor(() => expect(findDropdownItem(items[0].label)).toHaveFocus());
		});

		test('should set focus on next item when pressing tab', async () => {
			const items = generateItems();
			items.forEach((item) => {
				// eslint-disable-next-line no-param-reassign
				item.disabled = false;
			});
			const { user } = render(
				<Dropdown items={items} forceOpen>
					<Button label="opener" onClick={noop} />
				</Dropdown>
			);
			await waitFor(() => expect(findDropdownItem(items[0].label)).toHaveFocus());
			await user.tab();
			await waitFor(() => expect(findDropdownItem(items[1].label)).toHaveFocus());
		});

		test('should set focus on previous item when pressing shift+tab', async () => {
			const items = generateItems();
			items.forEach((item) => {
				// eslint-disable-next-line no-param-reassign
				item.disabled = false;
			});
			const { user } = render(
				<Dropdown items={items} forceOpen>
					<Button label="opener" onClick={noop} />
				</Dropdown>
			);
			await waitFor(() => expect(findDropdownItem(items[0].label)).toHaveFocus());
			await user.tab();
			await waitFor(() => expect(findDropdownItem(items[1].label)).toHaveFocus());
			await user.tab();
			await waitFor(() => expect(findDropdownItem(items[2].label)).toHaveFocus());
			await user.tab({ shift: true });
			await waitFor(() => expect(findDropdownItem(items[1].label)).toHaveFocus());
		});

		test('should open nested dropdown when pressing arrow right', async () => {
			const items = generateItems();
			items[0].disabled = false;
			const subItem: DropdownItem = {
				id: 'item-1-1',
				label: 'item-1-1'
			};
			items[0].items = [subItem];
			const { user } = render(
				<Dropdown items={items} forceOpen>
					<Button label="opener" onClick={noop} />
				</Dropdown>
			);
			await waitFor(() => expect(findDropdownItem(items[0].label)).toHaveFocus());
			await user.arrowRight();
			const subItemElement = await screen.findByText(subItem.label);
			expect(subItemElement).toBeVisible();
		});

		test('should move focus between items of the open nested dropdown', async () => {
			const items = generateItems();
			items[0].disabled = false;
			const subItems: DropdownItem[] = [
				{
					id: 'item-1-1',
					label: 'item-1-1'
				},
				{
					id: 'item-1-2',
					label: 'item-1-2'
				}
			];
			items[0].items = subItems;
			const { user } = render(
				<Dropdown items={items} forceOpen>
					<Button label="opener" onClick={noop} />
				</Dropdown>
			);
			await waitFor(() => expect(findDropdownItem(items[0].label)).toHaveFocus());
			await user.arrowRight();
			await waitFor(() => expect(findDropdownItem(subItems[0].label)).toHaveFocus());
			await user.arrowDown();
			await waitFor(() => expect(findDropdownItem(subItems[1].label)).toHaveFocus());
		});

		test('should close nested dropdown when pressing arrow left', async () => {
			const items = generateItems();
			items[0].disabled = false;
			const subItem: DropdownItem = {
				id: 'item-1-1',
				label: 'item-1-1'
			};
			items[0].items = [subItem];
			const { user } = render(
				<Dropdown items={items} forceOpen>
					<Button label="opener" onClick={noop} />
				</Dropdown>
			);
			await waitFor(() => expect(findDropdownItem(items[0].label)).toHaveFocus());
			await user.arrowRight();
			await waitFor(() => expect(findDropdownItem(subItem.label)).toHaveFocus());
			await user.arrowLeft();
			expect(screen.queryByText(subItem.label)).not.toBeInTheDocument();
		});

		test('should close dropdown on esc', async () => {
			const items = generateItems();
			const { user } = render(
				<Dropdown items={items}>
					<Button label="opener" onClick={noop} />
				</Dropdown>
			);
			await user.click(screen.getByRole('button'));
			await screen.findByText(items[0].label);
			await user.esc();
			expect(screen.queryByText(items[0].label)).not.toBeInTheDocument();
		});

		test('should close nested dropdown on esc', async () => {
			const items = generateItems();
			const subItem: DropdownItem = {
				id: 'item-1-1',
				label: 'item-1-1'
			};
			items[0].items = [subItem];
			const { user } = render(
				<Dropdown items={items} forceOpen>
					<Button label="opener" onClick={noop} />
				</Dropdown>
			);
			const parentItem = await screen.findByText(items[0].label);
			await user.hover(parentItem);
			await screen.findByText(subItem.label);
			await user.esc();
			expect(screen.queryByText(subItem.label)).not.toBeInTheDocument();
			expect(parentItem).toBeVisible();
		});

		test('should set focus on parent dropdown when closing a nested dropdown', async () => {
			const items = generateItems();
			const subItem: DropdownItem = {
				id: 'item-1-1',
				label: 'item-1-1'
			};
			items[0].items = [subItem];
			const { user } = render(
				<Dropdown items={items} forceOpen>
					<Button label="opener" onClick={noop} />
				</Dropdown>
			);
			const parentItem = await screen.findByText(items[0].label);
			await user.hover(parentItem);
			await screen.findByText(subItem.label);
			await user.esc();
			await waitFor(() => expect(findDropdownItem(items[0].label)).toHaveFocus());
		});

		test('should keep working on second time dropdown is opened', async () => {
			const items = generateItems();
			items.forEach((item) => {
				// eslint-disable-next-line no-param-reassign
				item.disabled = false;
			});
			const { user } = render(
				<Dropdown items={items}>
					<Button label="opener" onClick={noop} />
				</Dropdown>
			);
			await user.click(screen.getByRole('button'));
			await waitFor(() => expect(findDropdownItem(items[0].label)).toHaveFocus());
			await user.arrowDown();
			await waitFor(() => expect(findDropdownItem(items[1].label)).toHaveFocus());
			await user.click(screen.getByRole('button'));
			expect(screen.queryByText(items[0].label)).not.toBeInTheDocument();
			await user.click(screen.getByRole('button'));
			await waitFor(() => expect(findDropdownItem(items[0].label)).toHaveFocus());
			await user.arrowDown();
			await waitFor(() => expect(findDropdownItem(items[1].label)).toHaveFocus());
		});
	});
});
