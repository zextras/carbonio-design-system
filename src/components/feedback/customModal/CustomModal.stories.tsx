/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { CustomModal } from './CustomModal';
import { CustomModalExample } from './CustomModal.stories.example';

const meta = {
	component: CustomModal
} satisfies Meta<typeof CustomModal>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Example = {
	render: CustomModalExample
} satisfies Story;
