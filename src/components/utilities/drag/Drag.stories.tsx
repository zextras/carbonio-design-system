/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Drag } from './Drag';
import { Button } from '../../basic/button/Button';

const meta = {
	component: Drag
} satisfies Meta<typeof Drag>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		type: 'message',
		data: { id: 1 },
		children: <Button onClick={() => {}} label="Drag Me" />
	}
} satisfies Story;
