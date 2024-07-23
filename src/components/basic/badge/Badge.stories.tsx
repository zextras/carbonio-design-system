/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Badge, BadgeComponentProps } from './Badge';
import { colorArgType } from '../../../docs/utils';

const meta = {
	component: Badge,
	argTypes: {
		color: colorArgType,
		backgroundColor: colorArgType
	}
} satisfies Meta<BadgeComponentProps>;

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
};

export const ValueNumber = {
	args: {
		value: 200
	}
};

export const WithoutValue = {
	args: {
		value: ''
	}
};

export const ColorAndBackgroundColor = {
	args: {
		value: 'Sent',
		color: 'primary',
		backgroundColor: 'warning'
	}
};

export const Icon = {
	args: {
		icon: 'Activity'
	}
};

export const MaxValue = {
	args: {
		value: 40,
		maxValue: 30,
		color: 'gray6',
		backgroundColor: 'primary'
	}
};
