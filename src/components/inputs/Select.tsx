/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState, useMemo, useCallback, useReducer, useEffect, Reducer } from 'react';

import { some, isEmpty, isNil, filter, map } from 'lodash';
import styled, { css, SimpleInterpolation } from 'styled-components';

import { getColor } from '../../theme/theme-utils';
import { Icon } from '../basic/Icon';
import { Text } from '../basic/Text';
import { INPUT_BACKGROUND_COLOR, INPUT_DIVIDER_COLOR } from '../constants';
import { Dropdown, DropdownItem, DropdownProps } from '../display/Dropdown';
import { Container } from '../layout/Container';
import { Divider } from '../layout/Divider';
import { Padding } from '../layout/Padding';
import { Row } from '../layout/Row';

const Label = styled(Text)<{ $selected: boolean }>`
	position: absolute;
	top: ${({ $selected, theme }): string =>
		$selected ? `calc(${theme.sizes.padding.small} - 0.0625rem)` : '50%'};
	left: ${({ theme }): string => theme.sizes.padding.large};
	transform: translateY(${({ $selected }): string => ($selected ? '0' : '-50%')});
	transition: 150ms ease-out;
`;

const ContainerEl = styled(Container)<{ $focus: boolean }>`
	transition: background 0.2s ease-out;
	&:hover {
		background: ${({ theme, background }): string => getColor(`${background}.hover`, theme)};
	}
	${({ $focus, theme, background }): SimpleInterpolation =>
		$focus &&
		css`
			background: ${getColor(`${background}.focus`, theme)};
		`};
`;

const CustomText = styled(Text)`
	min-height: 1.167em;
`;

const CustomIcon = styled(Icon)`
	align-self: center;
	pointer-events: none;
`;

interface LabelFactoryProps<T = string> {
	label: string | undefined;
	open: boolean;
	focus: boolean;
	background: string;
	multiple: boolean;
	disabled: boolean;
	selected: SelectItem<T>[];
}

const DefaultLabelFactory = <T,>({
	selected,
	label,
	open,
	focus,
	background,
	disabled
}: LabelFactoryProps<T>): React.JSX.Element => {
	const selectedLabels = useMemo(
		() =>
			!isEmpty(selected) &&
			selected.reduce<string[]>((arr, obj) => [...arr, obj.label], []).join(', '),
		[selected]
	);

	return (
		<>
			<ContainerEl
				orientation="horizontal"
				width="fill"
				crossAlignment="flex-end"
				mainAlignment="space-between"
				borderRadius="half"
				padding={{
					horizontal: 'large',
					vertical: 'small'
				}}
				background={background}
				$focus={focus}
			>
				<Row takeAvailableSpace mainAlignment="unset">
					<Padding top="medium" width="100%">
						<CustomText size="medium" color={disabled ? 'secondary' : 'text'}>
							{selectedLabels}
						</CustomText>
					</Padding>
					<Label
						$selected={!isEmpty(selected)}
						size={!isEmpty(selected) ? 'small' : 'medium'}
						color={(disabled && 'gray2') || ((open || focus) && 'primary') || 'secondary'}
					>
						{label}
					</Label>
				</Row>
				<CustomIcon
					size="medium"
					icon={open ? 'ArrowUp' : 'ArrowDown'}
					color={(disabled && 'gray2') || ((open || focus) && 'primary') || 'secondary'}
				/>
			</ContainerEl>
			<Divider color={open || focus ? 'primary' : INPUT_DIVIDER_COLOR} />
		</>
	);
};

const TabContainer = styled(Container)`
	position: relative;
	cursor: pointer;

	&:focus {
		outline: none;
	}
`;

const SELECT_ACTION = {
	PUSH: 'push',
	REMOVE: 'remove',
	SELECT_ALL: 'selectAll',
	RESET: 'reset',
	SET: 'set'
} as const;

type MultipleSelectionReducerAction<T> = {
	multiple: true;
	onChange: MultipleSelectionOnChange<T>;
	isControlled: boolean;
} & (
	| { type: typeof SELECT_ACTION.SELECT_ALL; items: SelectItem<T>[] }
	| { type: typeof SELECT_ACTION.RESET }
	| { type: typeof SELECT_ACTION.SET; items: SelectItem<T>[] }
	| {
			type: typeof SELECT_ACTION.PUSH | typeof SELECT_ACTION.REMOVE;
			item: SelectItem<T>;
	  }
);

type SingleSelectionReducerAction<T> = {
	multiple?: false;
	onChange: SingleSelectionOnChange<T>;
	isControlled: boolean;
	type: typeof SELECT_ACTION.SET | typeof SELECT_ACTION.PUSH;
	item: SelectItem<T>;
};

type SelectReducerAction<T> = SingleSelectionReducerAction<T> | MultipleSelectionReducerAction<T>;

