/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { ModalManager } from './ModalManager';
import { App } from './ModalManager.stories.example';

const meta = {
	component: ModalManager
} satisfies Meta<typeof ModalManager>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Example = {
	render: App
} satisfies Story;
