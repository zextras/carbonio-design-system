/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Badge } from './Badge';
import { colorArgType } from '../../../docs/utils';

const meta = {
	component: Badge,
	argTypes: {
		value: {
			type: 'string'
		},
		color: colorArgType,
		backgroundColor: colorArgType
	}
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
	args: {
		value: 'Value'
	}
} satisfies Story;

export const ValueString = {
	args: {
		value: 'Sent'
	}
} satisfies Story;

export const ValueNumber = {
	args: {
		value: 200
	}
} satisfies Story;

export const WithoutValue = {
	args: {
		value: ''
	}
} satisfies Story;

export const ColorAndBackgroundColor = {
	args: {
		value: 'Sent',
		color: 'primary',
		backgroundColor: 'warning'
	}
} satisfies Story;

export const Icon = {
	args: {
		icon: 'Activity'
	}
} satisfies Story;

export const MaxValue = {
	args: {
		value: 40,
		maxValue: 30,
		color: 'gray6',
		backgroundColor: 'primary'
	}
} satisfies Story;
