/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { TabBar } from './TabBar';
import type { TabBarProps } from './TabBar';
import { TabBarControlled } from './TabBar.stories.controlled';
import { TabBarCustomized } from './TabBar.stories.customized';
import { TabBarForceWithEquallyDistributed } from './TabBar.stories.forceWidthEquallyDistributed';
import { TabBarMixed } from './TabBar.stories.mixed';
import { colorArgType } from '../../../docs/utils';

const meta = {
	component: TabBar,
	args: {
		background: 'transparent',
		items: [
			{ id: 'all', label: 'All' },
			{ id: 'unread', label: 'Unread' },
			{ id: 'starred', label: 'Starred' }
		],
		selected: 'all',
		onChange: (): void => {}
	},
	argTypes: {
		underlineColor: colorArgType
	}
} satisfies Meta<typeof TabBar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	render(args: TabBarProps): React.JSX.Element {
		const [selected, setSelected] = useState(args.selected);
		return (
			<TabBar
				{...args}
				selected={selected}
				onChange={(_, selectedId): void => {
					setSelected(selectedId);
				}}
			/>
		);
	}
} satisfies Story;

export const ControlledPlain = {
	render: TabBarControlled
} satisfies Story;

export const ForceWidthEquallyDistributed = {
	render: TabBarForceWithEquallyDistributed
} satisfies Story;

export const Customized = {
	render: TabBarCustomized
} satisfies Story;

export const Mixed = {
	render: TabBarMixed
} satisfies Story;
