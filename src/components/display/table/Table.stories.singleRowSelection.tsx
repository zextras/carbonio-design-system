/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useState } from 'react';

import { Table } from './Table';
import type { THeader } from './Table';
import type { SingleItemArray } from '../../../types/utils';
import { Button } from '../../basic/button/Button';
import { Icon } from '../../basic/icon/Icon';
import { Text } from '../../basic/text/Text';
import { Container } from '../../layout/container/Container';
import { Padding } from '../../layout/Padding';
import { Row } from '../../layout/Row';
import { Tooltip } from '../tooltip/Tooltip';

export const TableSingleRowSelection = (): React.JSX.Element => {
	const [selectedRows, setSelectedRows] = useState<SingleItemArray<string>>([]);
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
			onChange: (e) => console.log('Filter changed', e)
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
			onChange: (e) => console.log('Filter changed', e)
		},
		{
			id: 'obj',
			label: 'Object',
			width: '40%'
		}
	];
	const items = [
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
			onClick: (e: React.SyntheticEvent) => console.log('Row clicked', e),
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
			onClick: (e: React.SyntheticEvent) => console.log('Row clicked', e)
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
			onClick: (e: React.SyntheticEvent) => console.log('Row clicked', e),
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
			onClick: (e: React.SyntheticEvent) => console.log('Row clicked', e),
			clickable: true
		}
	];

	return (
		<>
			<Padding bottom="large">
				<Text size="large" weight="bold">
					Uncontrolled table
				</Text>
			</Padding>
			<Table
				rows={items}
				headers={headers}
				multiSelect={false}
				defaultSelection={['2']}
				onSelectionChange={(selected) => console.log('Uncontrolled selection onChange', selected)}
			/>
			<Row
				padding={{ top: 'extralarge', bottom: 'large' }}
				mainAlignment="space-between"
				width="100%"
			>
				<Text size="large" weight="bold">
					Controlled table
				</Text>
				<Button label="Reset" color="error" onClick={() => setSelectedRows([])} />
			</Row>
			<Table
				rows={items}
				headers={headers}
				multiSelect={false}
				selectedRows={selectedRows}
				onSelectionChange={(selected) => setSelectedRows(selected as SingleItemArray<string>)}
			/>
		</>
	);
};