const initialValue = <T,>(value: SelectItem<T> | SelectItem<T>[] | undefined): SelectItem<T>[] => {
	if (value) {
		if (Array.isArray(value)) {
			return value;
		}
		return [value];
	}
	return [];
};

function singleSelectionReducer<T>(
	state: SelectItem<T>[],
	action: SingleSelectionReducerAction<T>
): SelectItem<T>[] {
	switch (action.type) {
		case SELECT_ACTION.SET:
			return [action.item];
		case SELECT_ACTION.PUSH:
			action.onChange(action.item.value);
			return (action.isControlled && state) || (action.item ? [action.item] : []);
		default:
			return state;
	}
}

function multipleSelectionReducer<T>(
	state: SelectItem<T>[],
	action: MultipleSelectionReducerAction<T>
): SelectItem<T>[] {
	switch (action.type) {
		case SELECT_ACTION.PUSH: {
			const value = [...state, { ...action.item }];
			action.onChange(value);
			return action.isControlled ? state : value;
		}
		case SELECT_ACTION.REMOVE: {
			const value = filter(state, (obj) => obj.value !== action.item.value);
			action.onChange(value);
			return action.isControlled ? state : value;
		}
		case SELECT_ACTION.SELECT_ALL: {
			const value = filter(action.items, (obj) => !obj.disabled);
			action.onChange(value);
			return action.isControlled ? state : value;
		}
		case SELECT_ACTION.RESET: {
			action.onChange([]);
			return action.isControlled ? state : [];
		}
		case SELECT_ACTION.SET: {
			return action.items;
		}
		default:
			throw new Error();
	}
}

function selectedReducer<T>(
	state: SelectItem<T>[],
	action: SelectReducerAction<T>
): SelectItem<T>[] {
	return action.multiple
		? multipleSelectionReducer(state, action)
		: singleSelectionReducer(state, action);
}
type SelectItem<T = string> = {
	label: string;
	value: T;
	disabled?: boolean;
	customComponent?: React.ReactElement;
};

type SelectComponentProps<T> = {
	label?: string;
	background?: string;
	disabled?: boolean;
	items: SelectItem<T>[];
	/** Css display property of select */
	display?: 'block' | 'inline-block';
	/** Css width property of dropdown */
	dropdownWidth?: string;
	/** Css max-width property of dropdown */
	dropdownMaxWidth?: string;
	/** Css max-height property of dropdown */
	dropdownMaxHeight?: string;
	LabelFactory?: React.ComponentType<LabelFactoryProps<T>>;
	i18nAllLabel?: string;
	/** Flag to disable the Portal implementation of dropdown */
	disablePortal?: boolean;
	/** Whether to show checkboxes */
	showCheckbox?: boolean;
} & (
	| UncontrolledMultipleSelection<T>
	| ControlledMultipleSelection<T>
	| UncontrolledSingleSelection<T>
	| ControlledSingleSelection<T>
);

type MultipleSelectionOnChange<T = string> = (value: Array<SelectItem<T>>) => void;

type SingleSelectionOnChange<T = string> = (value: T | null) => void;

type UncontrolledMultipleSelection<T> = {
	multiple: true;
	selection?: never;
	defaultSelection?: Array<SelectItem<T>>;
	onChange: MultipleSelectionOnChange<T>;
};

type ControlledMultipleSelection<T> = {
	multiple: true;
	selection: Array<SelectItem<T>>;
	defaultSelection?: never;
	onChange: MultipleSelectionOnChange<T>;
};

type UncontrolledSingleSelection<T> = {
	multiple?: false;
	selection?: never;
	defaultSelection?: SelectItem<T>;
	onChange: SingleSelectionOnChange<T>;
};

type ControlledSingleSelection<T> = {
	multiple?: false;
	selection: SelectItem<T>;
	defaultSelection?: never;
	onChange: SingleSelectionOnChange<T>;
};

type SelectProps<T = string> = SelectComponentProps<T> &
	Omit<DropdownProps, keyof SelectComponentProps<T> | 'children'>;

type SelectType = <T = string>(
	p: SelectProps<T> & React.RefAttributes<HTMLDivElement>
) => React.ReactElement | null;

/**
 * @visibleName Select
 */
