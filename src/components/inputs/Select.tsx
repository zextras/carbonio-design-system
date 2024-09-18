/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState, useMemo, useCallback, useEffect } from 'react';

import styled, { css, SimpleInterpolation } from 'styled-components';

import { getColor } from '../../theme/theme-utils';
import { Icon } from '../basic/icon/Icon';
import { Text } from '../basic/text/Text';
import { INPUT_BACKGROUND_COLOR, INPUT_DIVIDER_COLOR } from '../constants';
import { Dropdown, DropdownItem, DropdownProps } from '../display/Dropdown';
import { Container } from '../layout/Container';
import { Divider } from '../layout/divider/Divider';
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
		() => selected.reduce<string[]>((arr, obj) => [...arr, obj.label], []).join(', '),
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
						$selected={selected.length > 0}
						size={selected.length > 0 ? 'small' : 'medium'}
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
	const initialState = defaultSelection ?? selection ?? [];
	const [selected, setSelected] = useState<SelectItem<T>[]>(
		Array.isArray(initialState) ? initialState : [initialState]
	);
	const [open, setOpen] = useState(false);
	const [focus, setFocus] = useState(false);

	const isControlled = selection !== undefined && selection !== null;

	const updateMultipleSelection = useCallback(
		(item: SelectItem<T>, isSelected: boolean) => {
			const newSelected = isSelected
				? selected.filter((obj) => obj.value !== item.value)
				: [...selected, item];
			if (!isControlled) {
				setSelected(newSelected);
			}
			(onChange as MultipleSelectionOnChange<T>)(newSelected);
		},
		[isControlled, onChange, selected]
	);

	const updateSingleSelection = useCallback(
		(item: SelectItem<T>) => {
			if (!isControlled) {
				setSelected(item.value ? [item] : []);
			}
			(onChange as SingleSelectionOnChange<T>)(item.value);
		},
		[isControlled, onChange]
	);

	const clickItemHandler = useCallback(
		(item: SelectItem<T>, isSelected: boolean) => (): void => {
			if (multiple) {
				updateMultipleSelection(item, isSelected);
			} else if (selected.length === 0 || item.value !== selected[0].value) {
				updateSingleSelection(item);
			}
		},
		[multiple, selected, updateMultipleSelection, updateSingleSelection]
	);

	const mappedItems = useMemo(
		() =>
			items.map((item, index): DropdownItem => {
				const isSelected = selected.some((s) => s.value === item.value);
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
				if (!isControlled) {
					setSelected([]);
				}
				(onChange as MultipleSelectionOnChange<T>)([]);
			} else {
				const newSelected = items.filter((obj) => !obj.disabled);
				if (!isControlled) {
					setSelected(newSelected);
				}
				(onChange as MultipleSelectionOnChange<T>)(newSelected);
			}
		},
		[isControlled, items, onChange]
	);

	const multipleMappedItems = useMemo((): DropdownItem[] => {
		if (!multiple) return [];
		const selectableItems = items.filter((obj) => !obj.disabled);
		const alreadySelected = selected.filter((obj) => !obj.disabled);
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
		if (isControlled) {
			if (multiple && selection instanceof Array) {
				setSelected(selection);
			} else if (!multiple && !(selection instanceof Array)) {
				setSelected([selection]);
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
