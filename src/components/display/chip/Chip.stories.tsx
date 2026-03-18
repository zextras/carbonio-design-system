/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Chip } from './Chip';
import { placementArgType } from '../../../docs/utils';
import { Text } from '../../basic/text/Text';
import { Container } from '../../layout/container/Container';
import { Row } from '../../layout/Row';
import { Tooltip } from '../tooltip/Tooltip';

const meta = {
	component: Chip,
	argTypes: {
		tooltipPlacement: placementArgType
	}
} satisfies Meta<typeof Chip>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const SimpleChips = {
	render: (): React.JSX.Element => (
		<Container
			orientation="horizontal"
			wrap="wrap"
			mainAlignment="flex-start"
			maxWidth="44rem"
			style={{ gap: '0.5rem' }}
		>
			<Chip label="Walter White" onClose={() => console.log('closed')} />
			<Chip label="Jessy Pinkman" error onClose={() => console.log('closed')} />
			<Chip label="Tuco" color="primary" />
			<Chip label="Marie Schrader" hasAvatar={false} />
			<Chip label="Hank Schrader" background="info" color="gray6" />
			<Chip
				label="Saul Goodman"
				background="primary"
				color="gray6"
				hasAvatar={false}
				onClose={() => console.log('closed')}
			/>
			<Chip
				label="Mike Ehrmantraut"
				background="error"
				color="gray6"
				onClose={() => console.log('closed')}
			/>
			<Chip label="Walter Hartwell White Jr." hasAvatar={false} background="warning" color="text" />
			<Chip
				label="Gus Fring"
				avatarPicture="https://static.wikia.nocookie.net/breakingbad/images/b/be/Season_4_-_Gus.jpg"
				background="success"
				color="text"
			/>
			<Chip label="Jane Margolis" color="white" />
		</Container>
	)
} satisfies Story;

export const ErrorAndDisabledStatuses = {
	render: (): React.JSX.Element => (
		<Container
			orientation="horizontal"
			wrap="wrap"
			mainAlignment="flex-start"
			maxWidth="44rem"
			style={{ gap: '0.5rem' }}
		>
			<Chip label="Frodo Baggins" onClose={() => console.log('closed')} avatarIcon="Eye" disabled />
			<Chip label="Samwise (Sam) Gamgee" onClose={() => console.log('closed')} error />
			<Chip label="Gandalf the Grey" disabled="Message to tell user why this chip is disabled" />
			<Chip
				label="Legolas"
				avatarIcon="DiagonalArrowRightUp"
				error="Message to tell user why this chip is in error"
			/>
		</Container>
	)
} satisfies Story;

export const WithTooltip = {
	render: (): React.JSX.Element => (
		<Container
			orientation="horizontal"
			wrap="wrap"
			mainAlignment="flex-start"
			maxWidth="44rem"
			style={{ gap: '0.5rem' }}
		>
			<Chip
				label="Harry James Potter"
				maxWidth="13.125rem"
				onClose={console.log}
				tooltipPlacement="top"
			/>
			<Chip
				label="Hermione Jean Granger"
				maxWidth="13.125rem"
				onClose={console.log}
				tooltipPlacement="bottom"
			/>
			<Chip
				label="Ronald Bilius Weasley"
				maxWidth="13.125rem"
				onClose={console.log}
				tooltipPlacement="right"
			/>
			<Chip
				label="Albus Percival Wulfric Brian Dumbledore"
				onClose={console.log}
				maxWidth="13.125rem"
				tooltipPlacement="left"
			/>
		</Container>
	)
} satisfies Story;

const ShapeAndSize = {
	render: (): React.JSX.Element => (
		<Container
			wrap="wrap"
			mainAlignment="flex-start"
			crossAlignment="flex-start"
			maxWidth="44rem"
			style={{ gap: '0.5rem' }}
		>
			<Text size="large" weight="bold">
				Small
			</Text>
			<Row style={{ gap: '0.5rem' }}>
				<Chip label="SpongeBob SquarePants" shape="regular" onClose={() => {}} size="small" />
				<Chip label="Patrick Star" shape="round" onClose={() => {}} size="small" />
			</Row>
			<Text size="large" weight="bold">
				Medium
			</Text>
			<Row style={{ gap: '0.5rem' }}>
				<Chip label="Squidward Tentacles" shape="regular" onClose={() => {}} size="medium" />
				<Chip label="Mr. Krabs" shape="round" onClose={() => {}} size="medium" />
			</Row>
			<Text size="large" weight="bold">
				Large
			</Text>
			<Row style={{ gap: '0.5rem' }}>
				<Chip label="Plankton and Karen" shape="regular" onClose={() => {}} size="large" />
				<Chip label="Sandy Cheeks" shape="round" onClose={() => {}} size="large" />
			</Row>
		</Container>
	)
} satisfies Story;

