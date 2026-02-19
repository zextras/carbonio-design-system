/*
 * SPDX-FileCopyrightText: 2025 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Radio } from './Radio';
import { RadioComplexLabel } from './Radio.stories.complexLabel';
import { RadioCustomLabel } from './Radio.stories.customLabel';
import { MultipleRadios } from './Radio.stories.multiple';
import { RadioPropsCombinator } from './Radio.stories.propsCombinator';

(Radio as React.FC).displayName = 'Radio';

const meta = {
	component: Radio,
	args: {
		onChange: fn(),
		value: 'value'
	},
	argTypes: {
		label: {
			control: 'text',
			description: 'Radio text'
		},
		value: {
			control: 'text',
			description: 'Value of the radio input'
		},
		checked: {
			control: 'boolean',
			description: 'Radio checked'
		},
		defaultChecked: {
			control: 'boolean',
			description: 'Status of the Radio'
		},
		disabled: {
			control: 'boolean',
			description: 'Whether to disable the radio or not'
		},
		onChange: {
			description: 'Change callback'
		},
		size: {
			control: 'select',
			options: ['small', 'medium'],
			description: 'Available sizes'
		},
		iconColor: {
			control: 'text',
			description: 'Icon color'
		},
		padding: {
			description: 'Radio padding'
		},
		inputRef: {
			description: 'Ref for the input element'
		}
	},
	parameters: {
		docs: {
			source: {
				type: 'dynamic',
				excludeDecorators: true
			}
		}
	}
} satisfies Meta<typeof Radio>;
export default meta;

type Story = StoryObj<typeof Radio>;

export const Default = {
	args: {
		label: 'Radio Label'
	}
} satisfies Story;

export const Checked = {
	args: {
		label: 'Selected Option',
		checked: true
	}
} satisfies Story;

export const Unchecked = {
	args: {
		label: 'Unselected Option',
		checked: false
	}
} satisfies Story;

export const Disabled = {
	args: {
		label: 'Disabled Radio',
		disabled: true
	}
} satisfies Story;

export const DisabledChecked = {
	args: {
		label: 'Disabled Selected Radio',
		checked: true,
		disabled: true
	}
} satisfies Story;

export const Sizes = {
	render: (): React.JSX.Element => (
		<div>
			<Radio label="Small Radio" size="small" value={'small'} />
			<Radio label="Medium Radio" size="medium" value={'medium'} />
		</div>
	)
} satisfies Story;

export const WithCustomColor = {
	args: {
		label: 'Custom Color Radio',
		checked: true,
		iconColor: 'primary'
	}
} satisfies Story;

export const WithCustomPadding = {
	args: {
		label: 'Custom Padding',
		padding: { all: 'large' }
	}
} satisfies Story;

export const ControlledMode = {
	render: MultipleRadios
} satisfies Story;

export const UncontrolledMode = {
	render: (): React.JSX.Element => (
		<div>
			<Radio label="Chicken" value="chicken" defaultChecked />
			<Radio label="Salad" value="salad" />
			<Radio label="Tomato" value="tomato" />
			<Radio label="Mayo" value="mayo" disabled />
		</div>
	)
} satisfies Story;

export const PropsCombinator = {
	render: RadioPropsCombinator
} satisfies Story;

export const CustomLabel = {
	render: RadioCustomLabel
} satisfies Story;

export const ComplexLabel = {
	render: RadioComplexLabel
} satisfies Story;
