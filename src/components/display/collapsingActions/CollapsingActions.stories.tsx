/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import { CollapsingActions } from './CollapsingActions';
import { CollapsingActionsAlignment } from './CollapsingActions.alignment';
import CollapsingActionsAlignmentSrc from './CollapsingActions.alignment?raw';
import { CollapsingActionsColor } from './CollapsingActions.color';
import CollapsingActionsColorSrc from './CollapsingActions.color?raw';
import { CollapsingActionsGap } from './CollapsingActions.gap';
import CollapsingActionsGapSrc from './CollapsingActions.gap?raw';
import { CollapsingActionsMaxVisible } from './CollapsingActions.maxVisible';
import CollapsingActionsMaxVisibleSrc from './CollapsingActions.maxVisible?raw';
import { CollapsingActionsSize } from './CollapsingActions.size';
import CollapsingActionsSizeSrc from './CollapsingActions.size?raw';
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
