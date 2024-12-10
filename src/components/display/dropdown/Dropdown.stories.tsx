/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
/* eslint-disable no-console */

import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { fn, expect } from '@storybook/test';

import type { DropdownItem } from './Dropdown';
import { Dropdown } from './Dropdown';
import { within, screen, userEvent } from '../../../../.storybook/test-utils';
import { SELECTORS } from '../../../tests/constants';
import { Button } from '../../basic/button/Button';
import { Text } from '../../basic/text/Text';
import { Container } from '../../layout/container/Container';

const items: DropdownItem[] = [
	{
		id: 'item1',
		icon: 'Activity',
		label: 'Item 1',
		onClick: fn(() => console.log('click item 1')),
		items: [
			{
				id: 'item1.1',
				icon: 'Airplane',
				label: 'Item 1.1',
				onClick: fn(() => console.log('click item 1.1'))
			},
			{
				id: 'item1.2',
				icon: 'AllTasks',
				label: 'Item 1.2',
				onClick: fn(() => console.log('click item 1.2')),
				items: [
					{
						id: 'item1.2.1',
						label: 'Item 1.2.1',
						onClick: fn(() => console.log('click item 1.2.1'))
					},
					{
						id: 'item1.2.2',
						label: 'Item 1.2.2',
						onClick: fn(() => console.log('click item 1.2.2'))
					}
				]
			},
			{
				id: 'item1.3',
				icon: 'Archive',
				label: 'Item 1.3',
				onClick: fn(() => console.log('click item 1.3'))
			},
			{
				id: 'item1.4',
				icon: 'Award',
				label: 'Item 1.4',
				onClick: fn(() => console.log('click item 1.4'))
			}
		]
	},
	{
		id: 'item2',
		icon: 'Battery',
		label: 'Item 2',
		onClick: fn(() => console.log('click item 2'))
	},
	{ type: 'divider', id: 'divider-item', label: 'divider' },
	{
		id: 'item3',
		icon: 'Brush',
		label: 'Item 3',
		onClick: fn(() => console.log('click item 3'))
	},
	{
		id: 'item4',
		icon: 'Cake',
		label: 'Item 4',
		onClick: fn(() => console.log('click item 4'))
	}
];

const meta = {
	args: {
		items,
		onOpen: fn(),
		onClose: fn(),
		children: <Button onClick={(): void => undefined} label={'Open dropdown'} />
	},
	component: Dropdown
} satisfies Meta<typeof Dropdown>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	play: async ({ canvasElement }): Promise<void> => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button'));
		await expect(await screen.findByTestId(SELECTORS.dropdown)).toBeVisible();
		await expect(screen.getByText('Item 1')).toBeVisible();
		await expect(screen.getByText('Item 2')).toBeVisible();
		await expect(screen.getByTestId(SELECTORS.divider)).toBeVisible();
		await expect(screen.getByText('Item 3')).toBeVisible();
		await expect(screen.getByText('Item 4')).toBeVisible();
		await userEvent.hover(screen.getByText('Item 1'));
		await expect(await screen.findByText('Item 1.1')).toBeVisible();
		await expect(screen.getByText('Item 1.2')).toBeVisible();
		await userEvent.hover(screen.getByText('Item 1.2'));
		await expect(await screen.findByText('Item 1.2.1')).toBeVisible();
		await expect(screen.getByText('Item 1.2.2')).toBeVisible();
	}
} satisfies Story;

