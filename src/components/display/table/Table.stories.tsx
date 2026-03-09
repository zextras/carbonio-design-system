/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Table } from './Table';
import { TableNormal } from './Table.stories.normal';
import TableNormalStorySrc from './Table.stories.normal?raw';
import { TableSingleRowSelection } from './Table.stories.singleRowSelection';
import TableSingleRowSelectionStorySrc from './Table.stories.singleRowSelection?raw';
import { Icon } from '../../basic/icon/Icon';
import { Text } from '../../basic/text/Text';
import { Container } from '../../layout/container/Container';
import { Tooltip } from '../tooltip/Tooltip';

const meta = {
	component: Table,
	argTypes: {
		multiSelect: { control: 'boolean' }
	}
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof Table>;

export const Default = {
	args: {
		onSelectionChange: (selected: boolean): void =>
			console.log('Uncontrolled selection onChange', selected),
		headers: [
			{
				id: 'date',
				label: 'Date',
				width: '20%'
			},
			{
				id: 'server',
				label: 'Server',
				width: '20%',
				i18nAllLabel: 'All',
				align: 'left',
				items: [
					{ label: 'Servername_1', value: '1' },
					{ label: 'Servername_2', value: '2' },
					{ label: 'Servername_3', value: '3' },
					{ label: 'Servername_4', value: '4' },
					{ label: 'Servername_5', value: '5' },
					{ label: 'Servername_6', value: '6' },
					{ label: 'Servername_7', value: '7' },
					{ label: 'Servername_8', value: '8' }
				],
				onChange: (e: boolean): void => console.log('Filter changed', e)
			},
			{
				id: 'type',
				label: 'Type',
				i18nAllLabel: 'All',
				width: '3.75rem',
				align: 'center',
				items: [
					{ label: 'Information', value: '1' },
					{ label: 'Warning', value: '2' },
					{ label: 'Error', value: '3' }
				],
				onChange: (e: boolean): void => console.log('Filter changed', e)
			},
			{
				id: 'obj',
				label: 'Object',
				width: '40%'
			}
		],
		rows: [
			{
				id: '1',
				columns: [
					'30 nov 2020, 06:01 AM',
					'Servernamerverylong',
					<Container key="icon-1">
						<Icon icon="Info" color="primary" />
					</Container>,
					'Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
				],
				onClick: (e: React.SyntheticEvent): void => console.log('Row clicked', e),
				clickable: true
			},
			{
				id: '2',
				columns: [
					'30 nov 2020, 06:01 AM',
					'Servernamerverylong',
					<Container key="icon-2">
						<Icon icon="AlertTriangle" color="warning" />
					</Container>,
					<Tooltip
						key="tooltip-2"
						label="Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit."
					>
						<Text>
							Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						</Text>
					</Tooltip>
				],
				highlight: true,
				onClick: (e: React.SyntheticEvent): void => console.log('Row clicked', e)
			},
			{
				id: '3',
				columns: [
					'30 nov 2020, 06:01 AM',
					'Servernamerverylong',
					<Container key="icon-3">
						<Icon icon="CloseSquare" color="error" />
					</Container>,
					'Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
				],
				onClick: (e: React.SyntheticEvent): void => console.log('Row clicked', e),
				clickable: true
			},
			{
				id: '4',
				columns: [
					'30 nov 2020, 06:01 AM',
					'Servernamerverylong',
					<Container key="icon-4">
						<Icon icon="CloseSquare" color="error" />
					</Container>,
					'Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
				],
				onClick: (e: React.SyntheticEvent): void => console.log('Row clicked', e),
				clickable: true
			}
		]
	}
};

export const Normal = {
	render: TableNormal,
	parameters: { docs: { source: { code: TableNormalStorySrc } } }
} satisfies Story;

export const SingleRowSelection = {
	render: TableSingleRowSelection,
	parameters: { docs: { source: { code: TableSingleRowSelectionStorySrc } } }
} satisfies Story;

export const Custom = {
	name: 'Hide checkboxes and show custom indexes',
	args: {
		headers: [
			{
				id: 'date',
				label: 'Date',
				width: '20%',
				bold: true
			},
			{
				id: 'server',
				label: 'Server',
				width: '20%',
				i18nAllLabel: 'All',
				align: 'left',
				bold: true,
				items: [
					{ label: 'Servername_1', value: '1' },
					{ label: 'Servername_2', value: '2' },
					{ label: 'Servername_3', value: '3' },
					{ label: 'Servername_4', value: '4' },
					{ label: 'Servername_5', value: '5' },
					{ label: 'Servername_6', value: '6' },
					{ label: 'Servername_7', value: '7' },
					{ label: 'Servername_8', value: '8' }
				],
				onChange: (e): void => console.log('Filter changed', e)
			},
			{
				id: 'type',
				label: 'Type',
				i18nAllLabel: 'All',
				width: '3.75rem',
				align: 'center',
				bold: true,
				items: [
					{ label: 'Information', value: '1' },
					{ label: 'Warning', value: '2' },
					{ label: 'Error', value: '3' }
				],
				onChange: (e): void => console.log('Filter changed', e)
			},
			{
				id: 'obj',
				label: 'Object',
				bold: true,
				width: '40%'
			}
		],
		rows: [
			{
				id: '1',
				columns: [
					'30 nov 2020, 06:01 AM',
					'Servernamerverylong',
					<Container key="icon-1">
						<Icon icon="Info" color="primary" />
					</Container>,
					'Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
				],
				onClick: (e): void => console.log('Row clicked', e),
				clickable: true,
				index: 10
			},
			{
				id: '2',
				columns: [
					'30 nov 2020, 06:01 AM',
					'Servernamerverylong',
					<Container key="icon-2">
						<Icon icon="AlertTriangle" color="warning" />
					</Container>,
					<Tooltip
						key="tooltip-2"
						label="Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit."
					>
						<Text>
							Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						</Text>
					</Tooltip>
				],
				onClick: (e): void => console.log('Row clicked', e),
				index: 20
			},
			{
				id: '3',
				columns: [
					'30 nov 2020, 06:01 AM',
					'Servernamerverylong',
					<Container key="icon-3">
						<Icon icon="CloseSquare" color="error" />
					</Container>,
					'Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
				],
				onClick: (e): void => console.log('Row clicked', e),
				clickable: true,
				index: 30
			},
			{
				id: '4',
				columns: [
					'30 nov 2020, 06:01 AM',
					'Servernamerverylong',
					<Container key="icon-4">
						<Icon icon="CloseSquare" color="error" />
					</Container>,
					'Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
				],
				onClick: (e): void => console.log('Row clicked', e),
				clickable: true,
				index: 40
			}
		]
	}
} satisfies Story;
