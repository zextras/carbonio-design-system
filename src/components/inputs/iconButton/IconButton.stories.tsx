/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import { IconButton } from './IconButton';

const meta = {
	component: IconButton,
	parameters: {
		docs: {
			description: {
				component: '⚠️ **Deprecated** — use `Button` with just the icon instead'
			}
		}
	},
	args: {
		icon: 'EyeOutline',
		onClick: fn()
	}
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
