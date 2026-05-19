/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { SnackbarManager } from './SnackbarManager';
import { App } from './SnackbarManager.stories.example';

const meta = {
	component: SnackbarManager
} satisfies Meta<typeof SnackbarManager>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Example = {
	render: App
} satisfies Story;
