/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { Meta, StoryObj } from '@storybook/react';

import { Quota } from './Quota';
import { colorArgTypeControl } from '../../../docs/utils';

const meta = {
	component: Quota
} satisfies Meta<typeof Quota>;

export default meta;

type Story = StoryObj<typeof meta>;

const Common: Partial<Story> = {
	argTypes: {
		background: colorArgTypeControl,
		fillBackground: colorArgTypeControl
	}
};

export const Default: Story = {
	...Common,
	args: {
		fill: 75
	}
};

export const CustomColors: Story = {
	...Common,
	args: {
		fill: 17,
		fillBackground: 'error',
		background: 'gray3'
	}
};

export const CustomHeight: Story = {
	...Common,
	args: {
		fill: 100,
		height: '1.25rem'
	}
};
