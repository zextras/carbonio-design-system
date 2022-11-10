/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState } from 'react';

import { screen } from '@testing-library/react';

import { render } from '../../test-utils';
import { Button } from '../basic/Button';
import { Icon } from '../basic/Icon';
import { Text } from '../basic/Text';
import { Container } from '../layout/Container';
import { Padding } from '../layout/Padding';
import { Row } from '../layout/Row';
import { THeader, Table, TRow } from './Table';

const CustomTable = (): JSX.Element => {
	const [selectedRows, setSelectedRows] = useState<string[]>([]);

	const headers: THeader[] = [
		{
			id: 'date1',
			label: 'Date1',
			width: '20%',
			onChange: jest.fn()
		},
		{
			id: 'server1',
			label: 'Server1',
			width: '20%',
			i18nAllLabel: 'All',
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
			onChange: jest.fn()
		},
		{
			id: 'type1',
			label: 'Type1',
			i18nAllLabel: 'All',
			width: '3.75rem',
			items: [
				{ label: 'Information', value: '1' },
				{ label: 'Warning', value: '2' },
				{ label: 'Error', value: '3' }
			],
			onChange: jest.fn()
		},
		{
			id: 'obj1',
			label: 'Object1',
			width: '40%',
			onChange: jest.fn()
		}
	];

	const headers2: THeader[] = [
		{
			id: 'date2',
			label: 'Date2',
			width: '20%',
			onChange: jest.fn()
		},
		{
			id: 'server2',
			label: 'Server2',
			width: '20%',
			i18nAllLabel: 'All',
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
			onChange: jest.fn()
		},
		{
			id: 'type2',
			label: 'Type2',
			i18nAllLabel: 'All',
			width: '3.75rem',
			items: [
				{ label: 'Information', value: '1' },
				{ label: 'Warning', value: '2' },
				{ label: 'Error', value: '3' }
			],
			onChange: jest.fn()
		},
		{
			id: 'obj2',
			label: 'Object2',
			width: '40%',
			onChange: jest.fn()
		}
	];

	const items: TRow[] = [
		{
			id: '1',
			columns: [
				'30 nov 2020, 06:01 AM',
				'Servernamerverylong',
				<Container key="1">
					<Icon icon="Info" color="primary" />
				</Container>,
				'Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
			],
			onClick: jest.fn(),
			clickable: true
		},
		{
			id: '2',
			columns: [
				'30 nov 2020, 06:01 AM',
				'Servernamerverylong',
				<Container key="2">
					<Icon icon="Info" color="error" />
				</Container>,
				'Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
			],
			onClick: jest.fn(),
			clickable: true
		},
		{
			id: '3',
			columns: [
				'30 nov 2020, 06:01 AM',
				'Servernamerverylong',
				<Container key="3">
					<Icon icon="CloseSquare" color="error" />
				</Container>,
				'Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
			],
			onClick: jest.fn(),
			clickable: true
		},
		{
			id: '4',
			columns: [
				'30 nov 2020, 06:01 AM',
				'Servernamerverylong',
				<Container key="4">
					<Icon icon="CloseSquare" color="error" />
				</Container>,
				'Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
			],
			onClick: jest.fn(),
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
				defaultSelection={['2', '3']}
				onSelectionChange={jest.fn()}
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
				rows={items}
				headers={headers2}
				selectedRows={selectedRows}
				onSelectionChange={setSelectedRows}
			/>
		</>
	);
};

describe('Table', () => {
	test('Render uncontrolled and controlled Table', () => {
		render(<CustomTable />);

		expect(screen.getByText('Date1')).toBeInTheDocument();
		expect(screen.getByText('Server1')).toBeInTheDocument();
		expect(screen.getByText('Type1')).toBeInTheDocument();
		expect(screen.getByText('Object1')).toBeInTheDocument();
		expect(screen.getByText('Date2')).toBeInTheDocument();
		expect(screen.getByText('Server2')).toBeInTheDocument();
		expect(screen.getByText('Type2')).toBeInTheDocument();
		expect(screen.getByText('Object2')).toBeInTheDocument();
	});
});
