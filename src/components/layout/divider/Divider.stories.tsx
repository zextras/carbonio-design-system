/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { Meta, StoryObj } from '@storybook/react';

import { Divider } from './Divider';
import { colorArgType } from '../../../docs/utils';

const meta = {
	component: Divider
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

const Common: Partial<Story> = {
	argTypes: {
		color: colorArgType
	}
};

export const Default: Story = {
	...Common
};

export const UsingPrimaryColor: Story = {
	...Common,
	args: {
		color: 'primary'
	}
};

export const UsingHexColor: Story = {
	...Common,
	args: {
		color: '#32a852'
	}
};

export const UsingErrorColor: Story = {
	...Common,
	args: {
		color: 'error'
	}
};
