/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Catcher } from './Catcher';
import { CatcherDefault } from './Catcher.stories.default';

const meta = {
	component: Catcher
} satisfies Meta<typeof Catcher>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	render: CatcherDefault
} satisfies Story;
