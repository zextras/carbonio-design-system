/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { LoadMore } from './LoadMore';

const meta = {
	component: LoadMore
} satisfies Meta<typeof LoadMore>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
	args: {
		label: 'Load more'
	}
} satisfies Story;
