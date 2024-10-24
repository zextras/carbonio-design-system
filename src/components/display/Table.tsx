/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, {
	useEffect,
	useRef,
	useReducer,
	useCallback,
	useMemo,
	Reducer,
	HTMLAttributes
} from 'react';

import styled, { css } from 'styled-components';

import { NonEmptyArray, SingleItemArray } from '../../types/utils';
import { Icon } from '../basic/icon/Icon';
import { Text } from '../basic/text/Text';
import { Checkbox } from '../inputs/Checkbox';
import { MultipleSelectionOnChange, Select, SelectProps } from '../inputs/Select';
import { Container } from '../layout/Container';
import { Row } from '../layout/Row';

const StyledCheckbox = styled(Checkbox)<{
	$show: boolean;
}>`
	display: ${({ $show }): string => ($show ? 'block' : 'none')};
`;

const StyledText = styled(Text)``;

const StyledTr = styled.tr`
	&:hover,
	&:focus {
		${StyledCheckbox} {
			display: block;
		}
	}
`;

const TableRow = styled.tr<{
	$selected: boolean;
	$highlight?: boolean;
	$showCheckbox?: boolean;
	$clickable?: boolean;
}>`
	transition: background-color 0.2s ease-out;
	&:nth-child(odd) {
		background-color: ${({ theme }): string => theme.palette.gray6.regular};
		&:hover {
			background-color: ${({ theme }): string => theme.palette.gray6.hover};
		}
	}
	&:nth-child(even) {
		background-color: ${({ theme }): string => theme.palette.gray5.regular};
		&:hover {
			background-color: ${({ theme }): string => theme.palette.gray5.hover};
		}
	}
	${({ $selected, $highlight, theme }): ReturnType<typeof css> | false | undefined =>
		($selected || $highlight) &&
		css`
			background-color: ${theme.palette.highlight.regular} !important;
		`};
	${({ $clickable, $showCheckbox }): ReturnType<typeof css> | false =>
		($clickable === true || (typeof $clickable === 'undefined' && $showCheckbox === false)) &&
		css`
			cursor: pointer;
		`};
	&:hover,
	&:focus {
		${StyledCheckbox} {
			display: block;
		}
	}
	${({ $showCheckbox }): ReturnType<typeof css> | false | undefined =>
		$showCheckbox &&
		css`
			&:hover,
			&:focus {
				${StyledText} {
					display: none;
				}
			}
		`};
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
			background-color: ${({ theme }): string => theme.palette.gray3.regular};
		}
		th {
			position: sticky;
			top: 0;
		}
	}
	th,
	td {
		padding: 0 0.5rem;
		height: 1.875rem;
	}
`;

interface THeaderProps {
	headers: THeader[];
	onChange: () => void;
	allSelected: boolean;
	selectionMode: boolean;
	multiSelect: boolean;
	showCheckbox: boolean;
}

interface LabelFactoryProps {
	label?: string;
	open?: boolean;
	focus?: boolean;
	bold?: boolean;
}

