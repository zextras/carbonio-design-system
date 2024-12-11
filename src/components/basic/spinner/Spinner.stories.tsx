/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from './Spinner';
import { colorArgType } from '../../../docs/utils';

const meta = {
	component: Spinner,
	argTypes: {
		color: colorArgType
	}
} satisfies Meta<typeof Spinner>;
export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default = {
	args: {
		color: 'primary'
	}
} satisfies Story;
