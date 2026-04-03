/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Shimmer } from './Shimmer';

const meta = {
	component: Shimmer.Quota
} satisfies Meta<typeof Shimmer.Quota>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Width = {
	args: {
		width: '80%'
	}
} satisfies Story;

export const Height = {
	args: {
		height: '0.5rem'
	}
} satisfies Story;
