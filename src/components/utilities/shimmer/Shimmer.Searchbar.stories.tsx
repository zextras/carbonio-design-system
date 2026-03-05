/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Shimmer } from './Shimmer';

const meta = {
	component: Shimmer.Searchbar
} satisfies Meta<typeof Shimmer.Searchbar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Width = {
	args: {
		width: '18.75rem'
	}
} satisfies Story;
