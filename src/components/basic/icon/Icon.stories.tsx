/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from './Icon';
import { colorArgType } from '../../../docs/utils';
import { BackupOutline } from '../../../icons/outline';

const meta = {
	component: Icon,
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		color: colorArgType
	}
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
	args: {
		icon: 'Activity'
	}
} satisfies Story;

export const Size = {
	args: {
		icon: 'Activity',
		size: 'large'
	}
} satisfies Story;

export const Color = {
	args: {
		icon: 'Award',
		color: 'primary'
	}
} satisfies Story;

export const CustomColor = {
	args: {
		icon: 'Award',
		color: 'rgba(100, 50, 50, 0.7)'
	}
} satisfies Story;

export const CustomColorWithVariants = {
	args: {
		icon: 'Award',
		color: '#73457A.active'
	}
} satisfies Story;

export const CustomIcon = {
	args: {
		icon: BackupOutline
	}
} satisfies Story;
