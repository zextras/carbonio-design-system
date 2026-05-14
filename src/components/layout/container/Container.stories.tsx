/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Container } from './Container';
import { colorArgType } from '../../../docs/utils';

const children = (
	<>
		<div style={{ background: 'lightblue', width: '1.5rem', height: '1.5rem' }} />
		<div style={{ background: 'deepskyblue', width: '1.5rem', height: '1.5rem' }} />
		<div style={{ background: 'darkblue', width: '1.5rem', height: '1.5rem' }} />
		<div style={{ background: 'blue', width: '1.5rem', height: '1.5rem' }} />
	</>
);

const meta = {
	component: Container,
	args: {
		borderColor: 'red',
		minHeight: '1.5rem'
	},
	argTypes: {
		background: colorArgType,
		borderColor: colorArgType
	}
} satisfies Meta<typeof Container>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const VerticalOrientation = {
	args: {
		orientation: 'vertical',
		children
	}
} satisfies Story;

export const HorizontalOrientation = {
	args: {
		orientation: 'horizontal',
		children
	}
} satisfies Story;

export const Width = {
	args: {
		width: 'fit',
		children
	}
} satisfies Story;

export const Height = {
	args: {
		height: '400px',
		children
	}
} satisfies Story;

export const Background = {
	args: {
		background: 'primary',
		children
	}
} satisfies Story;

export const BorderRadius = {
	render: (): React.JSX.Element => (
		<Container gap={'0.5rem'}>
			<Container height={100} width={100} borderColor={'red'} borderRadius={'regular'} />
			<Container height={100} width={100} borderColor={'red'} borderRadius={'half'} />
			<Container height={100} width={100} borderColor={'red'} borderRadius={'round'} />
		</Container>
	)
} satisfies Story;

export const Alignment = {
	render: (): React.JSX.Element => (
		<Container gap={'0.5rem'}>
			<Container
				orientation={'horizontal'}
				borderColor={'red'}
				mainAlignment={'center'}
				crossAlignment={'center'}
				height={'50px'}
			>
				{children}
			</Container>
			<Container
				orientation={'horizontal'}
				borderColor={'red'}
				height={'50px'}
				mainAlignment={'flex-start'}
				crossAlignment={'flex-start'}
			>
				{children}
			</Container>
			<Container
				orientation={'horizontal'}
				borderColor={'red'}
				height={'50px'}
				mainAlignment={'flex-end'}
				crossAlignment={'flex-end'}
			>
				{children}
			</Container>
			<Container
				orientation={'horizontal'}
				borderColor={'red'}
				height={'50px'}
				mainAlignment={'space-between'}
				crossAlignment={'baseline'}
			>
				{children}
			</Container>
			<Container
				orientation={'horizontal'}
				borderColor={'red'}
				height={'50px'}
				mainAlignment={'space-evenly'}
				crossAlignment={'normal'}
			>
				{children}
			</Container>
		</Container>
	)
} satisfies Story;

export const Padding = {
	render: (): React.JSX.Element => (
		<Container gap={'0.5rem'}>
			<Container
				orientation={'horizontal'}
				borderColor={'red'}
				width={'auto'}
				padding={{ all: 'small' }}
			>
				{children}
			</Container>
			<Container
				orientation={'horizontal'}
				borderColor={'red'}
				width={'auto'}
				padding={{ vertical: 'small', horizontal: 'large' }}
			>
				{children}
			</Container>
			<Container
				orientation={'horizontal'}
				borderColor={'red'}
				width={'auto'}
				padding={{ left: 'extrasmall', right: 'large' }}
			>
				{children}
			</Container>
			<Container
				orientation={'horizontal'}
				borderColor={'red'}
				width={'auto'}
				padding={'0.25rem 1rem'}
			>
				{children}
			</Container>
		</Container>
	)
} satisfies Story;
