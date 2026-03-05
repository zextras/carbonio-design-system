/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import { Select, type SelectItem, type SelectProps } from './Select';
import { SelectControlledMode } from './Select.stories.controlledMode';
import { SelectMultipleSelection } from './Select.stories.multipleSelection';
import { colorArgType } from '../../../docs/utils';
import { Icon } from '../../basic/icon/Icon';
import { Text } from '../../basic/text/Text';
import { Container } from '../../layout/container/Container';
import { Row } from '../../layout/Row';

const defaultItems: SelectItem[] = [
	{ label: 'Hi', value: '1' },
	{ label: 'Hello', value: '2' },
	{ label: 'Good day', value: '3' },
	{ label: 'Goodnight', value: '4' },
	{ label: 'Disabled option', value: '5', disabled: true },
	{
		label: 'Custom component',
		value: '6',
		customComponent: (
			<Container width="fit" mainAlignment="flex-start" orientation="horizontal">
				<Icon icon="People" color="primary" />
				<Text weight="bold">Special Greeting</Text>
			</Container>
		)
	}
];

const CustomLabelFactory = ({
	label,
	open,
	focus
}: {
	label: string | undefined;
	open: boolean;
	focus: boolean;
}): React.JSX.Element => (
	<Container
		orientation="horizontal"
		width="fill"
		crossAlignment="center"
		mainAlignment="space-between"
		borderRadius="half"
		padding={{ vertical: 'small' }}
	>
		<Row takeAvailableSpace mainAlignment="unset">
			<Text size="medium" color={open || focus ? 'primary' : 'secondary'}>
				{label}
			</Text>
		</Row>
		<Icon
			size="large"
			icon={open ? 'ChevronUpOutline' : 'ChevronDownOutline'}
			color={open || focus ? 'primary' : 'secondary'}
			style={{ alignSelf: 'center' }}
		/>
	</Container>
);

(Select as React.FC).displayName = 'Select';

const meta = {
	component: Select,
	args: {
		onChange: fn(),
		label: 'Select an item',
		items: defaultItems
	},
	argTypes: {
		background: colorArgType
	}
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<SelectProps<string>>;

export const Base = {
	args: {
		label: 'Select an item',
		items: defaultItems
	}
} satisfies Story;

export const WithDefaultSelection = {
	args: {
		label: 'Select an item',
		items: defaultItems,
		defaultSelection: defaultItems[3]
	}
} satisfies Story;

export const Disabled = {
	args: {
		label: 'Select an item',
		items: defaultItems,
		disabled: true,
		defaultSelection: defaultItems[1]
	}
} satisfies Story;

export const HideCheckbox = {
	args: {
		label: 'Select an item',
		items: defaultItems,
		showCheckbox: false,
		defaultSelection: defaultItems[2]
	}
} satisfies Story;

export const ControlledMode = {
	render: SelectControlledMode
};

export const MultipleSelection = {
	render: SelectMultipleSelection
};

export const CustomTrigger = {
	args: {
		label: 'Type',
		items: defaultItems.slice(0, 4),
		multiple: true,
		LabelFactory: CustomLabelFactory
	}
} satisfies Story;

export const DropdownSizing = {
	args: {
		label: 'Select with custom dropdown size',
		items: defaultItems,
		dropdownWidth: '300px',
		dropdownMaxHeight: '150px'
	}
} satisfies Story;
