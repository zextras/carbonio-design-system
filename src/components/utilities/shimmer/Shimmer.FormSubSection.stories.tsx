/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Shimmer } from './Shimmer';

const meta = {
	component: Shimmer.FormSubSection
} satisfies Meta<typeof Shimmer.FormSubSection>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		variant: ''
	}
} satisfies Story;
