/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { Shimmer } from './Shimmer';

const meta = {
	component: Shimmer.FormSection
} satisfies Meta<typeof Shimmer.FormSection>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		variant: ''
	}
} satisfies Story;

export const WithSubSections = {
	args: {
		...Default.args,
		children: Array(5)
			.fill(undefined)
			.map((_, i) => <Shimmer.FormSubSection variant={''} key={i} />)
	}
} satisfies Story;
