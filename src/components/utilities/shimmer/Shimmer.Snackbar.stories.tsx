/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { Meta, StoryObj } from '@storybook/react';

import { Shimmer } from './Shimmer';

const meta = {
	component: Shimmer.Snackbar
} satisfies Meta<typeof Shimmer.Snackbar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Width = {
	args: {
		width: '12.375rem'
	}
} satisfies Story;

export const WithElementStart = {
	args: {
		elementStart: true
	}
} satisfies Story;

export const WithElementEnd = {
	args: {
		elementEnd: true
	}
} satisfies Story;
