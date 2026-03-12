/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Padding } from './Padding';

const meta = {
	component: Padding
} satisfies Meta<typeof Padding>;

export default meta;
type Story = StoryObj<typeof Padding>;

export const VerticalPadding = {
	render: (): React.JSX.Element => (
		<div style={{ border: '0.0625rem solid black' }}>
			<Padding vertical="small">
				<div style={{ backgroundColor: 'grey', height: '0.625rem', width: '0.625rem' }} />
			</Padding>
		</div>
	)
} satisfies Story;

export const HorizontalPadding = {
	render: (): React.JSX.Element => (
		<div style={{ border: '0.0625rem solid black' }}>
			<Padding horizontal="small">
				<div style={{ backgroundColor: 'grey', height: '0.625rem', width: '0.625rem' }} />
			</Padding>
		</div>
	)
};

export const SelectivePadding = {
	render: (): React.JSX.Element => (
		<div style={{ border: '0.0625rem solid black' }}>
			<Padding top="extrasmall" right="small" bottom="small" left="extrasmall">
				<div style={{ backgroundColor: 'grey', height: '0.625rem', width: '0.625rem' }} />
			</Padding>
		</div>
	)
};

export const PaddingThroughValue = {
	render: (): React.JSX.Element => (
		<div style={{ border: '0.0625rem solid black' }}>
			<Padding value="0.625rem small extralarge">
				<div style={{ backgroundColor: 'grey', height: '0.625rem', width: '0.625rem' }} />
			</Padding>
		</div>
	)
};
