/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Drop } from './Drop';
import { DropDefault } from './Drop.stories.default';

const meta = {
	component: Drop,
	args: {
		overlayAcceptComponent: <></>,
		overlayDenyComponent: <></>,
		children: <></>
	}
} satisfies Meta<typeof Drop>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	render: DropDefault
} satisfies Story;
