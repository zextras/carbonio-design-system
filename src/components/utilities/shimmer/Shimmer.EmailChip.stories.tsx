/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { Meta, StoryObj } from '@storybook/react';

import { Shimmer } from './Shimmer';

const meta = {
	component: Shimmer.EmailChip
} satisfies Meta<typeof Shimmer.EmailChip>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Width = {
	args: {
		width: '5.5625rem'
	}
} satisfies Story;

export const WithIconStart = {
	args: {
		iconStart: true
	}
} satisfies Story;

export const WithIconEnd = {
	args: {
		iconEnd: true
	}
} satisfies Story;

export const WithIconEndAdditional = {
	args: {
		iconEnd: true,
		iconEndAdditional: true
	}
} satisfies Story;
