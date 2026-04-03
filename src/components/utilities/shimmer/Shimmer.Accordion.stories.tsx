/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Shimmer } from './Shimmer';

const meta = {
	component: Shimmer.Accordion
} satisfies Meta<typeof Shimmer.Accordion>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		width: '100%',
		badge: false,
		iconEnd: false,
		iconStart: false
	}
} satisfies Story;

export const Width = {
	args: {
		...Default.args,
		width: '11.375rem'
	}
} satisfies Story;

export const WithIconStart = {
	args: {
		...Default.args,
		iconStart: true
	}
} satisfies Story;

export const WithIconEnd = {
	args: {
		...Default.args,
		iconEnd: true
	}
} satisfies Story;

export const WithBadge = {
	args: {
		...Default.args,
		badge: true
	}
} satisfies Story;