export const Placement = {
	render: function PlacementComponent(args): React.JSX.Element {
		const [d1Open, setD1Open] = useState(false);
		const [d2Open, setD2Open] = useState(false);
		const [d3Open, setD3Open] = useState(false);
		const [d4Open, setD4Open] = useState(false);

		return (
			<Container
				height={'400px'}
				orientation={'horizontal'}
				mainAlignment={'flex-start'}
				gap={'150px'}
			>
				<Dropdown {...args} placement={'bottom-start'} forceOpen={d1Open}>
					<Button
						icon="ArrowDown"
						onClick={(): void => {
							setD1Open((prevState) => !prevState);
						}}
					/>
				</Dropdown>
				<Dropdown {...args} placement={'top-end'} forceOpen={d2Open}>
					<Button
						icon="ArrowUp"
						onClick={(): void => {
							setD2Open((prevState) => !prevState);
						}}
					/>
				</Dropdown>
				<Dropdown {...args} placement={'left-start'} forceOpen={d3Open}>
					<Button
						icon="ArrowLeft"
						onClick={(): void => {
							setD3Open((prevState) => !prevState);
						}}
					/>
				</Dropdown>
				<Dropdown {...args} placement={'right-end'} forceOpen={d4Open}>
					<Button
						icon="ArrowRight"
						onClick={(): void => {
							setD4Open((prevState) => !prevState);
						}}
					/>
				</Dropdown>
			</Container>
		);
	},
	play: async ({ canvasElement }): Promise<void> => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRoleWithIcon('button', { icon: 'icon: ArrowDown' }));
		await userEvent.click(canvas.getByRoleWithIcon('button', { icon: 'icon: ArrowUp' }));
		await userEvent.click(canvas.getByRoleWithIcon('button', { icon: 'icon: ArrowLeft' }));
		await userEvent.click(canvas.getByRoleWithIcon('button', { icon: 'icon: ArrowRight' }));
	}
} satisfies Story;

export const ContextMenu = {
	args: {
		contextMenu: true,
		placement: 'right-start',
		children: <Text>Right click to open context menu</Text>
	},
	play: async ({ canvasElement }): Promise<void> => {
		const canvas = within(canvasElement);
		await userEvent.rightClick(canvas.getByText('Right click to open context menu'));
		await expect(await screen.findByTestId(SELECTORS.dropdown)).toBeVisible();
	}
} satisfies Story;

export const WithCustomSize = {
	args: {
		itemPaddingBetween: 'large',
		itemIconSize: 'large',
		itemTextSize: 'large'
	},
	play: async ({ canvasElement }): Promise<void> => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button'));
		await userEvent.hover(await screen.findByText('Item 1'));
		await userEvent.hover(await screen.findByText('Item 1.2'));
	}
} satisfies Story;

export const WithSelectedBackgroundColor = {
	args: {
		selectedBackgroundColor: 'highlight',
		items: [
			{
				id: 'item1',
				icon: 'Activity',
				label: 'Item 1',
				onClick: fn()
			},
			{
				id: 'item2',
				icon: 'Activity',
				label: 'Item 2',
				selected: true,
				items: [
					{
						id: 'item2.1',
						icon: 'Activity',
						label: 'Item 2.1',
						selected: true,
						onClick: fn()
					},
					{
						id: 'item2.2',
						icon: 'Activity',
						label: 'Item 2.2',
						onClick: fn()
					}
				]
			}
		]
	},
	play: async ({ canvasElement }): Promise<void> => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button'));
		await userEvent.hover(await screen.findByText('Item 2'));
	}
} satisfies Story;

export const WithCustomComponent = {
	args: {
		items: [
			{
				id: 'item1',
				label: 'Standard item',
				icon: 'Bulb'
			},
			{
				id: 'item2',
				label: 'Custom item',
				customComponent: (
					<Container orientation={'horizontal'} mainAlignment={'space-between'} gap={'0.5rem'}>
						<Text weight={'bold'}>Custom text</Text>
						<Button icon={'Plus'} type={'ghost'} onClick={fn()} />
					</Container>
				)
			}
		]
	},
	play: async ({ canvasElement }): Promise<void> => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button'));
	}
} satisfies Story;

