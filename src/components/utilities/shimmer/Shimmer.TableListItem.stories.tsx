/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Shimmer } from './Shimmer';

const meta = {
	component: Shimmer.TableListItem
} satisfies Meta<typeof Shimmer.TableListItem>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Width = {
	args: {
		width: '28.4375rem'
	}
} satisfies Story;

export const Type1 = {
	args: {
		type: 1
	}
} satisfies Story;

export const Type2 = {
	args: {
		type: 2
	}
} satisfies Story;

export const Type3 = {
	args: {
		type: 3
	}
} satisfies Story;