export const AvatarCustomization = {
	render: (): React.JSX.Element => (
		<Container
			orientation="horizontal"
			wrap="wrap"
			mainAlignment="flex-start"
			maxWidth="44rem"
			style={{ gap: '0.5rem' }}
		>
			<Chip label="Anakin Skywalker" avatarPicture="example.jpg" shape="regular" />
			<Chip label="Han Solo" avatarIcon="StarOutline" shape="regular" />
			<Chip
				label="Luke Skywalker"
				avatarIcon="StarOutline"
				avatarColor="primary"
				avatarBackground="gray6"
			/>
			<Chip label="Princess Leia" avatarIcon="Star" avatarColor="yellow" avatarBackground="black" />
			<Chip
				label="Chewbacca"
				avatarLabel="Star Wars"
				avatarColor="rgb(255, 232, 31)"
				avatarBackground="#000000"
			/>
		</Container>
	)
} satisfies Story;

export const LabelCustomization = {
	render: (): React.JSX.Element => (
		<Container
			orientation="horizontal"
			wrap="wrap"
			mainAlignment="flex-start"
			maxWidth="44rem"
			style={{ gap: '0.5rem' }}
		>
			<Chip keyLabel="The Mandalorian:" label="Kuiil" shape="regular" maxWidth="23.125rem" />
			<Chip
				keyLabel="The Mandalorian:"
				label="Greef Karga (Leader of the Bounty Hunters' Guild)"
				shape="regular"
				maxWidth="23.125rem"
			/>
			<Chip
				keyLabel="The Mandalorian:"
				label={
					<Tooltip
						label="Din Djarin (Mandalorians Bounty Hunter's Guild Children of the Watch)"
						maxWidth="unset"
					>
						<Row wrap="nowrap" minWidth={0}>
							<Text overflow="break-word" size="extrasmall">
								Din Djarin&nbsp;
							</Text>
							<Text color="secondary" size="extrasmall">
								Mandalorians Bounty Hunter&apos;s Guild Children of the Watch
							</Text>
						</Row>
					</Tooltip>
				}
				maxWidth="23.125rem"
				onClose={(): void => console.log('This is the way')}
			/>
			<Chip
				keyLabel="The Mandalorian:"
				label={'Carasynthia "Cara" Dune'}
				maxWidth="23.125rem"
				disabled="Disabled tooltip"
			/>
			<Chip
				keyLabel="Grogu"
				label={
					<>
						<Text weight="bold" size="medium">
							Grogu
						</Text>
						&nbsp;
						<Text weight="bold" color="primary">
							The Child
						</Text>
						&nbsp;
						<Text size="large" color="error">
							Baby Yoda
						</Text>
						&nbsp;
						<Text size="small" color="orange">
							king of
						</Text>
						&nbsp;
						<Text size="small" color="success" weight="bold">
							memes
						</Text>
					</>
				}
				shape="regular"
			/>
		</Container>
	)
} satisfies Story;

