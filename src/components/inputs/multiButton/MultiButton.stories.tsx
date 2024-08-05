/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { MultiButton } from './MultiButton';
import { colorArgType } from '../../../docs/utils';

const meta = {
	component: MultiButton,
	args: {
		onClick: fn(),
		label: 'click',
		items: [
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
		]
	},
	argTypes: {
		color: colorArgType,
		background: colorArgType,
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
