/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { Meta, StoryObj } from '@storybook/react';

import { Chip } from '../Chip';

const meta = {
	component: Chip
} satisfies Meta<typeof Chip>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
