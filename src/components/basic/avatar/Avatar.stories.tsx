/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Avatar } from './Avatar';
import { Container } from '../../layout/container/Container';
import { Row } from '../../layout/Row';

const meta = {
	component: Avatar,
	args: {
		label: 'Avatar'
	}
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Label = {
	render: (): React.JSX.Element => (
		<Container
			orientation={'horizontal'}
			mainAlignment={'flex-start'}
			crossAlignment={'flex-start'}
			gap={'0.5rem'}
		>
			<Avatar label={'Custom Label'} />
			<Avatar label={'Mario Rossi'} />
			<Avatar label={'Giacomo Verdi'} />
		</Container>
	)
} satisfies Story;

export const Size = {
	render: (): React.JSX.Element => (
		<Container
			orientation={'horizontal'}
			mainAlignment={'flex-start'}
			crossAlignment={'flex-start'}
			gap={'0.5rem'}
		>
			<Avatar label={'Custom Label'} size={'small'} />
			<Avatar label={'Mario Rossi'} />
			<Avatar label={'Sofia Bianchi'} size={'large'} />
			<Avatar label={'Giacomo Verdi'} size={'extralarge'} />
		</Container>
	)
} satisfies Story;

export const Picture = {
	render: (): React.JSX.Element => (
		<Container
			orientation={'horizontal'}
			mainAlignment={'flex-start'}
			crossAlignment={'flex-start'}
			gap={'0.5rem'}
		>
			<Avatar label={''} size={'small'} picture={'example.jpg'} />
			<Avatar label={''} picture={'example.jpg'} />
			<Avatar label={''} size={'large'} picture={'example.jpg'} />
			<Avatar label={''} size={'extralarge'} picture={'example.jpg'} />
		</Container>
	)
} satisfies Story;

export const ColorLabel = {
	render: (): React.JSX.Element => (
		<Container
			orientation={'horizontal'}
			mainAlignment={'flex-start'}
			crossAlignment={'flex-start'}
			gap={'0.5rem'}
		>
			<Avatar label={'Custom Label'} color={'primary'} />
			<Avatar label={'Mario Rossi'} color={'secondary'} />
			<Avatar label={'Giacomo Verdi'} color={'warning'} />
			<Avatar label={'Giacomo Verdi'} color={'error'} />
		</Container>
	)
} satisfies Story;

export const Icon = {
	render: (): React.JSX.Element => (
		<Container
			orientation={'horizontal'}
			mainAlignment={'flex-start'}
			crossAlignment={'flex-start'}
			gap={'0.5rem'}
		>
			<Avatar label={''} icon={'BulbOutline'} />
			<Avatar label={''} icon={'AttachOutline'} />
			<Avatar label={''} icon={'AgendaOutline'} />
		</Container>
	)
} satisfies Story;

export const FallbackIcon = {
	render: (): React.JSX.Element => (
		<Container
			orientation={'horizontal'}
			mainAlignment={'flex-start'}
			crossAlignment={'flex-start'}
			gap={'0.5rem'}
		>
			<Avatar label={'.'} fallbackIcon={'Activity'} />
			<Avatar label={'.'} fallbackIcon={'QuestionMarkCircleOutline'} />
			<Avatar label={'.'} fallbackIcon={'AddressBookOutline'} />
		</Container>
	)
} satisfies Story;

export const Background = {
	render: (): React.JSX.Element => (
		<Container
			orientation={'horizontal'}
			mainAlignment={'flex-start'}
			crossAlignment={'flex-start'}
			gap={'0.5rem'}
		>
			<Avatar size="large" label="Name Lastname" />
			<Avatar size="large" label="LongLastname" />
			<Avatar size="large" label="LongLastname" background="primary" />
			<Avatar size="large" label="LongLastname" background="secondary" />
			<Avatar size="large" label="BU" />
			<Avatar size="large" label="X" />
			<Avatar size="large" label="ALong NAme with $#@^#SPECIAL@$^$%&# %$&Characters#$%" />
			<Avatar size="large" label="$%$^" />
		</Container>
	)
} satisfies Story;

export const Color = {
	render: (): React.JSX.Element => (
		<Container
			orientation={'horizontal'}
			mainAlignment={'flex-start'}
			crossAlignment={'flex-start'}
			gap={'0.5rem'}
		>
			<Avatar size="large" label="Name Lastname" color={'info'} />
			<Avatar size="large" label="Name Lastname" color={'success'} />
			<Avatar size="large" label="Name Lastname" color={'error'} />
			<Avatar size="large" label="Name Lastname" color={'warning'} />
			<Avatar size="large" label="Name Lastname" color={'primary'} />
			<Avatar size="large" label="Name Lastname" color={'secondary'} />
			<Avatar size="large" label="Name Lastname" color={'highlight'} />
		</Container>
	)
} satisfies Story;

export const SelectingSelected = {
	render: (): React.JSX.Element => (
		<Row gap={'1rem'}>
			<Container
				orientation={'horizontal'}
				mainAlignment={'flex-start'}
				crossAlignment={'flex-start'}
				gap={'0.5rem'}
			>
				<Avatar size="small" label="Name Lastname" selecting selected={false} />
				<Avatar size="small" label="Name Lastname" selecting selected />
			</Container>
			<Container
				orientation={'horizontal'}
				mainAlignment={'flex-start'}
				crossAlignment={'flex-start'}
				gap={'0.5rem'}
			>
				<Avatar label="Name Lastname" selecting selected={false} />
				<Avatar label="Name Lastname" selecting selected />
			</Container>
			<Container
				orientation={'horizontal'}
				mainAlignment={'flex-start'}
				crossAlignment={'flex-start'}
				gap={'0.5rem'}
			>
				<Avatar size={'large'} label="Name Lastname" selecting selected={false} />
				<Avatar size={'large'} label="Name Lastname" selecting selected />
			</Container>
			<Container
				orientation={'horizontal'}
				mainAlignment={'flex-start'}
				crossAlignment={'flex-start'}
				gap={'0.5rem'}
			>
				<Avatar size={'extralarge'} label="Name Lastname" selecting selected={false} />
				<Avatar size={'extralarge'} label="Name Lastname" selecting selected />
			</Container>
		</Row>
	)
} satisfies Story;

export const Shape = {
	render: (): React.JSX.Element => (
		<Container
			orientation={'horizontal'}
			mainAlignment={'flex-start'}
			crossAlignment={'flex-start'}
			gap={'0.5rem'}
		>
			<Avatar size={'large'} label="Name Lastname" />
			<Avatar size={'large'} label="Name Lastname" shape={'square'} />
		</Container>
	)
} satisfies Story;

export const Disabled = {
	args: {
		disabled: true
	}
} satisfies Story;
