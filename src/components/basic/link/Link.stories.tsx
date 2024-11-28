/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { Link } from './Link';
import { colorArgType, sizeArgType, textAlignArgType, weightArgType } from '../../../docs/utils';
import { Container } from '../../layout/container/Container';

const meta = {
	component: Link,
	argTypes: {
		color: colorArgType,
		weight: weightArgType,
		size: sizeArgType,
		textAlign: textAlignArgType
	},
	args: {
		children: 'Link'
	}
} satisfies Meta<typeof Link>;
export default meta;

type Story = StoryObj<typeof Link>;

export const Default = {} satisfies Story;

export const Underlined = {
	args: {
		underlined: true
	}
} satisfies Story;

export const Href = {
	args: {
		href: 'https://zextras.com/'
	}
} satisfies Story;

export const Weight = {
	render: (): React.JSX.Element => (
		<Container crossAlignment={'flex-start'} gap={'0.5rem'}>
			<Link weight={'bold'}>bold</Link>
			<Link weight={'medium'}>medium</Link>
			<Link weight={'light'}>light</Link>
			<Link weight={'regular'}>regular</Link>
		</Container>
	)
} satisfies Story;

export const Size = {
	render: (): React.JSX.Element => (
		<Container crossAlignment={'flex-start'} gap={'0.5rem'}>
			<Link size={'extrasmall'}>extrasmall</Link>
			<Link size={'small'}>small</Link>
			<Link size={'medium'}>medium</Link>
			<Link size={'large'}>large</Link>
			<Link size={'extralarge'}>extralarge</Link>
		</Container>
	)
} satisfies Story;

export const Color = {
	render: (): React.JSX.Element => (
		<Container crossAlignment={'flex-start'} gap={'0.5rem'}>
			<Link color={'primary'}>primary</Link>
			<Link color={'secondary'}>secondary</Link>
			<Link color={'text'}>text</Link>
			<Link color={'error'}>error</Link>
			<Link color={'success'}>success</Link>
			<Link color={'warning'}>warning</Link>
		</Container>
	)
} satisfies Story;
