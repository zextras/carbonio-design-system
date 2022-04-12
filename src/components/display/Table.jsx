/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/* eslint-disable no-mixed-operators */
import React, { useState, useEffect, useRef, useReducer, useCallback, useMemo } from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Checkbox from '../inputs/Checkbox';
import Container from '../layout/Container';
import Icon from '../basic/Icon';
import { Select } from '../inputs/Select';
import Text from '../basic/Text';
import Row from '../layout/Row';

const TableRow = styled.tr`
	transition: background-color 0.2s ease-out;
	&:nth-child(odd) {
		background-color: ${(props) => props.theme.palette.gray6.regular};
		&:hover {
			background-color: ${(props) => props.theme.palette.gray6.hover};
		}
	}
	&:nth-child(even) {
		background-color: ${(props) => props.theme.palette.gray5.regular};
		&:hover {
			background-color: ${(props) => props.theme.palette.gray5.hover};
		}
	}
	${({ selected, highlight, theme }) =>
		(selected || highlight) &&
		css`
			background-color: ${theme.palette.highlight.regular} !important;
		`}
	${({ clickable, showCheckbox }) =>
		(clickable === true || (typeof clickable === 'undefined' && showCheckbox === false)) &&
		css`
			cursor: pointer;
		`}
`;
const TableContainer = styled.div`
	position: relative;
	display: block;
`;
const StyledTable = styled.table`
	border-collapse: collapse;
	table-layout: fixed;

	&,
	thead,
	tbody,
	tr {
		width: 100%;
	}

	thead {
		&,
		th {
			background-color: ${(props) => props.theme.palette.gray3.regular};
		}
		th {
			position: sticky;
			top: 0;
		}
	}
	th,
	td {
		padding: 0 8px;
	}
`;

