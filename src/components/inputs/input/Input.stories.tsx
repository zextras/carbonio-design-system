/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { JSX, useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';
import { Icon } from '../../basic/icon/Icon';
import { Text } from '../../basic/text/Text';
import { Container } from '../../layout/Container';

const meta = {
	component: Input
} satisfies Meta<typeof Input>;
export default meta;

type Story = StoryObj<typeof Input>;

export const Default = {} satisfies Story;

export const Label = {
	args: {
		label: 'This is the Input label'
	}
};

export const Description = {
	args: {
		description: 'Optional short description'
	}
} satisfies Story;

export const AutoFocus = {
	args: {
		autoFocus: true
	}
} satisfies Story;

export const BorderColor = {
	args: { borderColor: 'warning' }
};

export const DefaultValue = {
	args: {
		defaultValue: 'This is the default value'
	}
};

export const Disabled = {
	args: {
		disabled: true
	}
};

export const TextColor = {
	args: { textColor: 'warning' }
};

export const CustomIcon = {
	args: {
		CustomIcon: ({ hasFocus }: { hasFocus: boolean }): JSX.Element => (
			<Icon icon="AgendaOutline" size="large" color={hasFocus ? 'primary' : 'text'} />
		)
	}
};

export const HasError = {
	args: {
		hasError: true,
		description: 'Custom description with error'
	}
};

export const Type = {
	args: { type: 'password' }
};

export const MixedInputs = {
	render: (): JSX.Element => {
		const [input3, setInput3] = useState('');
		const [input5, setInput5] = useState('');
		return (
			<Container gap="0.625rem">
				<Text>Flex-start alignment</Text>
				<Container
					gap="0.625rem"
					margin={{ left: 'auto', right: 'auto' }}
					orientation="horizontal"
					crossAlignment="flex-start"
				>
					<Input label="Input without description" />
					<Input
						label="Input with description"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
					/>
				</Container>
				<Text>Baseline alignment</Text>
				<Container
					gap="0.625rem"
					margin={{ left: 'auto', right: 'auto' }}
					orientation="horizontal"
					crossAlignment="baseline"
					minHeight="4.5rem"
				>
					<Input label="Input without description" />
					<Input
						label="Input with error on typing"
						value={input3}
						onChange={(e) => setInput3(e.currentTarget.value)}
						hasError={!!input3}
						description={input3 ? 'Dynamic error message' : undefined}
					/>
				</Container>
				<Text>Empty description to reserve space</Text>
				<Container gap="0.625rem" orientation="horizontal" crossAlignment="flex-start">
					<Input label="Input without description" />
					<Input
						label="Input with description on typing"
						value={input5}
						onChange={(e) => setInput5(e.currentTarget.value)}
						description={input5 ? 'Dynamic description' : ''}
					/>
				</Container>
			</Container>
		);
	}
};
