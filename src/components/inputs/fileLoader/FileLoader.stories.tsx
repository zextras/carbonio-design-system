/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { Meta, StoryObj } from '@storybook/react';

import { FileLoader } from '../FileLoader';

const meta = {
	component: FileLoader
} satisfies Meta<typeof FileLoader>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