const DefaultHeaderFactory = ({
	headers,
	onChange,
	allSelected,
	selectionMode,
	multiSelect,
	showCheckbox
}) => {
	const [showCkb, setShowCkb] = useState(false);
	const trRef = useRef();
	const LabelFactory = useCallback(
		({
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			selected,
			label,
			open,
			focus,
			bold
		}) => (
			<Container
				orientation="horizontal"
				width="fill"
				crossAlignment="center"
				mainAlignment="space-between"
				borderRadius="half"
				padding={{
					vertical: 'small'
				}}
			>
				<Row takeAvailableSpace mainAlignment="unset">
					<Text
						size="medium"
						weight={bold ? 'bold' : 'regular'}
						color={open || focus ? 'primary' : 'text'}
					>
						{label}
					</Text>
				</Row>
				<Icon
					size="medium"
					icon={open ? 'ChevronUpOutline' : 'ChevronDownOutline'}
					color={open || focus ? 'primary' : 'text'}
					style={{ alignSelf: 'center' }}
				/>
			</Container>
		),
		[]
	);
	/* eslint-disable consistent-return, no-inner-declarations */
	useEffect(() => {
		if (trRef && trRef.current && showCheckbox) {
			function displayCheckbox() {
				setShowCkb(true);
			}
			function hideCheckbox() {
				setShowCkb(false);
			}
			trRef.current.addEventListener('mouseenter', displayCheckbox);
			trRef.current.addEventListener('mouseleave', hideCheckbox);
			trRef.current.addEventListener('focus', displayCheckbox);
			trRef.current.addEventListener('blur', hideCheckbox);

			const refSave = trRef.current;
			return function cleanup() {
				refSave.removeEventListener('mouseenter', displayCheckbox);
				refSave.removeEventListener('mouseleave', hideCheckbox);
				refSave.removeEventListener('focus', displayCheckbox);
				refSave.removeEventListener('blur', hideCheckbox);
			};
		}
	}, [showCheckbox]);
	/* eslint-enable consistent-return, no-inner-declarations  */
	return (
		<tr ref={trRef}>
			<th width="30px" height="30px" align="center">
				{showCheckbox && multiSelect && (showCkb || selectionMode || allSelected) && (
					<Checkbox
						iconSize="medium"
						value={allSelected}
						onClick={onChange}
						iconColor={selectionMode ? 'primary' : 'text'}
					/>
				)}
			</th>
			{Object.keys(headers).map((column) => {
				const hasItems = !isEmpty(headers[column].items);
				return (
					<th
						key={headers[column].id}
						align={headers[column].align || 'left'}
						width={headers[column].width}
					>
						{hasItems && (
							<Select
								label={headers[column].label}
								multiple
								items={headers[column].items}
								i18nAllLabel={headers[column].i18nAllLabel || 'All'}
								dropdownWidth="auto"
								onChange={headers[column].onChange}
								display={headers[column].align ? 'inline-block' : 'block'}
								LabelFactory={(props) => LabelFactory({ ...props, bold: headers[column].bold })}
							/>
						)}
						{!hasItems && (
							<Text weight={headers[column].bold ? 'bold' : 'regular'}>
								{headers[column].label}
							</Text>
						)}
					</th>
				);
			})}
		</tr>
	);
};
const DefaultRowFactory = ({
	index,
	row,
	onChange,
	selected,
	selectionMode,
	multiSelect,
	showCheckbox
}) => {
	const ckbRef = useRef(undefined);
	const trRef = useRef();
	const [showCkb, setShowCkb] = useState(selected || selectionMode);
	const clickableRow = useMemo(
		() => (!showCheckbox && typeof row.clickable === 'undefined') || row.clickable,
		[showCheckbox, row.clickable]
	);
	const _onChange = () => !clickableRow && onChange(row.id);
	const onClick = useCallback(
		(e) => {
			showCheckbox &&
				e.target !== ckbRef.current &&
				!ckbRef.current.contains(e.target) &&
				row.onClick &&
				row.onClick(e);
			clickableRow && onChange(row.id);
		},
		[row, onChange, clickableRow, showCheckbox]
	);
	/* eslint-disable consistent-return, no-inner-declarations */
	useEffect(() => {
		if (trRef && trRef.current && showCheckbox === true) {
			function displayCheckbox() {
				setShowCkb(true);
			}
			function hideCheckbox() {
				setShowCkb(false);
			}
			trRef.current.addEventListener('mouseenter', displayCheckbox);
			trRef.current.addEventListener('mouseleave', hideCheckbox);
			trRef.current.addEventListener('focus', displayCheckbox);
			trRef.current.addEventListener('blur', hideCheckbox);

			const refSave = trRef.current;
			return function cleanup() {
				refSave.removeEventListener('mouseenter', displayCheckbox);
				refSave.removeEventListener('mouseleave', hideCheckbox);
				refSave.removeEventListener('focus', displayCheckbox);
				refSave.removeEventListener('blur', hideCheckbox);
			};
		}
	}, [showCheckbox]);
	/* eslint-enable consistent-return, no-inner-declarations */
	return (
		<TableRow
			ref={trRef}
			onClick={onClick}
			selected={selected}
			highlight={row.highlight}
			clickable={row.clickable}
			showCheckbox={showCheckbox}
		>
			<td width="30px" height="30px" align="center">
				{showCheckbox && (showCkb || selected || (multiSelect && selectionMode)) ? (
					<Checkbox
						ref={ckbRef}
						iconSize="medium"
						value={selected}
						onClick={_onChange}
						iconColor={(multiSelect && selectionMode) || selected ? 'primary' : 'text'}
					/>
				) : (
					<Text>{index}</Text>
				)}
			</td>
			{row.columns.map(
				// eslint-disable-next-line react/no-array-index-key
				(column, i) => (
					<td key={i}>{typeof column === 'string' ? <Text>{column}</Text> : column}</td>
				)
			)}
		</TableRow>
	);
};

