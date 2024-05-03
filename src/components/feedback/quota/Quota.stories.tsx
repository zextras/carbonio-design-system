/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { Meta, StoryObj } from '@storybook/react';

import { Quota } from './Quota';

const meta = {
	component: Quota
} satisfies Meta<typeof Quota>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		fill: 75
	}
};

export const CustomColors: Story = {
	args: {
		fill: 17,
		fillBackground: 'error',
		background: 'gray3'
	}
};

export const CustomHeight: Story = {
	args: {
		fill: 100,
		height: '1.25rem'
	}
};