export const KeepOpen = {
	args: {
		items: [
			{
				id: 'item1',
				label: 'Item 1',
				onClick: fn(),
				keepOpen: true,
				items: [
					{
						id: 'item1.1',
						label: 'Item 1.1',
						onClick: fn(),
						keepOpen: true
					}
				]
			}
		]
	},
	play: async ({ canvasElement }): Promise<void> => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button'));
		await userEvent.hover(await screen.findByText('Item 1'));
		await userEvent.click(await screen.findByText('Item 1.1'));
		await expect(screen.getByText('Item 1.1')).toBeVisible();
		await userEvent.click(await screen.findByText('Item 1'));
		await expect(screen.getByText('Item 1')).toBeVisible();
	}
} satisfies Story;

export const ForceOpenWithClickEnabled = {
	render: function ForceOpenWithClickEnabledComponent(args): React.JSX.Element {
		const [open, setOpen] = useState(false);
		return (
			<Container orientation="horizontal" mainAlignment="space-around">
				<Dropdown {...args} forceOpen={open} onOpen={() => setOpen(true)}>
					<Button label="click here to open" onClick={(): void => undefined} />
				</Dropdown>
				<Button label="click here to close" onClick={() => setOpen(false)} />
			</Container>
		);
	},
	play: async ({ canvasElement }): Promise<void> => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button', { name: 'click here to open' }));
		await expect(await screen.findByText('Item 1')).toBeVisible();
		await userEvent.click(canvas.getByRole('button', { name: 'click here to open' }));
		await expect(screen.getByText('Item 1')).toBeVisible();
		await userEvent.click(canvas.getByRole('button', { name: 'click here to close' }));
		await expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
	}
} satisfies Story;

export const ForceOpenWithClickDisabled = {
	render: function ForceOpenWithClickEnabledComponent(args): React.JSX.Element {
		const [open, setOpen] = useState(false);
		return (
			<Container orientation="horizontal" mainAlignment="space-around">
				<Dropdown {...args} forceOpen={open} disabled>
					<Button label="this button does nothing" onClick={(): void => undefined} />
				</Dropdown>
				<Button label="click here to open" onClick={() => setOpen(true)} />
				<Button label="click here to close" onClick={() => setOpen(false)} />
			</Container>
		);
	},
	play: async ({ canvasElement }): Promise<void> => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button', { name: 'this button does nothing' }));
		await expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
		await userEvent.click(canvas.getByRole('button', { name: 'click here to open' }));
		await expect(await screen.findByText('Item 1')).toBeVisible();
		await userEvent.click(canvas.getByRole('button', { name: 'this button does nothing' }));
		await expect(screen.getByText('Item 1')).toBeVisible();
		await userEvent.click(canvas.getByRole('button', { name: 'click here to close' }));
		await expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
	}
} satisfies Story;

export const DisabledItemWithTooltip = {
	args: {
		items: [
			{
				id: 'item1',
				label: 'Item 1',
				tooltipLabel: 'Tooltip for item 1',
				disabled: true
			},
			{
				id: 'item2',
				label: 'Item 2',
				tooltipLabel: 'Tooltip for item 2',
				disabled: false
			}
		]
	},
	play: async ({ canvasElement }): Promise<void> => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button'));
		await userEvent.hover(await screen.findByText('Item 1'));
		await expect(await screen.findByText('Tooltip for item 1')).toBeVisible();
		await userEvent.unhover(screen.getByText('Item 1'));
		await userEvent.hover(screen.getByText('Item 2'));
		await expect(screen.queryByText('Tooltip for item 2')).not.toBeInTheDocument();
	}
} satisfies Story;

export const WithHandleTriggerEventsOnDiv = {
	args: {
		children: (
			// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
			<div tabIndex={0} data-testid={'trigger'}>
				place focus on this container, then press space or enter to open the dropdown
			</div>
		),
		handleTriggerEvents: true
	},
	play: async ({ canvasElement }): Promise<void> => {
		const canvas = within(canvasElement);
		canvas.getByTestId('trigger').focus();
		await expect(canvas.getByTestId('trigger')).toHaveFocus();
		await userEvent.keyboard(' ');
		await expect(await screen.findByText('Item 1')).toBeVisible();
	}
} satisfies Story;
