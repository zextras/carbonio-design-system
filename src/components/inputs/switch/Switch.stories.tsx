/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import type { ArgTypes, Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import type { SwitchProps } from './Switch';
import { Switch } from './Switch';
import { SwitchControlled } from './Switch.stories.controlled';
import SwitchControlledSrc from './Switch.stories.controlled?raw';
import { SwitchPropsCombinator } from './Switch.stories.propsCombinator';
import SwitchPropsCombinatorSrc from './Switch.stories.propsCombinator?raw';
import { colorArgType } from '../../../docs/utils';

const size: SwitchProps['size'][] = ['medium', 'small'];

const sizeArgType: ArgTypes[string] = {
	control: {
		type: 'select'
	},
	options: size
};

const meta = {
	component: Switch,
	args: {
		onChange: fn()
	},
	argTypes: {
		size: sizeArgType,
		iconColor: colorArgType
	}
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const PropsCombinator = {
	render: SwitchPropsCombinator,
	parameters: { docs: { source: { code: SwitchPropsCombinatorSrc } } }
} satisfies Story;

export const Controlled = {
	render: SwitchControlled,
	parameters: { docs: { source: { code: SwitchControlledSrc } } }
};

export const Uncontrolled = {
	render: (): React.JSX.Element => (
		<>
			<Switch defaultChecked onChange={console.log} />
			<Switch defaultChecked={false} onChange={console.log} label="I have a label!" />
		</>
	)
};
