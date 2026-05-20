/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { PasswordInput } from './PasswordInput';
import { colorArgType } from '../../../docs/utils';

const meta = {
	component: PasswordInput,
	args: {
		label: 'Password'
	},
	argTypes: {
		textColor: colorArgType,
		borderColor: colorArgType,
		background: colorArgType,
		value: { control: 'text' },
		defaultValue: { control: 'text' }
	}
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
