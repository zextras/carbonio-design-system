/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Meta, StoryObj } from '@storybook/react';

import { FormSection } from './FormSection';
import { Basic } from './FormSection.stories.basic';

const meta = {
	component: FormSection
} satisfies Meta<typeof FormSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
	args: {
		label: 'FormSection'
	},
	render: Basic
} satisfies Story;
