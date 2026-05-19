/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Portal } from './Portal';
import { PortalBasic } from './Portal.stories.basic';

const meta = {
	component: Portal,
	args: {
		children: <></>
	}
} satisfies Meta<typeof Portal>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {
	render: PortalBasic
} satisfies Story;
