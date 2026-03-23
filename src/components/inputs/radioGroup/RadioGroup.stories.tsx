/*
 * SPDX-FileCopyrightText: 2025 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { RadioGroup } from './RadioGroup';
import { ControlledRadioGroup } from './RadioGroup.stories.controlledMode';
import ControlledRadioGroupSrc from './RadioGroup.stories.controlledMode?raw';
import { DisabledRadioGroup } from './RadioGroup.stories.disabled';
import DisabledRadioGroupSrc from './RadioGroup.stories.disabled?raw';
import { UncontrolledRadioGroup } from './RadioGroup.stories.uncontrolledMode';
import UncontrolledRadioGroupSrc from './RadioGroup.stories.uncontrolledMode?raw';
import { Radio } from '../radio/Radio';

const meta = {
	component: RadioGroup,
	subcomponents: {
		Radio
	}
} satisfies Meta<typeof RadioGroup>;

export default meta;

export const ControlledMode = {
	render: ControlledRadioGroup,
	parameters: {
		docs: {
			source: {
				code: ControlledRadioGroupSrc
			}
		}
	}
} satisfies StoryObj<typeof ControlledRadioGroup>;

export const UncontrolledMode = {
	render: UncontrolledRadioGroup,
	parameters: {
		docs: {
			source: {
				code: UncontrolledRadioGroupSrc
			}
		}
	}
} satisfies StoryObj<typeof UncontrolledRadioGroup>;

export const DisabledGroup = {
	render: DisabledRadioGroup,
	parameters: {
		docs: {
			source: {
				code: DisabledRadioGroupSrc
			}
		}
	}
} satisfies StoryObj<typeof DisabledRadioGroup>;
