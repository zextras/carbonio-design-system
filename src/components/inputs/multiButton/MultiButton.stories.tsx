/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { expect, fn, userEvent } from 'storybook/test';

import type { MultiButtonProps } from './MultiButton';
import { MultiButton } from './MultiButton';
import { MultiButtonCustomIcon } from './MultiButton.stories.CustomIcon';
import MultiButtonCustomIconSrc from './MultiButton.stories.CustomIcon?raw';
import { within } from '../../../../.storybook/test-utils';
import { colorArgType } from '../../../docs/utils';

const baseItems: MultiButtonProps['items'] = [
	{
		id: 'activity-1',
		icon: 'Activity',
		label: 'Some Item'
	},
	{
		id: 'activity-2',
		icon: 'Plus',
		label: 'Some Other Item',
		disabled: true
	}
];
const meta = {
	component: MultiButton,
	args: {
		onClick: fn(),
		label: 'click',
		items: baseItems
	},
	argTypes: {
		background: colorArgType,
		color: colorArgType,
		icon: { control: 'text' }
	}
} satisfies Meta<typeof MultiButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
	args: {
		primaryIcon: 'Plus',
		iconPlacement: 'left'
	}
} satisfies Story;

export const Size = {
	args: {
		size: 'extralarge'
	}
} satisfies Story;

export const PrimaryIcon = {
	args: {
		primaryIcon: 'Plus'
	}
} satisfies Story;

export const Width = {
	args: {
		width: 'fill'
	}
} satisfies Story;

export const Type = {
	args: {
		type: 'outlined'
	}
} satisfies Story;

export const Shape = {
	args: {
		shape: 'round'
	}
} satisfies Story;

export const Icon = {
	args: {
		icon: 'ActivityOutline'
	}
} satisfies Story;

export const Loading = {
	args: {
		loading: true
	}
} satisfies Story;

export const ToggleCustomIcon = {
	render: MultiButtonCustomIcon,
	parameters: {
		docs: {
			source: {
				code: MultiButtonCustomIconSrc
			}
		}
	},
	play: async ({ canvasElement }): Promise<void> => {
		const canvas = within(canvasElement);
		const toggleOpen = canvas.getByRoleWithIcon('button', {
			icon: 'icon: Plus'
		});
		await userEvent.click(toggleOpen);
		const toggleClose = await canvas.findByRoleWithIcon('button', {
			icon: 'icon: Close'
		});
		await expect(toggleClose).toBeVisible();
		await userEvent.click(toggleClose);
		await expect(
			await canvas.findByRoleWithIcon('button', {
				icon: 'icon: Plus'
			})
		).toBeVisible();
	}
} satisfies Story;
