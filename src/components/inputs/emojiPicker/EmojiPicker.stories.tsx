/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import { EmojiPicker } from './EmojiPicker';

const meta = {
	component: EmojiPicker,
	args: {
		onEmojiSelect: fn()
	},
	parameters: {
		// the picker renders asynchronously, with the emoji font of the system
		visualTest: {
			skip: true
		}
	}
} satisfies Meta<typeof EmojiPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

// no locale: emoji-mart would use it also in the other stories
export const WithOptions = {
	args: {
		theme: 'dark',
		perLine: 8,
		previewPosition: 'none',
		navPosition: 'bottom',
		skinTonePosition: 'search'
	}
} satisfies Story;
