/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Collapse } from './Collapse';
import { CollapseBasic } from './Collapse.stories.basic';

const meta = {
	component: Collapse,
	args: {
		open: true,
		children: <div>Collapse content</div>
	}
} satisfies Meta<typeof Collapse>;

export default meta;

export type Story = StoryObj<typeof meta>;

export const Basic = {
	render: CollapseBasic
} satisfies Story;
