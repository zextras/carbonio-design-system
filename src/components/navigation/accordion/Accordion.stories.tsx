/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { Meta, StoryObj } from '@storybook/react';

import { Accordion } from '../Accordion';

const meta = {
	component: Accordion,
	args: {
		items: [
			{ id: 'i1', label: 'item 1' },
			{ id: 'i2', label: 'item 2' },
			{ id: 'd1', divider: true },
			{
				id: 'i3',
				label: 'item 3',
				items: [
					{ id: 'i3-1', label: 'item 3-1' },
					{ id: 'i3-2', label: 'item 3-2' }
				]
			}
		]
	}
} satisfies Meta<typeof Accordion>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
