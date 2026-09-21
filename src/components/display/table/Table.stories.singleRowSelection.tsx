/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useState } from 'react';

import type { THeader, TRow } from './Table';
import { Table } from './Table';
import { Button } from '../../basic/button/Button';
import { Icon } from '../../basic/icon/Icon';
import { Text } from '../../basic/text/Text';
import { Container } from '../../layout/container/Container';
import { Row } from '../../layout/row/Row';
import { Tooltip } from '../tooltip/Tooltip';

const headers: THeader[] = [
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
		onChange: (e): void => console.log('Filter changed', e)
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
		onChange: (e): void => console.log('Filter changed', e)
	},
	{
		id: 'obj',
		label: 'Object',
		width: '40%'
	}
];

const rows: TRow[] = [
	{
		id: '1',
		columns: [
			'30 nov 2020, 06:01 AM',
			'Servernamerverylong',
			<Container key="icon-1">
				<Icon icon="Info" color="primary" />
			</Container>,
			'Zextras Backup Notification, Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
		],
		onClick: (e): void => console.log('Row clicked', e),
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
				label="Zextras Backup Notification, Lorem ipsum dolor sit amet, consectetur adipiscing elit."
			>
				<Text>
					Zextras Backup Notification, Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				</Text>
			</Tooltip>
		],
		onClick: (e): void => console.log('Row clicked', e)
	},
	{
		id: '3',
		columns: [
			'30 nov 2020, 06:01 AM',
			'Servernamerverylong',
			<Container key="icon-3">
				<Icon icon="CloseSquare" color="error" />
			</Container>,
			'Zextras Backup Notification, Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
		],
		onClick: (e): void => console.log('Row clicked', e),
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
			'Zextras Backup Notification, Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
		],
		onClick: (e): void => console.log('Row clicked', e),
		clickable: true
	}
];

export const SingleRowSelection = (): React.JSX.Element => {
	const [selectedRows, setSelectedRows] = useState<[string] | []>([]);

	return (
		<>
			<Text size="large" weight="bold">
				Uncontrolled table
			</Text>
			<Table
				rows={rows}
				headers={headers}
				multiSelect={false}
				defaultSelection={['2']}
				onSelectionChange={(selected): void =>
					console.log('Uncontrolled selection onChange', selected)
				}
			/>
			<Row
				padding={{ top: 'extralarge', bottom: 'large' }}
				mainAlignment="space-between"
				width="100%"
			>
				<Text size="large" weight="bold">
					Controlled table
				</Text>
				<Button label="Reset" color="error" onClick={(): void => setSelectedRows([])} />
			</Row>
			<Table
				rows={rows}
				headers={headers}
				multiSelect={false}
				selectedRows={selectedRows}
				onSelectionChange={(ids): void => {
					setSelectedRows(ids.length > 0 ? [ids[0]] : []);
				}}
			/>
		</>
	);
};
