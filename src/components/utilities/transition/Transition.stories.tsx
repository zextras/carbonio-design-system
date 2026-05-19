/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Transition } from './Transition';
import { TransitionExample1 } from './Transition.stories.example1';
import { TransitionExample2 } from './Transition.stories.example2';
import { TransitionExample3 } from './Transition.stories.example3';

const meta = {
	component: Transition,
	args: {
		children: <></>
	}
} satisfies Meta<typeof Transition>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Example1 = {
	render: TransitionExample1
} satisfies Story;

export const Example2 = {
	render: TransitionExample2
} satisfies Story;

export const Example3 = {
	render: TransitionExample3
} satisfies Story;
