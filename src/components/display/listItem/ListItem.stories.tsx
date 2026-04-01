/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { ListItem } from './ListItem';

const meta = {
	component: ListItem,
	args: {
		children: (): React.JSX.Element => <></>
	},
	tags: ['!dev']
} satisfies Meta<typeof ListItem>;

export default meta;

export type Story = StoryObj<typeof meta>;

export const Basic = {};
