/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { faker } from '@faker-js/faker';
import { fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { THeader, Table, TRow } from './Table';
import { render } from '../../test-utils';
import { ICONS } from '../../testUtils/constants';
import { Icon } from '../basic/Icon';
import { Container } from '../layout/Container';

describe('Table', () => {
	test('index of the array is shown by default', async () => {
		const headers: THeader[] = [
			{ id: 'col1', label: 'header 1' },
			{ id: 'col2', label: 'header 2' }
		];
		const rows: TRow[] = [
			{ id: 'row1', columns: ['row1col1', 'row1col2'] },
			{ id: 'row2', columns: ['row2col1', 'row2col2'] }
		];

		render(
			<Table
				headers={headers}
				rows={rows}
				showCheckbox
				{...faker.helpers.arrayElement([{ selectedRows: [] }, { defaultSelection: [] }])}
			/>
		);
		expect(screen.getByText('row1col1')).toBeVisible();
		expect(screen.getByText('row2col1')).toBeVisible();
		expect(screen.getByText('1')).toBeVisible();
		expect(screen.getByText('2')).toBeVisible();
	});

	test('show the index provided in the row item when set', async () => {
		const headers: THeader[] = [
			{ id: 'col1', label: 'header 1' },
			{ id: 'col2', label: 'header 2' }
		];
		const rows: TRow[] = [
			{ id: 'row1', columns: ['row1col1', 'row1col2'], index: 90 },
			{ id: 'row2', columns: ['row2col1', 'row2col2'], index: 100 }
		];

		render(
			<Table
				headers={headers}
				rows={rows}
				showCheckbox
				{...faker.helpers.arrayElement([{ selectedRows: [] }, { defaultSelection: [] }])}
			/>
		);
		expect(screen.getByText('row1col1')).toBeVisible();
		expect(screen.getByText('row2col1')).toBeVisible();
		expect(screen.queryByText('1')).not.toBeInTheDocument();
		expect(screen.queryByText('2')).not.toBeInTheDocument();
		expect(screen.getByText('90')).toBeVisible();
		expect(screen.getByText('100')).toBeVisible();
	});

	test('When the selection is empty, checkbox of a row is shown on focus and hidden on blur', async () => {
		const headers: THeader[] = [
			{ id: 'col1', label: 'header 1' },
			{ id: 'col2', label: 'header 2' }
		];
		const rows: TRow[] = [{ id: 'row1', columns: ['row1col1', 'row1col2'] }];
		render(
			<Table
				headers={headers}
				rows={rows}
				showCheckbox
				{...faker.helpers.arrayElement([{ selectedRows: [] }, { defaultSelection: [] }])}
			/>
		);

		const row1 = screen
			.getAllByRole('row')
			.find((row) => within(row).queryByText('row1col1') !== null) as HTMLElement;
		expect(row1).toBeDefined();
		fireEvent.focus(row1);
		await screen.findByTestId(ICONS.checkboxOff);
		expect(screen.getByTestId(ICONS.checkboxOff)).toBeVisible();
		fireEvent.blur(row1);
		expect(screen.queryByTestId(ICONS.checkboxOff)).not.toBeInTheDocument();
	});

	test('When the selection is empty, checkbox of a row is shown on hover and hidden on un-hover', async () => {
		const headers: THeader[] = [
			{ id: 'col1', label: 'header 1' },
			{ id: 'col2', label: 'header 2' }
		];
		const rows: TRow[] = [{ id: 'row1', columns: ['row1col1', 'row1col2'] }];
		render(
			<Table
				headers={headers}
				rows={rows}
				showCheckbox
				{...faker.helpers.arrayElement([{ selectedRows: [] }, { defaultSelection: [] }])}
			/>
		);

		const row1 = screen
			.getAllByRole('row')
			.find((row) => within(row).queryByText('row1col1') !== null) as HTMLElement;
		expect(row1).toBeDefined();
		userEvent.hover(row1);
		await screen.findByTestId(ICONS.checkboxOff);
		expect(screen.getByTestId(ICONS.checkboxOff)).toBeVisible();
		userEvent.unhover(row1);
		expect(screen.queryByTestId(ICONS.checkboxOff)).not.toBeInTheDocument();
	});

	test('If multi selection is disabled, checkbox to select all is not shown inside header', async () => {
		const headers: THeader[] = [
			{ id: 'col1', label: 'header 1' },
			{ id: 'col2', label: 'header 2' }
		];
		const rows: TRow[] = [{ id: 'row1', columns: ['row1col1', 'row1col2'] }];
		render(
			<Table
				headers={headers}
				rows={rows}
				showCheckbox
				selectedRows={faker.helpers.arrayElement([[], undefined])}
				multiSelect={false}
			/>
		);

		userEvent.hover(screen.getByText('header 1'));
		expect(screen.queryByTestId(ICONS.checkboxOff)).not.toBeInTheDocument();
	});

	describe('Uncontrolled mode', () => {
		test('Render uncontrolled Table', () => {
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
					items: [
						{ label: 'Servername_1', value: '1' },
						{ label: 'Servername_2', value: '2' }
					],
					onChange: jest.fn()
				},
				{
					id: 'type',
					label: 'Type',
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
					id: 'obj',
					label: 'Object',
					width: '40%'
				}
			];
			const items: TRow[] = [
				{
					id: '1',
					columns: [
						'30 nov 2020, 06:01 AM',
						faker.string.sample(),
						<Container key="1">
							<Icon icon="Info" color="primary" />
						</Container>,
						faker.lorem.sentence()
					],
					onClick: jest.fn(),
					clickable: true
				},
				{
					id: '2',
					columns: [
						'31 nov 2020, 06:01 AM',
						faker.string.sample(),
						<Container key="2">
							<Icon icon="AlertCircle" color="error" />
						</Container>,
						faker.lorem.sentence()
					],
					onClick: jest.fn(),
					clickable: true
				}
			];

			render(<Table rows={items} headers={headers} />);

			expect(screen.getByRole('table')).toBeVisible();
			// headers are visible
			expect(screen.getByText('Date')).toBeVisible();
			expect(screen.getByText('Server')).toBeVisible();
			expect(screen.getByText('Type')).toBeVisible();
			expect(screen.getByText('Object')).toBeVisible();
			// rows are visible
			expect(screen.getByText(items[0].columns[0] as string)).toBeVisible();
			expect(screen.getByText(items[0].columns[1] as string)).toBeVisible();
			expect(screen.getByTestId('icon: Info')).toBeVisible();
			expect(screen.getByText(items[0].columns[3] as string)).toBeVisible();
			expect(screen.getByText(items[1].columns[0] as string)).toBeVisible();
			expect(screen.getByText(items[1].columns[1] as string)).toBeVisible();
			expect(screen.getByTestId('icon: AlertCircle')).toBeVisible();
			expect(screen.getByText(items[1].columns[3] as string)).toBeVisible();
		});

		test('Checkboxes are hidden at first. They become all visible if there is at least one item checked', async () => {
			const headers: THeader[] = [
				{ id: 'col1', label: 'header 1' },
				{ id: 'col2', label: 'header 2' }
			];
			const rows: TRow[] = [
				{ id: 'row1', columns: ['row1col1', 'row1col2'], index: 90 },
				{ id: 'row2', columns: ['row2col1', 'row2col2'], index: 100 }
			];
			render(<Table headers={headers} rows={rows} showCheckbox />);
			// no checkbox is visible
			expect(screen.queryByTestId(ICONS.checkboxOff)).not.toBeInTheDocument();
			expect(screen.queryByTestId(ICONS.checkboxOn)).not.toBeInTheDocument();
			userEvent.hover(screen.getByText('row2col1'));
			await screen.findByTestId(ICONS.checkboxOff);
			expect(screen.getByTestId(ICONS.checkboxOff)).toBeVisible();
			userEvent.click(screen.getByTestId(ICONS.checkboxOff));
			await screen.findByTestId(ICONS.checkboxOn);
			expect(screen.getByTestId(ICONS.checkboxOn)).toBeVisible();
			// checkboxes for the header and for the other row become visible
			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(2);
			userEvent.click(screen.getByTestId(ICONS.checkboxOn));
			expect(screen.getByTestId(ICONS.checkboxOff)).toBeVisible();
			userEvent.unhover(screen.getByText('row2col1'));
			expect(screen.queryByTestId(ICONS.checkboxOff)).not.toBeInTheDocument();
			expect(screen.queryByTestId(ICONS.checkboxOn)).not.toBeInTheDocument();
		});

		test('Click on the header checkbox immediately toggle check for all rows and calls onSelectionChange with the new selection', async () => {
			const headers: THeader[] = [
				{ id: 'col1', label: 'header 1' },
				{ id: 'col2', label: 'header 2' }
			];
			const rows: TRow[] = [
				{ id: 'row1', columns: ['row1col1', 'row1col2'], index: 90 },
				{ id: 'row2', columns: ['row2col1', 'row2col2'], index: 100 }
			];
			render(<Table headers={headers} rows={rows} showCheckbox />);
			const headerRow = screen
				.getAllByRole('row')
				.find((row) => within(row).queryByText('header 1') !== null) as HTMLElement;
			expect(headerRow).toBeDefined();
			userEvent.hover(headerRow);
			await screen.findByTestId(ICONS.checkboxOff);
			userEvent.click(screen.getByTestId(ICONS.checkboxOff));
			expect(screen.getAllByTestId(ICONS.checkboxOn)).toHaveLength(3);
			expect(screen.queryByTestId(ICONS.checkboxOff)).not.toBeInTheDocument();
			userEvent.click(within(headerRow).getByTestId(ICONS.checkboxOn));
			// checkbox is visible in header row because hover is still enabled
			expect(screen.getByTestId(ICONS.checkboxOff)).toBeVisible();
			expect(screen.queryByTestId(ICONS.checkboxOn)).not.toBeInTheDocument();
			userEvent.unhover(screen.getByTestId(ICONS.checkboxOff));
			expect(screen.queryByTestId(ICONS.checkboxOff)).not.toBeInTheDocument();
		});

		test('If a default selection is provided, checkboxes are visible and selected. onSelectionChange is not called', async () => {
			const headers: THeader[] = [
				{ id: 'col1', label: 'header 1' },
				{ id: 'col2', label: 'header 2' }
			];
			const rows: TRow[] = [
				{ id: 'row1', columns: ['row1col1', 'row1col2'], index: 90 },
				{ id: 'row2', columns: ['row2col1', 'row2col2'], index: 100 }
			];

			const defaultSelection = [rows[0].id];
			const onSelectionChangeFn = jest.fn();
			render(
				<Table
					headers={headers}
					rows={rows}
					onSelectionChange={onSelectionChangeFn}
					defaultSelection={defaultSelection}
				/>
			);
			expect(screen.getByTestId(ICONS.checkboxOn)).toBeVisible();
			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(2);
			expect(onSelectionChangeFn).not.toHaveBeenCalled();
		});

		test('onSelectionChange is called with the new selected items when selection changes. The new selection is immediately shown', async () => {
			const headers: THeader[] = [
				{ id: 'col1', label: 'header 1' },
				{ id: 'col2', label: 'header 2' }
			];
			const rows: TRow[] = [
				{ id: 'row1', columns: ['row1col1', 'row1col2'] },
				{ id: 'row2', columns: ['row2col1', 'row2col2'] },
				{ id: 'row3', columns: ['row3col1', 'row3col2'] }
			];

			const defaultSelection = [rows[2].id];
			const onSelectionChangeFn = jest.fn();
			render(
				<Table
					headers={headers}
					rows={rows}
					onSelectionChange={onSelectionChangeFn}
					defaultSelection={defaultSelection}
				/>
			);
			expect(screen.getByTestId(ICONS.checkboxOn)).toBeVisible();
			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(3);
			userEvent.click(screen.getAllByTestId(ICONS.checkboxOff)[1]);
			expect(onSelectionChangeFn).toHaveBeenCalled();
			expect(onSelectionChangeFn).toHaveBeenCalledWith([rows[2].id, rows[0].id]);
			expect(screen.getAllByTestId(ICONS.checkboxOn)).toHaveLength(2);
			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(2);
		});

		test('If multiselect is disabled, the selection of a row automatically deselect the previous selected one', async () => {
			const headers: THeader[] = [
				{ id: 'col1', label: 'header 1' },
				{ id: 'col2', label: 'header 2' }
			];
			const rows: TRow[] = [
				{ id: 'row1', columns: ['row1col1', 'row1col2'] },
				{ id: 'row2', columns: ['row2col1', 'row2col2'] },
				{ id: 'row3', columns: ['row3col1', 'row3col2'] }
			];

			const defaultSelection: [string] | [] = [rows[2].id];
			const onSelectionChangeFn = jest.fn();
			render(
				<Table
					headers={headers}
					rows={rows}
					onSelectionChange={onSelectionChangeFn}
					defaultSelection={defaultSelection}
					multiSelect={false}
				/>
			);

			const row0 = screen
				.getAllByRole('row')
				.find(
					(row) => within(row).queryByText(rows[0].columns[0] as string) !== null
				) as HTMLElement;
			const row2 = screen
				.getAllByRole('row')
				.find(
					(row) => within(row).queryByText(rows[2].columns[0] as string) !== null
				) as HTMLElement;
			expect(screen.getByTestId(ICONS.checkboxOn)).toBeVisible();
			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(2);
			expect(within(row0).getByTestId(ICONS.checkboxOff)).toBeVisible();
			expect(within(row2).getByTestId(ICONS.checkboxOn)).toBeVisible();
			userEvent.click(within(row0).getByTestId(ICONS.checkboxOff));
			expect(screen.getByTestId(ICONS.checkboxOn)).toBeVisible();
			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(2);
			expect(within(row2).getByTestId(ICONS.checkboxOff)).toBeVisible();
			expect(within(row0).getByTestId(ICONS.checkboxOn)).toBeVisible();
			expect(onSelectionChangeFn).toHaveBeenCalledTimes(1);
			expect(onSelectionChangeFn).toHaveBeenCalledWith([rows[0].id]);
		});

		test('If multiselect is disabled, click on the selected row checkbox empties the selection', async () => {
			const headers: THeader[] = [
				{ id: 'col1', label: 'header 1' },
				{ id: 'col2', label: 'header 2' }
			];
			const rows: TRow[] = [
				{ id: 'row1', columns: ['row1col1', 'row1col2'] },
				{ id: 'row2', columns: ['row2col1', 'row2col2'] },
				{ id: 'row3', columns: ['row3col1', 'row3col2'] }
			];

			const defaultSelection: [string] | [] = [rows[2].id];
			const onSelectionChangeFn = jest.fn();
			render(
				<Table
					headers={headers}
					rows={rows}
					onSelectionChange={onSelectionChangeFn}
					defaultSelection={defaultSelection}
					multiSelect={false}
				/>
			);

			const row2 = screen
				.getAllByRole('row')
				.find(
					(row) => within(row).queryByText(rows[2].columns[0] as string) !== null
				) as HTMLElement;
			expect(screen.getByTestId(ICONS.checkboxOn)).toBeVisible();
			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(2);
			expect(within(row2).getByTestId(ICONS.checkboxOn)).toBeVisible();
			userEvent.click(within(row2).getByTestId(ICONS.checkboxOn));
			expect(screen.queryByTestId(ICONS.checkboxOn)).not.toBeInTheDocument();
			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(3);
			expect(within(row2).getByTestId(ICONS.checkboxOff)).toBeVisible();
			expect(onSelectionChangeFn).toHaveBeenCalledTimes(1);
			expect(onSelectionChangeFn).toHaveBeenCalledWith([]);
		});
	});

	describe('Controlled mode', () => {
		test('Render a controlled table', () => {
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
					items: [
						{ label: 'Servername_1', value: '1' },
						{ label: 'Servername_2', value: '2' }
					],
					onChange: jest.fn()
				},
				{
					id: 'type',
					label: 'Type',
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
					id: 'obj',
					label: 'Object',
					width: '40%'
				}
			];
			const items: TRow[] = [
				{
					id: '1',
					columns: [
						'30 nov 2020, 06:01 AM',
						faker.string.sample(),
						<Container key="1">
							<Icon icon="Info" color="primary" />
						</Container>,
						faker.lorem.sentence()
					],
					onClick: jest.fn(),
					clickable: true
				},
				{
					id: '2',
					columns: [
						'31 nov 2020, 06:01 AM',
						faker.string.sample(),
						<Container key="2">
							<Icon icon="AlertCircle" color="error" />
						</Container>,
						faker.lorem.sentence()
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

			expect(screen.getByRole('table')).toBeVisible();
			// headers are visible
			expect(screen.getByText('Date')).toBeVisible();
			expect(screen.getByText('Server')).toBeVisible();
			expect(screen.getByText('Type')).toBeVisible();
			expect(screen.getByText('Object')).toBeVisible();
			// rows are visible
			expect(screen.getByText(items[0].columns[0] as string)).toBeVisible();
			expect(screen.getByText(items[0].columns[1] as string)).toBeVisible();
			expect(screen.getByTestId('icon: Info')).toBeVisible();
			expect(screen.getByText(items[0].columns[3] as string)).toBeVisible();
			expect(screen.getByText(items[1].columns[0] as string)).toBeVisible();
			expect(screen.getByText(items[1].columns[1] as string)).toBeVisible();
			expect(screen.getByTestId('icon: AlertCircle')).toBeVisible();
			expect(screen.getByText(items[1].columns[3] as string)).toBeVisible();
		});

		test('When all rows are selected, Click on the header checkbox does not immediately update the selection, but calls onSelectionChange with an empty array of ids', async () => {
			const headers: THeader[] = [
				{ id: 'col1', label: 'header 1' },
				{ id: 'col2', label: 'header 2' }
			];
			const rows: TRow[] = [
				{ id: 'row1', columns: ['row1col1', 'row1col2'] },
				{ id: 'row2', columns: ['row2col1', 'row2col2'] },
				{ id: 'row3', columns: ['row3col1', 'row3col2'] }
			];

			const onSelectionChangeFn = jest.fn();
			render(
				<Table
					headers={headers}
					rows={rows}
					onSelectionChange={onSelectionChangeFn}
					selectedRows={rows.map((row) => row.id)}
				/>
			);

			const headerRow = screen
				.getAllByRole('row')
				.find((row) => within(row).queryByText('header 1') !== null) as HTMLElement;
			expect(headerRow).toBeDefined();
			expect(screen.getAllByTestId(ICONS.checkboxOn)).toHaveLength(4);
			userEvent.click(within(headerRow).getByTestId(ICONS.checkboxOn));
			expect(onSelectionChangeFn).toHaveBeenCalled();
			expect(onSelectionChangeFn).toHaveBeenCalledWith([]);
			expect(screen.getAllByTestId(ICONS.checkboxOn)).toHaveLength(4);
			expect(screen.queryByTestId(ICONS.checkboxOff)).not.toBeInTheDocument();
		});

		test('When not all rows are selected, click on the header checkbox does not immediately update the selection, but calls onSelectionChange with the id of all rows', async () => {
			const headers: THeader[] = [
				{ id: 'col1', label: 'header 1' },
				{ id: 'col2', label: 'header 2' }
			];
			const rows: TRow[] = [
				{ id: 'row1', columns: ['row1col1', 'row1col2'] },
				{ id: 'row2', columns: ['row2col1', 'row2col2'] },
				{ id: 'row3', columns: ['row3col1', 'row3col2'] }
			];

			const onSelectionChangeFn = jest.fn();
			render(
				<Table
					headers={headers}
					rows={rows}
					onSelectionChange={onSelectionChangeFn}
					selectedRows={[]}
				/>
			);

			userEvent.hover(screen.getByText('header 1'));
			await screen.findByTestId(ICONS.checkboxOff);
			expect(screen.getByTestId(ICONS.checkboxOff)).toBeVisible();
			userEvent.click(screen.getByTestId(ICONS.checkboxOff));
			expect(onSelectionChangeFn).toHaveBeenCalled();
			expect(onSelectionChangeFn).toHaveBeenCalledWith(rows.map((row) => row.id));
			expect(screen.getByTestId(ICONS.checkboxOff)).toBeVisible();
			expect(screen.queryByTestId(ICONS.checkboxOn)).not.toBeInTheDocument();
		});

		test('Click on a checkbox of a not selected row calls onSelectionChange with the row id. The new selection is not shown', async () => {
			const headers: THeader[] = [
				{ id: 'col1', label: 'header 1' },
				{ id: 'col2', label: 'header 2' }
			];
			const rows: TRow[] = [
				{ id: 'row1', columns: ['row1col1', 'row1col2'] },
				{ id: 'row2', columns: ['row2col1', 'row2col2'] },
				{ id: 'row3', columns: ['row3col1', 'row3col2'] }
			];

			const selectedRows = [rows[2].id];
			const onSelectionChangeFn = jest.fn();
			render(
				<Table
					headers={headers}
					rows={rows}
					onSelectionChange={onSelectionChangeFn}
					selectedRows={selectedRows}
				/>
			);
			expect(screen.getByTestId(ICONS.checkboxOn)).toBeVisible();
			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(3);
			userEvent.click(screen.getAllByTestId(ICONS.checkboxOff)[1]);
			expect(onSelectionChangeFn).toHaveBeenCalled();
			expect(onSelectionChangeFn).toHaveBeenCalledWith([rows[2].id, rows[0].id]);
			// value of checkboxes is not changed
			expect(screen.getByTestId(ICONS.checkboxOn)).toBeVisible();
			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(3);
		});

		test('Click on a checkbox of a selected row calls onSelectionChange without the row id. The new selection is not shown', async () => {
			const headers: THeader[] = [
				{ id: 'col1', label: 'header 1' },
				{ id: 'col2', label: 'header 2' }
			];
			const rows: TRow[] = [
				{ id: 'row1', columns: ['row1col1', 'row1col2'] },
				{ id: 'row2', columns: ['row2col1', 'row2col2'] },
				{ id: 'row3', columns: ['row3col1', 'row3col2'] }
			];

			const selectedRows = [rows[0].id, rows[2].id];
			const onSelectionChangeFn = jest.fn();
			render(
				<Table
					headers={headers}
					rows={rows}
					onSelectionChange={onSelectionChangeFn}
					selectedRows={selectedRows}
				/>
			);
			expect(screen.getAllByTestId(ICONS.checkboxOn)).toHaveLength(2);
			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(2);
			userEvent.click(screen.getAllByTestId(ICONS.checkboxOn)[0]);
			expect(onSelectionChangeFn).toHaveBeenCalled();
			expect(onSelectionChangeFn).toHaveBeenCalledWith([rows[2].id]);
			// value of checkboxes is not changed
			expect(screen.getAllByTestId(ICONS.checkboxOn)).toHaveLength(2);
			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(2);
		});

		test('Selection is updated when the prop changes', async () => {
			const headers: THeader[] = [
				{ id: 'col1', label: 'header 1' },
				{ id: 'col2', label: 'header 2' }
			];
			const rows: TRow[] = [
				{ id: 'row1', columns: ['row1col1', 'row1col2'] },
				{ id: 'row2', columns: ['row2col1', 'row2col2'] },
				{ id: 'row3', columns: ['row3col1', 'row3col2'] }
			];

			const selectedRows = [rows[2].id];
			const onSelectionChangeFn = jest.fn();
			const { rerender } = render(
				<Table
					headers={headers}
					rows={rows}
					onSelectionChange={onSelectionChangeFn}
					selectedRows={selectedRows}
				/>
			);

			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(3);
			expect(screen.getByTestId(ICONS.checkboxOn)).toBeVisible();

			rerender(
				<Table
					headers={headers}
					rows={rows}
					onSelectionChange={onSelectionChangeFn}
					selectedRows={[...selectedRows, rows[0].id]}
				/>
			);

			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(2);
			expect(screen.getAllByTestId(ICONS.checkboxOn)).toHaveLength(2);
			expect(onSelectionChangeFn).not.toHaveBeenCalled();
		});

		test('Checkboxes are visible if the selection is not empty', async () => {
			const headers: THeader[] = [
				{ id: 'col1', label: 'header 1' },
				{ id: 'col2', label: 'header 2' }
			];
			const rows: TRow[] = [
				{ id: 'row1', columns: ['row1col1', 'row1col2'] },
				{ id: 'row2', columns: ['row2col1', 'row2col2'] },
				{ id: 'row3', columns: ['row3col1', 'row3col2'] }
			];

			const selectedRows = [rows[2].id];
			const onSelectionChangeFn = jest.fn();
			render(
				<Table
					headers={headers}
					rows={rows}
					onSelectionChange={onSelectionChangeFn}
					selectedRows={selectedRows}
				/>
			);

			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(3);
			expect(screen.getByTestId(ICONS.checkboxOn)).toBeVisible();
		});

		test('If multiselect is disabled, the selection of a row calls onSelectionChange with only the new row id. The selection is not updated', async () => {
			const headers: THeader[] = [
				{ id: 'col1', label: 'header 1' },
				{ id: 'col2', label: 'header 2' }
			];
			const rows: TRow[] = [
				{ id: 'row1', columns: ['row1col1', 'row1col2'] },
				{ id: 'row2', columns: ['row2col1', 'row2col2'] },
				{ id: 'row3', columns: ['row3col1', 'row3col2'] }
			];

			const selectedRows: [string] | [] = [rows[2].id];
			const onSelectionChangeFn = jest.fn();
			render(
				<Table
					headers={headers}
					rows={rows}
					onSelectionChange={onSelectionChangeFn}
					selectedRows={selectedRows}
					multiSelect={false}
				/>
			);

			const row0 = screen
				.getAllByRole('row')
				.find(
					(row) => within(row).queryByText(rows[0].columns[0] as string) !== null
				) as HTMLElement;
			const row2 = screen
				.getAllByRole('row')
				.find(
					(row) => within(row).queryByText(rows[2].columns[0] as string) !== null
				) as HTMLElement;
			expect(screen.getByTestId(ICONS.checkboxOn)).toBeVisible();
			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(2);
			expect(within(row0).getByTestId(ICONS.checkboxOff)).toBeVisible();
			expect(within(row2).getByTestId(ICONS.checkboxOn)).toBeVisible();
			userEvent.click(within(row0).getByTestId(ICONS.checkboxOff));
			expect(onSelectionChangeFn).toHaveBeenCalledTimes(1);
			expect(onSelectionChangeFn).toHaveBeenCalledWith([rows[0].id]);
			expect(screen.getByTestId(ICONS.checkboxOn)).toBeVisible();
			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(2);
			expect(within(row0).getByTestId(ICONS.checkboxOff)).toBeVisible();
			expect(within(row2).getByTestId(ICONS.checkboxOn)).toBeVisible();
		});

		test('If multiselect is disabled, click on the selected calls onSelectionChange with an empty array of ids. The selection is not updated', async () => {
			const headers: THeader[] = [
				{ id: 'col1', label: 'header 1' },
				{ id: 'col2', label: 'header 2' }
			];
			const rows: TRow[] = [
				{ id: 'row1', columns: ['row1col1', 'row1col2'] },
				{ id: 'row2', columns: ['row2col1', 'row2col2'] },
				{ id: 'row3', columns: ['row3col1', 'row3col2'] }
			];

			const selectedRows: [string] | [] = [rows[2].id];
			const onSelectionChangeFn = jest.fn();
			render(
				<Table
					headers={headers}
					rows={rows}
					onSelectionChange={onSelectionChangeFn}
					selectedRows={selectedRows}
					multiSelect={false}
				/>
			);

			const row2 = screen
				.getAllByRole('row')
				.find(
					(row) => within(row).queryByText(rows[2].columns[0] as string) !== null
				) as HTMLElement;
			expect(screen.getByTestId(ICONS.checkboxOn)).toBeVisible();
			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(2);
			expect(within(row2).getByTestId(ICONS.checkboxOn)).toBeVisible();
			userEvent.click(within(row2).getByTestId(ICONS.checkboxOn));
			expect(onSelectionChangeFn).toHaveBeenCalledTimes(1);
			expect(onSelectionChangeFn).toHaveBeenCalledWith([]);
			expect(screen.getByTestId(ICONS.checkboxOn)).toBeVisible();
			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(2);
			expect(within(row2).getByTestId(ICONS.checkboxOn)).toBeVisible();
		});
	});
});