const SelectComponent = React.forwardRef(function SelectFn<T = string>(
	{
		background = INPUT_BACKGROUND_COLOR,
		disabled = false,
		items,
		label,
		onChange,
		defaultSelection,
		multiple = false,
		i18nAllLabel = 'All',
		display = 'block',
		dropdownWidth = '100%',
		dropdownMaxWidth,
		dropdownMaxHeight,
		LabelFactory = DefaultLabelFactory,
		selection,
		disablePortal = false,
		showCheckbox = true,
		...rest
	}: SelectProps<T>,
	ref: React.ForwardedRef<HTMLDivElement>
): React.JSX.Element {
	const [selected, dispatchSelected] = useReducer<
		Reducer<SelectItem<T>[], SelectReducerAction<T>>,
		SelectItem<T>[]
	>(selectedReducer, initialValue(defaultSelection ?? selection), (initial) => initial);
	const [open, setOpen] = useState(false);
	const [focus, setFocus] = useState(false);

	const isControlled = !isNil(selection);
	const clickItemHandler = useCallback(
		(item: SelectItem<T>, isSelected: boolean) => (): void => {
			if (multiple && isSelected) {
				dispatchSelected({
					type: SELECT_ACTION.REMOVE,
					item,
					onChange: onChange as MultipleSelectionOnChange<T>,
					multiple: true,
					isControlled
				});
			} else if (multiple) {
				dispatchSelected({
					type: SELECT_ACTION.PUSH,
					item,
					onChange: onChange as MultipleSelectionOnChange<T>,
					multiple: true,
					isControlled
				});
			} else if (isEmpty(selected) || item.value !== selected[0].value) {
				dispatchSelected({
					type: SELECT_ACTION.PUSH,
					item,
					onChange: onChange as SingleSelectionOnChange<T>,
					multiple: false,
					isControlled
				});
			}
		},
		[isControlled, multiple, onChange, selected]
	);

	const mappedItems = useMemo(
		() =>
			map(items, (item, index): DropdownItem => {
				const isSelected = some(selected, { value: item.value });
				return {
					id: `${index}-${item.label}`,
					label: item.label,
					icon: (showCheckbox && ((isSelected && 'CheckmarkSquare') || 'Square')) || '',
					onClick: clickItemHandler(item, isSelected),
					selected: isSelected,
					disabled: item.disabled,
					customComponent: item.customComponent
				};
			}),
		[items, selected, showCheckbox, clickItemHandler]
	);

	const onOpen = useCallback(() => setOpen(true), []);
	const onClose = useCallback(() => setOpen(false), []);
	const onFocus = useCallback(() => setFocus(true), []);
	const onBlur = useCallback(() => setFocus(false), []);

	const toggleSelectAll = useCallback(
		(isSelected: boolean) => (): void => {
			if (isSelected) {
				dispatchSelected({
					type: SELECT_ACTION.RESET,
					onChange: onChange as MultipleSelectionOnChange<T>,
					multiple: true,
					isControlled
				});
			} else {
				dispatchSelected({
					type: SELECT_ACTION.SELECT_ALL,
					items,
					onChange: onChange as MultipleSelectionOnChange<T>,
					multiple: true,
					isControlled
				});
			}
		},
		[isControlled, items, onChange]
	);

	const multipleMappedItems = useMemo((): DropdownItem[] => {
		if (!multiple) return [];
		const selectableItems = filter(items, (obj) => !obj.disabled);
		const alreadySelected = filter(selected, (obj) => !obj.disabled);
		const isSelected = alreadySelected.length === selectableItems.length;
		return [
			{
				id: 'all',
				label: i18nAllLabel,
				icon: (showCheckbox && ((isSelected && 'CheckmarkSquare') || 'Square')) || '',
				onClick: toggleSelectAll(isSelected),
				selected: isSelected
			},
			...mappedItems
		];
	}, [multiple, items, selected, i18nAllLabel, showCheckbox, toggleSelectAll, mappedItems]);

	useEffect(() => {
		if (selection) {
			if (multiple && selection instanceof Array) {
				dispatchSelected({
					type: SELECT_ACTION.SET,
					items: selection,
					onChange: onChange as MultipleSelectionOnChange<T>,
					multiple: true,
					isControlled
				});
			} else if (!multiple && !(selection instanceof Array)) {
				dispatchSelected({
					type: SELECT_ACTION.SET,
					item: selection,
					onChange: onChange as SingleSelectionOnChange<T>,
					multiple: false,
					isControlled
				});
			}
		}
	}, [isControlled, multiple, onChange, selection]);

	return (
		<Dropdown
			display={display}
			width={dropdownWidth}
			maxWidth={dropdownMaxWidth}
			maxHeight={dropdownMaxHeight}
			items={multiple ? multipleMappedItems : mappedItems}
			handleTriggerEvents
			multiple={multiple}
			disabled={disabled}
			onOpen={onOpen}
			onClose={onClose}
			placement="bottom-end"
			disablePortal={disablePortal}
			{...rest}
		>
			<TabContainer ref={ref} onFocus={onFocus} onBlur={onBlur} tabIndex={0}>
				<LabelFactory
					label={label}
					open={open}
					focus={focus}
					background={background}
					multiple={multiple}
					disabled={disabled}
					selected={selected}
				/>
			</TabContainer>
		</Dropdown>
	);
});

// styleguidist is not able to parse the props if the cast is made directly on the component
const Select = SelectComponent as SelectType;

export {
	SelectComponent,
	Select,
	type SelectProps,
	type SelectItem,
	type LabelFactoryProps,
	type MultipleSelectionOnChange,
	type SingleSelectionOnChange
};
