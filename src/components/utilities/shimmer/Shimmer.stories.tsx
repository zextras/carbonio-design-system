/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { Meta, StoryObj } from '@storybook/react';

import { Shimmer } from './Shimmer';

const meta = { component: Shimmer } satisfies Meta<typeof Shimmer>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
