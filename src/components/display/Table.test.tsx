/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { screen } from '@testing-library/react';

import { render } from '../../test-utils';
import { Icon } from '../basic/Icon';
import { Container } from '../layout/Container';
import { THeader, Table, TRow } from './Table';

describe('Table', () => {
	test('Render uncontrolled Table', () => {
		const headers: THeader[] = [
			{
				id: 'date1',
				label: 'Date1',
				width: '20%'
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
				width: '40%'
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

		render(
			<Table
				rows={items}
				headers={headers}
				defaultSelection={['2', '3']}
				onSelectionChange={jest.fn()}
			/>
		);

		expect(screen.getByText('Date1')).toBeInTheDocument();
		expect(screen.getByText('Server1')).toBeInTheDocument();
		expect(screen.getByText('Type1')).toBeInTheDocument();
		expect(screen.getByText('Object1')).toBeInTheDocument();
	});

	test('Render a controlled table', () => {
		const headers: THeader[] = [
			{
				id: 'date2',
				label: 'Date2',
				width: '20%'
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
				width: '40%'
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

		const onSelectionChange = jest.fn();
		render(
			<Table
				rows={items}
				headers={headers}
				selectedRows={[]}
				onSelectionChange={onSelectionChange}
			/>
		);

		expect(screen.getByText('Date2')).toBeInTheDocument();
		expect(screen.getByText('Server2')).toBeInTheDocument();
		expect(screen.getByText('Type2')).toBeInTheDocument();
		expect(screen.getByText('Object2')).toBeInTheDocument();
	});

	test('index of the array is shown by default', async () => {
		const headers: THeader[] = [{ id: 'col1', label: 'header 1' }];
		const rows: TRow[] = [
			{ id: 'row1', columns: ['row1col1', 'row1col2'] },
			{ id: 'row2', columns: ['row2col1', 'row2col2'] }
		];
		render(<Table headers={headers} rows={rows} showCheckbox />);
		expect(screen.getByText('row1col1')).toBeVisible();
		expect(screen.getByText('row2col1')).toBeVisible();
		expect(screen.getByText('1')).toBeVisible();
		expect(screen.getByText('2')).toBeVisible();
	});

	test('show the index provided in the row item when set', async () => {
		const headers: THeader[] = [{ id: 'col1', label: 'header 1' }];
		const rows: TRow[] = [
			{ id: 'row1', columns: ['row1col1', 'row1col2'], index: 90 },
			{ id: 'row2', columns: ['row2col1', 'row2col2'], index: 100 }
		];
		render(<Table headers={headers} rows={rows} showCheckbox />);
		expect(screen.getByText('row1col1')).toBeVisible();
		expect(screen.getByText('row2col1')).toBeVisible();
		expect(screen.queryByText('1')).not.toBeInTheDocument();
		expect(screen.queryByText('2')).not.toBeInTheDocument();
		expect(screen.getByText('90')).toBeVisible();
		expect(screen.getByText('100')).toBeVisible();
	});
});
