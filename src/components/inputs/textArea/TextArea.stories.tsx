/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Meta, StoryObj } from '@storybook/react';

import { TextArea } from './TextArea';
import { ControlledTextArea } from './TextArea.stories.controlledMode';
import { UncontrolledTextArea } from './TextArea.stories.uncontrolledMode';
import { colorArgType } from '../../../docs/utils';

const meta = {
	component: TextArea,
	argTypes: {
		backgroundColor: colorArgType,
		textColor: colorArgType
	}
} satisfies Meta<typeof TextArea>;
export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default = {} satisfies Story;

export const Label = {
	args: {
		label: 'This is the Input label'
	}
} satisfies Story;

export const Description = {
	args: {
		description: 'Optional short description'
	}
} satisfies Story;

export const HasError = {
	args: {
		hasError: true,
		description: 'Custom description with error'
	}
} satisfies Story;

export const BackgroundColor = {
	args: {
		backgroundColor: 'primary'
	}
} satisfies Story;

export const TextColor = {
	args: {
		textColor: 'error'
	}
} satisfies Story;

export const BorderColor = {
	args: {
		borderColor: 'warning'
	}
} satisfies Story;

export const UncontrolledMode = {
	render: UncontrolledTextArea
} satisfies StoryObj<typeof UncontrolledTextArea>;

export const ControlledMode = {
	render: ControlledTextArea
} satisfies StoryObj<typeof ControlledTextArea>;