const DefaultHeaderFactory = ({
	headers,
	onChange,
	allSelected,
	selectionMode,
	multiSelect,
	showCheckbox
}: THeaderProps): React.JSX.Element => {
	const trRef = useRef<HTMLTableRowElement>(null);

	const LabelFactory = useCallback(
		({ label, open, focus, bold }: LabelFactoryProps) => (
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

	const headerData = useMemo(
		() =>
			headers.map((column) => {
				const hasItems = column.items !== undefined && column.items.length > 0;
				return (
					<th key={column.id} align={column.align || 'left'}>
						{hasItems && (
							<Select
								label={column.label}
								multiple
								items={column.items}
								i18nAllLabel={column.i18nAllLabel || 'All'}
								dropdownWidth="auto"
								onChange={column.onChange}
								display={column.align ? 'inline-block' : 'block'}
								LabelFactory={(props): React.JSX.Element =>
									LabelFactory({ ...props, bold: column.bold })
								}
							/>
						)}
						{!hasItems && <Text weight={column.bold ? 'bold' : 'regular'}>{column.label}</Text>}
					</th>
				);
			}),
		[LabelFactory, headers]
	);

	return (
		<StyledTr ref={trRef}>
			<th align="center">
				{showCheckbox && multiSelect && (
					<StyledCheckbox
						size={'small'}
						value={allSelected}
						onClick={onChange}
						iconColor={selectionMode ? 'primary' : 'text'}
						$show={selectionMode}
					/>
				)}
			</th>
			{headerData}
		</StyledTr>
	);
};

interface TRowProps {
	index: number;
	row: TRow;
	onChange: (id: string) => void;
	selected: boolean;
	selectionMode: boolean;
	multiSelect: boolean;
	showCheckbox: boolean;
}

const DefaultRowFactory = ({
	index,
	row,
	onChange,
	selected,
	selectionMode,
	multiSelect,
	showCheckbox
}: TRowProps): React.JSX.Element => {
	const ckbRef = useRef<HTMLDivElement>(null);
	const trRef = useRef<HTMLTableRowElement>(null);
	const clickableRow = useMemo(
		() => (!showCheckbox && row.clickable === undefined) || row.clickable,
		[showCheckbox, row.clickable]
	);

	const _onChange = (): void => {
		!clickableRow && onChange(row.id);
	};

	const onClick = useCallback<React.ReactEventHandler>(
		(e) => {
			showCheckbox &&
				ckbRef.current &&
				e.target !== ckbRef.current &&
				!ckbRef.current.contains(e.target as Node | null) &&
				row.onClick &&
				row.onClick(e);
			clickableRow && onChange(row.id);
		},
		[row, onChange, clickableRow, showCheckbox]
	);

	const rowData = useMemo(
		() =>
			row.columns.map((column, i) => (
				<td key={i}>{typeof column === 'string' ? <Text>{column}</Text> : column}</td>
			)),
		[row.columns]
	);

	const displayBlockCheckbox = useMemo(
		() => selected || (selectionMode && multiSelect),
		[multiSelect, selected, selectionMode]
	);

	return (
		<TableRow
			ref={trRef}
			onClick={onClick}
			$selected={selected}
			$highlight={row.highlight}
			$clickable={row.clickable}
			$showCheckbox={showCheckbox}
		>
			<td>
				<Row mainAlignment={'center'}>
					{showCheckbox && (
						<StyledCheckbox
							ref={ckbRef}
							size={'small'}
							value={selected}
							onClick={_onChange}
							iconColor={displayBlockCheckbox ? 'primary' : 'text'}
							$show={displayBlockCheckbox}
						/>
					)}
					{(!showCheckbox || !displayBlockCheckbox) && <StyledText>{index}</StyledText>}
				</Row>
			</td>
			{rowData}
		</TableRow>
	);
};

const SELECT_ACTION = {
	TOGGLE: 'toggle',
	ADD_ALL: 'addAll',
	RESET: 'reset',
	SET: 'set'
} as const;

type SelectReducerAction =
	| { type: typeof SELECT_ACTION.TOGGLE; multiSelect: boolean; id: string }
	| { type: typeof SELECT_ACTION.ADD_ALL; rows: Array<{ id: string }> }
	| { type: typeof SELECT_ACTION.RESET }
	| { type: typeof SELECT_ACTION.SET; ids: string[] };

function selectedReducer(state: string[], action: SelectReducerAction): string[] {
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

type TRow = {
	id: string;
	/** Each column can be a string or a React component */
	columns: Array<string | React.ReactElement>;
	/** Whether to highlight this row */
	highlight?: boolean;
	/** Whether the row is clickable */
	clickable?: boolean;
	/** Row click callback */
	onClick?: React.ReactEventHandler;
	/** Index/counter of the row shown as first column when checkboxes are hidden */
	index?: number;
};

type THeader = {
	id: string;
	label: string;
	/** th align attribute */
	align?: React.ThHTMLAttributes<HTMLTableHeaderCellElement>['align'];
	/** th width attribute */
	width?: string;
	/** Select 'All' label translation */
	i18nAllLabel?: string;
	/** Whether the label should be bold */
	bold?: boolean;
} & (
	| {
			items?: never;
			onChange?: never;
	  }
	| {
			/** Items for the Select component of the header */
			items: NonEmptyArray<SelectProps['items'][number]>;
			/** De/Select all rows callback */
			onChange: MultipleSelectionOnChange;
	  }
);

type ControlledTableProps = {
	defaultSelection?: never;
} & (
	| {
			/** Array of the selected rows (Array of rows ids). To use only if you want the table to be in controlled mode. */
			selectedRows: SingleItemArray<string>;
			/** Whether multiple rows are selectable. */
			multiSelect: false;
	  }
	| {
			/** Array of the selected rows (Array of rows ids). To use only if you want the table to be in controlled mode. */
			selectedRows: string[];
			/** Whether multiple rows are selectable. */
			multiSelect?: true;
	  }
);

type UncontrolledTableProps = {
	selectedRows?: never;
} & (
	| {
			/** Row selected by default in the table (Array of rows ids). */
			defaultSelection?: SingleItemArray<string>;
			/** Whether multiple rows are selectable. */
			multiSelect: false;
	  }
	| {
			/** Row selected by default in the table (Array of rows ids). */
			defaultSelection?: string[];
			/** Whether multiple rows are selectable. */
			multiSelect?: true;
	  }
);

type TableProps = HTMLAttributes<HTMLDivElement> & {
	/** Table rows */
	rows?: TRow[];
	/** Table headers */
	headers?: THeader[];
	/** Whether the table should show checkboxes */
	showCheckbox?: boolean;
	/** Function to generate the single row */
	RowFactory?: React.ComponentType<TRowProps>;
	/** Function to generate the table head section */
	HeaderFactory?: React.ComponentType<THeaderProps>;
	/** Callback function, called when user changes selection of rows in table (in both controlled and uncontrolled mode). */
	onSelectionChange?: (ids: string[]) => void;
} & (ControlledTableProps | UncontrolledTableProps);

const Table = React.forwardRef<HTMLDivElement, TableProps>(function TableFn(
	{
		rows = [],
		headers = [],
		showCheckbox = true,
		RowFactory = DefaultRowFactory,
		HeaderFactory = DefaultHeaderFactory,
		onSelectionChange,
		defaultSelection,
		selectedRows,
		multiSelect = true,
		...rest
	},
	ref
) {
	const [selected, dispatchSelected] = useReducer<Reducer<string[], SelectReducerAction>>(
		selectedReducer,
		defaultSelection || selectedRows || []
	);

	const controlledMode = useMemo(() => selectedRows !== undefined, [selectedRows]);

	const controlledOnToggle = useCallback(
		(id: string) => {
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
		(id: string) => dispatchSelected({ type: SELECT_ACTION.TOGGLE, id, multiSelect }),
		[multiSelect]
	);

	const controlledOnToggleAll = useCallback(() => {
		if (onSelectionChange) {
			selected.length === rows.length
				? onSelectionChange([])
				: onSelectionChange([...rows.map((row) => row.id)]);
		}
	}, [selected, rows, onSelectionChange]);

	const uncontrolledOnToggleAll = useCallback(() => {
		selected.length === rows.length
			? dispatchSelected({ type: SELECT_ACTION.RESET })
			: dispatchSelected({ type: SELECT_ACTION.ADD_ALL, rows });
	}, [selected, rows]);

	const isFirstRun = useRef(true);

	useEffect(() => {
		if (!controlledMode) {
			if (!isFirstRun.current) {
				onSelectionChange && onSelectionChange(selected);
			} else {
				isFirstRun.current = false;
			}
		}
	}, [selected, controlledMode, onSelectionChange]);

	useEffect(() => {
		if (controlledMode) {
			if (!isFirstRun.current) {
				dispatchSelected({ type: SELECT_ACTION.SET, ids: selectedRows || [] });
			} else {
				isFirstRun.current = false;
			}
		}
	}, [controlledMode, selectedRows]);

	return (
		<TableContainer {...rest} ref={ref}>
			<StyledTable>
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
								index={row.index ?? index + 1}
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

export {
	Table,
	type TableProps,
	type THeader,
	type TRow,
	type THeaderProps,
	type TRowProps,
	DefaultRowFactory,
	DefaultHeaderFactory,
	// for test purpose only
	StyledCheckbox
};
