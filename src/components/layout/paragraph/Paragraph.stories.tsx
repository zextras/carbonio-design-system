/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { Meta, StoryObj } from '@storybook/react';

import { Paragraph } from '../Paragraph';

const meta = {
	component: Paragraph,
	args: {
		children:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pretium venenatis justo, et pellentesque turpis mollis non.' +
			'Mauris quis sollicitudin lectus. Sed feugiat ante ultrices mattis gravida. Suspendisse pellentesque, ex eu viverra finibus, nisl felis fringilla ' +
			'lectus, id dapibus turpis tellus quis velit. Cras rhoncus ultricies tempus. Fusce interdum diam eget nunc iaculis, ac blandit mauris accumsan.' +
			' Morbi erat nisi, lobortis ut ultricies id, vulputate id elit. Morbi id dignissim ante. Duis auctor gravida fermentum. ' +
			'Nam dolor metus, congue sed porttitor ut, placerat vitae arcu. Maecenas ac risus sit amet sem tristique elementum in quis eros. ' +
			'Donec et nulla lacinia, ultricies magna non, imperdiet ipsum. '
	}
} satisfies Meta<typeof Paragraph>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