function selectedReducer(state, action) {
	switch (action.type) {
		case 'toggle': {
			if (!action.multiSelect) {
				return state.includes(action.id) ? [] : [action.id];
			}
			return state.includes(action.id)
				? state.filter((id) => id !== action.id)
				: [...state, action.id];
		}
		case 'addAll': {
			return [...action.rows.map((row) => row.id)];
		}
		case 'reset': {
			return [];
		}
		case 'set': {
			return [...action.ids];
		}
		default: {
			return state;
		}
	}
}
const Table = React.forwardRef(function TableFn(
	{
		rows,
		headers,
		showCheckbox,
		RowFactory,
		HeaderFactory,
		onSelectionChange,
		defaultSelection,
		selectedRows,
		multiSelect,
		...rest
	},
	ref
) {
	const [selected, dispatchSelected] = useReducer(
		selectedReducer,
		defaultSelection || selectedRows || []
	);

	const controlledMode = useMemo(() => typeof selectedRows !== 'undefined', [selectedRows]);

	const controlledOnToggle = useCallback(
		(id) => {
			if (onSelectionChange) {
				if (multiSelect) {
					onSelectionChange(
						selected.includes(id) ? selected.filter((_id) => _id !== id) : [...selected, id]
					);
				} else {
					onSelectionChange(selected.includes(id) ? [] : [id]);
				}
			}
		},
		[onSelectionChange, selected, multiSelect]
	);
	const uncontrolledOnToggle = useCallback(
		(id) => dispatchSelected({ type: 'toggle', id, multiSelect }),
		[multiSelect]
	);

	const controlledOnToggleAll = useCallback(() => {
		selected.length === rows.length
			? onSelectionChange([])
			: onSelectionChange([...rows.map((row) => row.id)]);
	}, [selected, rows, onSelectionChange]);
	const uncontrolledOnToggleAll = useCallback(() => {
		selected.length === rows.length
			? dispatchSelected({ type: 'reset' })
			: dispatchSelected({ type: 'addAll', rows });
	}, [selected, rows]);

	const isFirstRun = useRef(true);
	useEffect(() => {
		if (!controlledMode) {
			!isFirstRun.current && onSelectionChange && onSelectionChange(selected);
			if (isFirstRun.current) isFirstRun.current = false;
		}
	}, [selected, controlledMode, onSelectionChange]);

	useEffect(() => {
		if (controlledMode) {
			!isFirstRun.current && dispatchSelected({ type: 'set', ids: selectedRows });
			if (isFirstRun.current) isFirstRun.current = false;
		}
	}, [controlledMode, selectedRows]);

	return (
		<TableContainer {...rest}>
			<StyledTable ref={ref}>
				<thead>
					<HeaderFactory
						headers={headers}
						onChange={controlledMode ? controlledOnToggleAll : uncontrolledOnToggleAll}
						allSelected={selected.length === rows.length}
						selectionMode={selected.length > 0}
						multiSelect={multiSelect}
						showCheckbox={showCheckbox}
					/>
				</thead>
				<tbody>
					{rows &&
						rows.map((row, index) => (
							<RowFactory
								key={row.id}
								index={index + 1}
								row={row}
								onChange={controlledMode ? controlledOnToggle : uncontrolledOnToggle}
								selected={selected.includes(row.id)}
								selectionMode={selected.length > 0}
								multiSelect={multiSelect}
								showCheckbox={showCheckbox}
							/>
						))}
				</tbody>
			</StyledTable>
		</TableContainer>
	);
});

Table.propTypes = {
	/** Table rows */
	rows: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			/** Each column can be a string or a React component */
			columns: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.element])),
			/** Whether or not to highlight this row */
			highlight: PropTypes.bool,
			/** Whether or not the row is clickable */
			clickable: PropTypes.bool,
			/** Row click callback */
			onClick: PropTypes.func
		})
	),
	/** Table headers */
	headers: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			/** th align attribute */
			align: PropTypes.string,
			/** th width attribute */
			width: PropTypes.string,
			/** Select 'All' label translation */
			i18nAllLabel: PropTypes.string,
			/** Select.propTypes.items */
			items: PropTypes.arrayOf(
				PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })
			),
			/** Whether or not label should be bold */
			bold: PropTypes.bool,
			/** De/Select all rows callback */
			onChange: PropTypes.func
		})
	),
	/** Whether or not the table should show checkboxes */
	showCheckbox: PropTypes.bool,
	/** Function to generate the single row */
	RowFactory: PropTypes.func,
	/** Function to generate the table head section */
	HeaderFactory: PropTypes.func,
	/** Callback function, called when user changes selection of rows in table. */
	onSelectionChange: PropTypes.func,
	/** Row selected by default in the table (Array of rows ids). */
	defaultSelection: PropTypes.arrayOf(PropTypes.string),
	/** Array of the selected rows (Array of rows ids). To use only if you want the table to be in controlled mode. */
	selectedRows: PropTypes.arrayOf(PropTypes.string),
	/** Whether or not multiple rows are selectable. */
	multiSelect: PropTypes.bool
};
Table.defaultProps = {
	rows: [],
	headers: [],
	showCheckbox: true,
	RowFactory: DefaultRowFactory,
	HeaderFactory: DefaultHeaderFactory,
	multiSelect: true,
	onSelectionChange: undefined,
	defaultSelection: undefined,
	selectedRows: undefined
};

export default Table;
