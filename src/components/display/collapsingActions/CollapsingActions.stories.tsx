/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import { CollapsingActions } from './CollapsingActions';
import { CollapsingActionsAlignment } from './CollapsingActions.stories.alignment';
import CollapsingActionsAlignmentSrc from './CollapsingActions.stories.alignment?raw';
import { CollapsingActionsColor } from './CollapsingActions.stories.color';
import CollapsingActionsColorSrc from './CollapsingActions.stories.color?raw';
import { CollapsingActionsGap } from './CollapsingActions.stories.gap';
import CollapsingActionsGapSrc from './CollapsingActions.stories.gap?raw';
import { CollapsingActionsMaxVisible } from './CollapsingActions.stories.maxVisible';
import CollapsingActionsMaxVisibleSrc from './CollapsingActions.stories.maxVisible?raw';
import { CollapsingActionsSize } from './CollapsingActions.stories.size';
import CollapsingActionsSizeSrc from './CollapsingActions.stories.size?raw';
import { colorArgType } from '../../../docs/utils';

const meta = {
	component: CollapsingActions,
	argTypes: {
		size: {
			control: 'select',
			options: ['extrasmall', 'small', 'medium', 'large', 'extralarge']
		},
		color: colorArgType
	},
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

export const Alignment = {
	render: CollapsingActionsAlignment,
	parameters: { docs: { source: { code: CollapsingActionsAlignmentSrc } } }
} satisfies Story;

export const MaxVisible = {
	render: CollapsingActionsMaxVisible,
	parameters: { docs: { source: { code: CollapsingActionsMaxVisibleSrc } } }
} satisfies Story;

export const Size = {
	render: CollapsingActionsSize,
	parameters: { docs: { source: { code: CollapsingActionsSizeSrc } } }
} satisfies Story;

export const Color = {
	render: CollapsingActionsColor,
	parameters: { docs: { source: { code: CollapsingActionsColorSrc } } }
} satisfies Story;

export const Gap = {
	render: CollapsingActionsGap,
	parameters: { docs: { source: { code: CollapsingActionsGapSrc } } }
} satisfies Story;
