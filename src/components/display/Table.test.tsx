/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { faker } from '@faker-js/faker';
import { act, screen, within } from '@testing-library/react';
import 'jest-styled-components';

import { THeader, Table, TRow, StyledCheckbox } from './Table';
import { setup } from '../../test-utils';
import { ICONS, SELECTORS } from '../../testUtils/constants';
import { Icon } from '../basic/icon/Icon';
import { Container } from '../layout/Container';

describe('Table', () => {
	function getRowByColumnLabel(label: string): HTMLElement {
		const row = screen
			.getAllByRole('row')
			.find((element) => within(element).queryByText(label) !== null);
		expect(row).toBeDefined();
		return row as HTMLElement;
	}

	// https://github.com/testing-library/react-testing-library/issues/1225
	// https://github.com/jsdom/jsdom/issues/3607
	// at the moment the pseudo class hover sets the state already to active, so we have to wait the release of the fix of jsdom
	test.failing('index of the array is shown by default', async () => {
		const headers: THeader[] = [
			{ id: 'col1', label: 'header 1' },
			{ id: 'col2', label: 'header 2' }
		];
		const rows: TRow[] = [
			{ id: 'row1', columns: ['row1col1', 'row1col2'] },
			{ id: 'row2', columns: ['row2col1', 'row2col2'] }
		];

		setup(
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

	test.failing('show the index provided in the row item when set', async () => {
		const headers: THeader[] = [
			{ id: 'col1', label: 'header 1' },
			{ id: 'col2', label: 'header 2' }
		];
		const rows: TRow[] = [
			{ id: 'row1', columns: ['row1col1', 'row1col2'], index: 90 },
			{ id: 'row2', columns: ['row2col1', 'row2col2'], index: 100 }
		];

		setup(
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

	test.failing('checkbox of the row should not be visible on render', () => {
		const headers: THeader[] = [
			{ id: 'col1', label: 'header 1' },
			{ id: 'col2', label: 'header 2' }
		];
		const rows: TRow[] = [{ id: 'row1', columns: ['row1col1', 'row1col2'] }];
		setup(
			<Table
				headers={headers}
				rows={rows}
				showCheckbox
				{...faker.helpers.arrayElement([{ selectedRows: [] }, { defaultSelection: [] }])}
			/>
		);
		const row1 = getRowByColumnLabel('row1col1');
		const row1Checkbox = within(row1).getByTestId(SELECTORS.checkbox);
		expect(row1Checkbox).toBeInTheDocument();
		expect(row1Checkbox).not.toBeVisible();
	});

	test('checkbox of the row should have display property set to block on focus', async () => {
		const headers: THeader[] = [
			{ id: 'col1', label: 'header 1' },
			{ id: 'col2', label: 'header 2' }
		];
		const rows: TRow[] = [{ id: 'row1', columns: ['row1col1', 'row1col2'] }];
		setup(
			<Table
				headers={headers}
				rows={rows}
				showCheckbox
				{...faker.helpers.arrayElement([{ selectedRows: [] }, { defaultSelection: [] }])}
			/>
		);
		const row1 = getRowByColumnLabel('row1col1');
		expect(row1).toHaveStyleRule('display', 'block', { modifier: `:focus ${StyledCheckbox}` });
	});

	test('checkbox of the row should have display property set to block on hover', () => {
		const headers: THeader[] = [
			{ id: 'col1', label: 'header 1' },
			{ id: 'col2', label: 'header 2' }
		];
		const rows: TRow[] = [{ id: 'row1', columns: ['row1col1', 'row1col2'] }];
		setup(
			<Table
				headers={headers}
				rows={rows}
				showCheckbox
				{...faker.helpers.arrayElement([{ selectedRows: [] }, { defaultSelection: [] }])}
			/>
		);
		const row1 = getRowByColumnLabel('row1col1');
		expect(row1).toHaveStyleRule('display', 'block', { modifier: `:hover ${StyledCheckbox}` });
	});

	test('If multi selection is disabled, checkbox to select all is not shown inside header', () => {
		const headers: THeader[] = [
			{ id: 'col1', label: 'header 1' },
			{ id: 'col2', label: 'header 2' }
		];
		const rows: TRow[] = [{ id: 'row1', columns: ['row1col1', 'row1col2'] }];
		setup(
			<Table
				headers={headers}
				rows={rows}
				showCheckbox
				selectedRows={faker.helpers.arrayElement([[], undefined])}
				multiSelect={false}
			/>
		);

		const headerRow = getRowByColumnLabel('header 1');
		expect(headerRow).toBeDefined();
		expect(within(headerRow).queryByTestId(SELECTORS.checkbox)).not.toBeInTheDocument();
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

			setup(<Table rows={items} headers={headers} />);

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
			const { user } = setup(<Table headers={headers} rows={rows} showCheckbox />);
			let checkboxes = screen.getAllByTestId(SELECTORS.checkbox);
			expect(checkboxes).toHaveLength(3);
			expect(checkboxes[0]).toHaveStyleRule('display', 'none');
			expect(checkboxes[1]).toHaveStyleRule('display', 'none');
			expect(checkboxes[2]).toHaveStyleRule('display', 'none');
			const row2 = getRowByColumnLabel('row2col1');
			await act(async () => {
				await user.click(within(row2).getByTestId(ICONS.checkboxOff));
			});
			await screen.findByTestId(ICONS.checkboxOn);
			// all checkboxes become visible through the display rule set to block
			checkboxes = screen.getAllByTestId(SELECTORS.checkbox);
			expect(checkboxes[0]).toHaveStyleRule('display', 'block');
			expect(checkboxes[1]).toHaveStyleRule('display', 'block');
			expect(checkboxes[2]).toHaveStyleRule('display', 'block');
			await act(async () => {
				await user.click(screen.getByTestId(ICONS.checkboxOn));
			});
			checkboxes = screen.getAllByTestId(SELECTORS.checkbox);
			expect(checkboxes[0]).toHaveStyleRule('display', 'none');
			expect(checkboxes[1]).toHaveStyleRule('display', 'none');
			expect(checkboxes[2]).toHaveStyleRule('display', 'none');
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
			const { user } = setup(<Table headers={headers} rows={rows} showCheckbox />);
			const headerRow = getRowByColumnLabel('header 1');
			expect(headerRow).toBeDefined();
			await act(async () => {
				await user.click(within(headerRow).getByTestId(ICONS.checkboxOff));
			});
			expect(screen.getAllByTestId(ICONS.checkboxOn)).toHaveLength(3);
			expect(screen.queryByTestId(ICONS.checkboxOff)).not.toBeInTheDocument();
			await act(async () => {
				await user.click(within(headerRow).getByTestId(ICONS.checkboxOn));
			});
			expect(screen.queryByTestId(ICONS.checkboxOn)).not.toBeInTheDocument();
			expect(screen.queryAllByTestId(ICONS.checkboxOff)).toHaveLength(3);
			const checkboxes = screen.getAllByTestId(SELECTORS.checkbox);
			expect(checkboxes[0]).toHaveStyleRule('display', 'none');
			expect(checkboxes[1]).toHaveStyleRule('display', 'none');
			expect(checkboxes[2]).toHaveStyleRule('display', 'none');
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
			setup(
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
			const { user } = setup(
				<Table
					headers={headers}
					rows={rows}
					onSelectionChange={onSelectionChangeFn}
					defaultSelection={defaultSelection}
				/>
			);
			expect(screen.getByTestId(ICONS.checkboxOn)).toBeVisible();
			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(3);
			await act(async () => {
				await user.click(screen.getAllByTestId(ICONS.checkboxOff)[1]);
			});
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
			const { user } = setup(
				<Table
					headers={headers}
					rows={rows}
					onSelectionChange={onSelectionChangeFn}
					defaultSelection={defaultSelection}
					multiSelect={false}
				/>
			);

			const row0 = getRowByColumnLabel(rows[0].columns[0] as string);
			const row2 = getRowByColumnLabel(rows[2].columns[0] as string);
			expect(within(row2).getByTestId(ICONS.checkboxOn)).toBeVisible();
			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(2);
			await act(async () => {
				await user.click(within(row0).getByTestId(ICONS.checkboxOff));
			});
			expect(within(row0).getByTestId(ICONS.checkboxOn)).toBeVisible();
			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(2);
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
			const { user } = setup(
				<Table
					headers={headers}
					rows={rows}
					onSelectionChange={onSelectionChangeFn}
					defaultSelection={defaultSelection}
					multiSelect={false}
				/>
			);

			const row2 = getRowByColumnLabel(rows[2].columns[0] as string);
			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(2);
			expect(within(row2).getByTestId(ICONS.checkboxOn)).toBeVisible();
			await act(async () => {
				await user.click(within(row2).getByTestId(ICONS.checkboxOn));
			});
			expect(screen.queryByTestId(ICONS.checkboxOn)).not.toBeInTheDocument();
			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(3);
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
			setup(
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
			const { user } = setup(
				<Table
					headers={headers}
					rows={rows}
					onSelectionChange={onSelectionChangeFn}
					selectedRows={rows.map((row) => row.id)}
				/>
			);

			const headerRow = getRowByColumnLabel('header 1');
			expect(headerRow).toBeDefined();
			expect(screen.getAllByTestId(ICONS.checkboxOn)).toHaveLength(4);
			await user.click(within(headerRow).getByTestId(ICONS.checkboxOn));
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
			const { user } = setup(
				<Table
					headers={headers}
					rows={rows}
					onSelectionChange={onSelectionChangeFn}
					selectedRows={[]}
				/>
			);

			const headerRow = getRowByColumnLabel('header 1');

			await user.click(within(headerRow).getByTestId(ICONS.checkboxOff));
			expect(onSelectionChangeFn).toHaveBeenCalled();
			expect(onSelectionChangeFn).toHaveBeenCalledWith(rows.map((row) => row.id));
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
			const { user } = setup(
				<Table
					headers={headers}
					rows={rows}
					onSelectionChange={onSelectionChangeFn}
					selectedRows={selectedRows}
				/>
			);
			expect(screen.getByTestId(ICONS.checkboxOn)).toBeVisible();
			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(3);
			await user.click(screen.getAllByTestId(ICONS.checkboxOff)[1]);
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
			const { user } = setup(
				<Table
					headers={headers}
					rows={rows}
					onSelectionChange={onSelectionChangeFn}
					selectedRows={selectedRows}
				/>
			);
			expect(screen.getAllByTestId(ICONS.checkboxOn)).toHaveLength(2);
			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(2);
			await user.click(screen.getAllByTestId(ICONS.checkboxOn)[0]);
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
			const { rerender } = setup(
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
			setup(
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
			const { user } = setup(
				<Table
					headers={headers}
					rows={rows}
					onSelectionChange={onSelectionChangeFn}
					selectedRows={selectedRows}
					multiSelect={false}
				/>
			);

			const row0 = getRowByColumnLabel(rows[0].columns[0] as string);
			const row2 = getRowByColumnLabel(rows[2].columns[0] as string);
			expect(within(row2).getByTestId(ICONS.checkboxOn)).toBeVisible();
			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(2);
			await user.click(within(row0).getByTestId(ICONS.checkboxOff));
			expect(onSelectionChangeFn).toHaveBeenCalledTimes(1);
			expect(onSelectionChangeFn).toHaveBeenCalledWith([rows[0].id]);
			expect(within(row2).getByTestId(ICONS.checkboxOn)).toBeVisible();
			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(2);
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
			const { user } = setup(
				<Table
					headers={headers}
					rows={rows}
					onSelectionChange={onSelectionChangeFn}
					selectedRows={selectedRows}
					multiSelect={false}
				/>
			);

			const row2 = getRowByColumnLabel(rows[2].columns[0] as string);
			expect(screen.getByTestId(ICONS.checkboxOn)).toBeVisible();
			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(2);
			expect(within(row2).getByTestId(ICONS.checkboxOn)).toBeVisible();
			await user.click(within(row2).getByTestId(ICONS.checkboxOn));
			expect(onSelectionChangeFn).toHaveBeenCalledTimes(1);
			expect(onSelectionChangeFn).toHaveBeenCalledWith([]);
			expect(screen.getByTestId(ICONS.checkboxOn)).toBeVisible();
			expect(screen.getAllByTestId(ICONS.checkboxOff)).toHaveLength(2);
			expect(within(row2).getByTestId(ICONS.checkboxOn)).toBeVisible();
		});
	});
});
