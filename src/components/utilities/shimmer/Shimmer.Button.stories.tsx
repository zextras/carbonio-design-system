/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { Meta, StoryObj } from '@storybook/react';

import { Shimmer } from './Shimmer';

const meta = {
	component: Shimmer.Button
} satisfies Meta<typeof Shimmer.Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Size = {
	args: {
		size: 'large'
	}
} satisfies Story;

export const Radius = {
	args: {
		radius: '2em'
	}
} satisfies Story;
