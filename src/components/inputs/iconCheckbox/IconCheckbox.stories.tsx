/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/internal/test';

import { IconCheckbox } from './IconCheckbox';
import { Container } from '../../layout/container/Container';

const meta = {
	component: IconCheckbox,
	args: {
		icon: 'Activity',
		onChange: fn()
	}
} satisfies Meta<typeof IconCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const DefaultChecked = {
	args: {
		defaultChecked: true
	}
} satisfies Story;

export const Label = {
	args: {
		label: 'Custom label'
	}
} satisfies Story;

export const BorderRadius = {
	render: (): React.JSX.Element => (
		<Container
			mainAlignment={'flex-start'}
			crossAlignment={'flex-start'}
			gap={'0.5rem'}
			orientation={'horizontal'}
		>
			<IconCheckbox borderRadius="round" icon="Activity" onChange={fn()} defaultChecked />
			<IconCheckbox borderRadius="regular" icon="Activity" onChange={fn()} defaultChecked />
		</Container>
	)
} satisfies Story;

export const Disabled = {
	args: {
		disabled: true
	}
} satisfies Story;

export const Icon = {
	render: (): React.JSX.Element => (
		<Container
			mainAlignment={'flex-start'}
			crossAlignment={'flex-start'}
			gap={'0.5rem'}
			orientation={'horizontal'}
		>
			<IconCheckbox icon="AcceptanceMeeting" onChange={fn()} defaultChecked />
			<IconCheckbox icon="AppointmentOutline" onChange={fn()} defaultChecked />
			<IconCheckbox icon="Archive" onChange={fn()} defaultChecked />
			<IconCheckbox icon="Attach" onChange={fn()} defaultChecked />
		</Container>
	)
} satisfies Story;

export const Size = {
	render: (): React.JSX.Element => (
		<Container
			mainAlignment={'flex-start'}
			crossAlignment={'flex-start'}
			gap={'0.5rem'}
			orientation={'horizontal'}
		>
			<IconCheckbox icon="Activity" onChange={fn()} defaultChecked size={'small'} />
			<IconCheckbox icon="Activity" onChange={fn()} defaultChecked />
			<IconCheckbox icon="Activity" onChange={fn()} defaultChecked size={'large'} />
		</Container>
	)
} satisfies Story;

export const Value = {
	args: {
		value: true
	}
};
