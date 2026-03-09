/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import { Checkbox } from './Checkbox';
import { CheckboxControlled } from './Checkbox.stories.controlled';
import { CheckboxPropsCombinator } from './Checkbox.stories.propsCombinator';
import { CheckboxUncontrolled } from './Checkbox.stories.uncontrolled';
import { Container } from '../../layout/container/Container';

const meta = {
	component: Checkbox,
	args: {
		onChange: fn()
	}
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const DefaultChecked = {
	args: {
		defaultChecked: true
	}
} satisfies Story;

export const Value = {
	args: {
		value: true
	}
} satisfies Story;

export const Size = {
	render: (): React.JSX.Element => (
		<Container orientation="horizontal" mainAlignment={'flex-start'} crossAlignment={'flex-start'}>
			<Checkbox size="small" />
			<Checkbox size="medium" />
		</Container>
	)
} satisfies Story;

export const IconColor = {
	render: (): React.JSX.Element => (
		<Container
			orientation="horizontal"
			mainAlignment={'flex-start'}
			crossAlignment={'flex-start'}
			gap={'0.5rem'}
		>
			<Checkbox iconColor="primary" />
			<Checkbox iconColor="secondary" />
			<Checkbox iconColor="success" />
			<Checkbox iconColor="warning" />
			<Checkbox iconColor="error" />
		</Container>
	)
} satisfies Story;

export const Label = {
	render: (): React.JSX.Element => (
		<Container orientation="vertical" mainAlignment={'flex-start'} crossAlignment={'flex-start'}>
			<Checkbox label="Label 1" />
			<Checkbox label="Label 2" />
			<Checkbox label="Label 3" />
			<Checkbox label="Label 4" />
			<Checkbox label="Label 5" />
		</Container>
	)
} satisfies Story;

export const Disabled = {
	render: (): React.JSX.Element => (
		<Container orientation="vertical" mainAlignment={'flex-start'} crossAlignment={'flex-start'}>
			<Checkbox label="Disabled" disabled />
			<Checkbox label="Disabled Checked" defaultChecked disabled />
		</Container>
	)
} satisfies Story;

export const PropsCombinator = {
	render: CheckboxPropsCombinator
} satisfies Story;

export const Controlled = {
	render: CheckboxControlled
} satisfies Story;

export const Uncontrolled = {
	render: CheckboxUncontrolled
} satisfies Story;
