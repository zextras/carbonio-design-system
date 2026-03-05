/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Slider } from './Slider';
import { ControlledSlider } from './Slider.stories.controlledMode';
import ControlledSliderSrc from './Slider.stories.controlledMode?raw';
import { UncontrolledSlider } from './Slider.stories.uncontrolledMode';
import UncontrolledSliderSrc from './Slider.stories.uncontrolledMode?raw';

const meta = {
	component: Slider
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default = {
	args: {
		options: ['1', '2', '3', '4', '5', '6', '7', '8']
	}
} satisfies Story;

export const ControlledMode = {
	render: ControlledSlider,
	parameters: {
		docs: {
			source: {
				code: ControlledSliderSrc
			}
		}
	}
} satisfies StoryObj<typeof ControlledSlider>;

export const UncontrolledMode = {
	render: UncontrolledSlider,
	parameters: {
		docs: {
			source: {
				code: UncontrolledSliderSrc
			}
		}
	}
} satisfies StoryObj<typeof UncontrolledSlider>;
