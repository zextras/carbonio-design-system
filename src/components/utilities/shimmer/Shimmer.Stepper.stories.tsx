/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { Meta, StoryObj } from '@storybook/react';

import { Shimmer } from './Shimmer';

const meta = {
	component: Shimmer.Stepper
} satisfies Meta<typeof Shimmer.Stepper>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		steppersNumber: 5
	}
} satisfies Story;

export const Size = {
	args: {
		...Default.args,
		size: 'large'
	}
} satisfies Story;

export const NumberOfSteps = {
	args: {
		steppersNumber: 3
	}
} satisfies Story;
