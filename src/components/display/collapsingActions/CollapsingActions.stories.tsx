/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { CollapsingActions } from '../CollapsingActions';

const meta = {
	component: CollapsingActions,
	args: {
		actions: [
			{ id: 'a1', label: 'Action 1', onClick: fn(), icon: 'PlayCircle' },
			{ id: 'a2', label: 'Action 2', onClick: fn(), icon: 'PauseCircle' },
			{ id: 'a3', label: 'Action 3', onClick: fn(), icon: 'StopCircle' },
			{ id: 'a4', label: 'Action 4', onClick: fn(), icon: 'ArrowCircleLeft' },
			{ id: 'a5', label: 'Action 5', onClick: fn(), icon: 'ArrowCircleRight' }
		]
	}
} satisfies Meta<typeof CollapsingActions>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
