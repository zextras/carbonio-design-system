/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState, useMemo, useCallback, useReducer, useEffect, Reducer } from 'react';

import { some, isEmpty, isNil } from 'lodash';
import styled, { css, DefaultTheme, SimpleInterpolation } from 'styled-components';

import { getColor } from '../../theme/theme-utils';
import { Icon } from '../basic/Icon';
import { Text } from '../basic/Text';
import { Dropdown, DropdownProps } from '../display/Dropdown';
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

interface LabelFactoryProps {
	label: string | undefined;
	open: boolean;
	focus: boolean;
	background: string | keyof DefaultTheme['palette'];
	multiple: boolean;
	disabled: boolean;
	selected: SelectItem[];
}

const DefaultLabelFactory: React.VFC<LabelFactoryProps> = ({
	selected,
	label,
	open,
	focus,
	background,
	disabled
}) => {
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
			<Divider color={open || focus ? 'primary' : 'gray2'} />
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
type SelectReducerAction =
	| ({ multiple?: false; onChange: SingleSelectionOnChange; isControlled: boolean } & {
			type: typeof SELECT_ACTION.PUSH | typeof SELECT_ACTION.REMOVE | typeof SELECT_ACTION.SET;
			item: SelectItem;
	  })
	| ({ multiple: true; onChange: MultipleSelectionOnChange; isControlled: boolean } & (
			| { type: typeof SELECT_ACTION.SELECT_ALL; items: SelectItem[] }
			| { type: typeof SELECT_ACTION.RESET }
			| { type: typeof SELECT_ACTION.SET; items: SelectItem[] }
			| {
					type: typeof SELECT_ACTION.PUSH | typeof SELECT_ACTION.REMOVE;
					item: SelectItem;
			  }
	  ));

const initialValue = (value: SelectItem | SelectItem[] | undefined): SelectItem[] => {
	if (value) {
		if (Array.isArray(value)) {
			return value;
		}
		return [value];
	}
	return [];
};

function selectedReducer(state: SelectItem[], action: SelectReducerAction): SelectItem[] {
	if (action.type === SELECT_ACTION.SET) {
		if (action.multiple) {
			return action.items;
		}
		return [action.item];
	}
	if (!action.multiple) {
		const value = action.item ? [action.item] : [];
		action.onChange(action.item.value);
		return action.isControlled ? state : value;
	}
	switch (action.type) {
		case SELECT_ACTION.PUSH: {
			const value = [...state, { ...action.item }];
			action.onChange(value);
			return action.isControlled ? state : value;
		}
		case SELECT_ACTION.REMOVE: {
			const value = state.filter((obj) => obj.value !== action.item.value);
			action.onChange(value);
			return action.isControlled ? state : value;
		}
		case SELECT_ACTION.SELECT_ALL: {
			const value = action.items.filter((obj) => !obj.disabled);
			action.onChange(value);
			return action.isControlled ? state : value;
		}
		case SELECT_ACTION.RESET: {
			action.onChange([]);
			return action.isControlled ? state : [];
		}
		default:
			throw new Error();
	}
}
type SelectItem = {
	label: string;
	value: string;
	disabled?: boolean;
	customComponent?: React.ReactElement;
};

type SelectComponentProps = {
	label?: string;
	background?: string | keyof DefaultTheme['palette'];
	disabled?: boolean;
	items?: SelectItem[];
	/** Css display property of select */
	display?: 'block' | 'inline-block';
	/** Css width property of dropdown */
	dropdownWidth?: string;
	/** Css max-width property of dropdown */
	dropdownMaxWidth?: string;
	/** Css max-height property of dropdown */
	dropdownMaxHeight?: string;
	LabelFactory?: React.ComponentType<LabelFactoryProps>;
	i18nAllLabel?: string;
	/** Flag to disable the Portal implementation of dropdown */
	disablePortal?: boolean;
	/** Whether to show checkboxes */
	showCheckbox?: boolean;
} & (
	| UncontrolledMultipleSelection
	| ControlledMultipleSelection
	| UncontrolledSingleSelection
	| ControlledSingleSelection
);

type MultipleSelectionOnChange = (value: Array<SelectItem>) => void;

type SingleSelectionOnChange = (value: string | null) => void;

type UncontrolledMultipleSelection = {
	multiple: true;
	selection?: never;
	defaultSelection?: Array<SelectItem>;
	onChange: MultipleSelectionOnChange;
};

type ControlledMultipleSelection = {
	multiple: true;
	selection?: Array<SelectItem>;
	defaultSelection?: never;
	onChange: MultipleSelectionOnChange;
};

type UncontrolledSingleSelection = {
	multiple?: false;
	selection?: never;
	defaultSelection?: SelectItem;
	onChange: SingleSelectionOnChange;
};

type ControlledSingleSelection = {
	multiple?: false;
	selection?: SelectItem;
	defaultSelection?: never;
	onChange: SingleSelectionOnChange;
};

type SelectProps = SelectComponentProps &
	Omit<DropdownProps, keyof SelectComponentProps | 'children'>;

const Select = React.forwardRef<HTMLDivElement, SelectProps>(function SelectFn(
	{
		background = 'gray5',
		disabled = false,
		items = [],
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
	},
	ref
) {
	const [selected, dispatchSelected] = useReducer<
		Reducer<SelectItem[], SelectReducerAction>,
		SelectItem[]
	>(selectedReducer, initialValue(defaultSelection ?? selection), (initial) => initial);
	const [open, setOpen] = useState(false);
	const [focus, setFocus] = useState(false);

	const isControlled = !isNil(selection);
	const clickItemHandler = useCallback(
		(item: SelectItem, isSelected: boolean) => (): void => {
			if (multiple && isSelected) {
				dispatchSelected({
					type: SELECT_ACTION.REMOVE,
					item,
					onChange: onChange as MultipleSelectionOnChange,
					multiple: true,
					isControlled
				});
			} else if (multiple) {
				dispatchSelected({
					type: SELECT_ACTION.PUSH,
					item,
					onChange: onChange as MultipleSelectionOnChange,
					multiple: true,
					isControlled
				});
			} else if (isEmpty(selected) || item.value !== selected[0].value) {
				dispatchSelected({
					type: SELECT_ACTION.PUSH,
					item,
					onChange: onChange as SingleSelectionOnChange,
					multiple: false,
					isControlled
				});
			}
		},
		[isControlled, multiple, onChange, selected]
	);

	const mappedItems = useMemo(
		() =>
			items.map((item, index) => {
				const isSelected = some(selected, { value: item.value });
				return {
					id: `${index}-${item.label}`,
					label: item.label,
					icon: (showCheckbox && ((isSelected && 'CheckmarkSquare') || 'Square')) || '',
					click: clickItemHandler(item, isSelected),
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
					onChange: onChange as MultipleSelectionOnChange,
					multiple: true,
					isControlled
				});
			} else {
				dispatchSelected({
					type: SELECT_ACTION.SELECT_ALL,
					items,
					onChange: onChange as MultipleSelectionOnChange,
					multiple: true,
					isControlled
				});
			}
		},
		[isControlled, items, onChange]
	);

	const multipleMappedItems = useMemo(() => {
		if (!multiple) return [];
		const selectableItems = items.filter((obj) => !obj.disabled);
		const isSelected = selected.length === selectableItems.length;
		return [
			{
				id: 'all',
				label: i18nAllLabel,
				icon: (showCheckbox && ((isSelected && 'CheckmarkSquare') || 'Square')) || '',
				click: toggleSelectAll(isSelected),
				selected: isSelected
			},
			...mappedItems
		];
	}, [multiple, items, selected.length, i18nAllLabel, showCheckbox, toggleSelectAll, mappedItems]);

	useEffect(() => {
		if (selection) {
			if (multiple && selection instanceof Array) {
				dispatchSelected({
					type: SELECT_ACTION.SET,
					items: selection,
					onChange: onChange as MultipleSelectionOnChange,
					multiple: true,
					isControlled
				});
			} else if (!multiple && !(selection instanceof Array)) {
				dispatchSelected({
					type: SELECT_ACTION.SET,
					item: selection as SelectItem,
					onChange: onChange as SingleSelectionOnChange,
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

export {
	Select,
	SelectProps,
	SelectItem,
	LabelFactoryProps,
	MultipleSelectionOnChange,
	SingleSelectionOnChange
};
