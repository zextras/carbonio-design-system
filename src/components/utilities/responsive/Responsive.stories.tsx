/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Responsive } from './Responsive';
import { ResponsiveExample } from './Responsive.stories.example';

const meta = {
	component: Responsive,
	args: {
		mode: 'desktop',
		children: <></>
	}
} satisfies Meta<typeof Responsive>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {
	render: ResponsiveExample
} satisfies Story;