export const Actions = {
	render: (): React.JSX.Element => (
		<Container
			orientation="horizontal"
			wrap="wrap"
			mainAlignment="flex-start"
			maxWidth="44rem"
			style={{ gap: '0.5rem' }}
		>
			<Chip
				label="Daenerys Targaryen"
				shape="round"
				onClose={(): void => console.log('Dracarys')}
				actions={[
					{
						id: 'action1',
						label: 'The Dragon Queen',
						type: 'icon',
						icon: 'Crown'
					},
					{
						id: 'action2',
						label: 'The Queen Across the Water',
						type: 'button',
						icon: 'Globe2',
						onClick: (): void => console.log('Lady of Dragonstone')
					}
				]}
			/>
			<Chip
				label="Jon Snow"
				avatarPicture="https://64.media.tumblr.com/avatar_0aeca7a262ac_128.pnj"
				actions={[
					{
						id: 'action1',
						label: "998th Lord Commander of the Night's Watch",
						type: 'icon',
						icon: 'Moon'
					},
					{
						id: 'action2',
						label: 'Knows nothing',
						type: 'icon',
						icon: 'QuestionMark'
					}
				]}
			/>
			<Chip
				label="Eddard 'Ned' Stark"
				actions={[
					{
						id: 'action1',
						label: 'label for icon 1',
						type: 'icon',
						icon: 'Star'
					},
					{
						id: 'action2',
						label: 'label for action 1',
						type: 'button',
						icon: 'EyeOutline',
						onClick: (): void => console.log('clicked action 2'),
						disabled: true,
						background: 'primary',
						color: 'gray6'
					},
					{
						id: 'action3',
						type: 'button',
						icon: 'Close',
						onClick: (): void => console.log('clicked action 3'),
						background: 'primary',
						color: 'gray6'
					},
					{
						id: 'action4',
						label: 'label for icon 4',
						type: 'icon',
						icon: 'Share'
					}
				]}
				onClick={(): void => console.log('chip click')}
			/>
			<Chip
				label="Robert Baratheon"
				shape="regular"
				actions={[
					{
						id: 'action1',
						label: 'label for icon 1',
						type: 'icon',
						icon: 'Star'
					},
					{
						id: 'action2',
						label: 'label for action 1',
						type: 'button',
						icon: 'EyeOutline',
						onClick: (): void => {}
					}
				]}
				onClose={() => console.log('close')}
			/>
			<Chip
				label="Jaime Lannister"
				shape="regular"
				error="Lost his hand while captured with Brienne of Tarth"
				actions={[
					{
						id: 'action1',
						label: 'label for icon 1',
						type: 'icon',
						icon: 'Star'
					},
					{
						id: 'action2',
						label: 'label for icon 2',
						type: 'button',
						icon: 'EyeOutline',
						onClick: (): void => {}
					}
				]}
				onClose={() => console.log('close')}
			/>
			<Chip
				label="Catelyn Stark"
				shape="regular"
				disabled="Disabled because why"
				actions={[
					{
						id: 'action1',
						label: 'label for icon 1',
						type: 'icon',
						icon: 'Star'
					},
					{
						id: 'action2',
						label: 'label for icon 2',
						type: 'icon',
						icon: 'EyeOutline'
					}
				]}
				onClose={() => console.log('close')}
				onClick={() => console.log('click on disabled chip')}
			/>
			<Chip
				hasAvatar={false}
				keyLabel="Queen:"
				label="Cersei Lannister"
				onClick={() => console.log('chip click')}
			/>
			<Chip
				shape="regular"
				avatarLabel="IG-11"
				actions={[
					{
						id: 'action1',
						label: 'label for icon 1',
						type: 'icon',
						icon: 'Star'
					},
					{
						id: 'action2',
						label: 'label for icon 2',
						type: 'icon',
						icon: 'EyeOutline'
					}
				]}
				onClose={() => console.log('close')}
				closable={false}
				onClick={() => console.log('chip click')}
				onDoubleClick={() => console.log('double click')}
			/>
		</Container>
	)
} satisfies Story;

export const Interaction = {
	name: 'Interaction (for click events)',
	render: (): React.JSX.Element => (
		<Container
			orientation="horizontal"
			wrap="wrap"
			mainAlignment="flex-start"
			maxWidth="44rem"
			style={{ gap: '0.5rem' }}
		>
			<Chip
				label="Buffy Summers"
				shape="round"
				onClose={() => console.log('What are we gonna do now?')}
				actions={[
					{
						id: 'action1',
						label: 'Vampire Slayer',
						type: 'icon',
						icon: 'MoonOutline'
					}
				]}
				onClick={() => console.log('click')}
			/>
			<Chip
				label="Xander Harris"
				shape="round"
				onClick={() => console.log('click')}
				onDoubleClick={() => console.log('double click')}
			/>
			<Chip
				label="Willow Rosenberg"
				shape="round"
				onDoubleClick={() => console.log('double click')}
			/>
			<Chip
				label="Cordelia Chase"
				shape="regular"
				onClick={() => console.log('click')}
				onDoubleClick={() => console.log('double click')}
				disabled
			/>
		</Container>
	)
} satisfies Story;
