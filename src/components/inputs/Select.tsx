/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState, useMemo, useCallback, useReducer, useEffect, Reducer } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { some, isEmpty } from 'lodash';
import type { ThemeObj } from '../../theme/theme';
import { Container } from '../layout/Container';
import { Divider } from '../layout/Divider';
import { Dropdown, DropdownProps } from '../display/Dropdown';
import { Icon } from '../basic/Icon';
import { Padding } from '../layout/Padding';
import { Row } from '../layout/Row';
import { getColor } from '../../theme/theme-utils';
import { Text } from '../basic/Text';

const Label = styled(Text)<{ $selected: boolean }>`
	position: absolute;
	top: ${({ $selected, theme }): string =>
		$selected ? `calc(${theme.sizes.padding.small} - 1px)` : '50%'};
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
	background: string | keyof ThemeObj['palette'];
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
	| { multiple?: false; item: SelectItem }
	| ({ multiple: true } & (
			| { type: typeof SELECT_ACTION.PUSH | typeof SELECT_ACTION.REMOVE; item: SelectItem }
			| { type: typeof SELECT_ACTION.SELECT_ALL; items: SelectItem[] }
			| { type: typeof SELECT_ACTION.RESET }
			| { type: typeof SELECT_ACTION.SET; items: SelectItem[] }
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
	if (!action.multiple) {
		return action.item ? [action.item] : [];
	}
	switch (action.type) {
		case SELECT_ACTION.PUSH: {
			return [...state, { ...action.item }];
		}
		case SELECT_ACTION.REMOVE: {
			return state.filter((obj) => obj.value !== action.item.value);
		}
		case SELECT_ACTION.SELECT_ALL: {
			return [...action.items];
		}
		case SELECT_ACTION.RESET: {
			return [];
		}
		case SELECT_ACTION.SET: {
			return action.items;
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
	background?: string | keyof ThemeObj['palette'];
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
	onChange: (arg: SelectItem[] | string | null) => void;
} & (
	| {
			multiple: true;
			/** Initial selection value */
			defaultSelection?: SelectItem[];
			/** Selection value (controlled mode) */
			selection?: SelectItem[];
			onChange: (items: SelectItem[]) => void;
	  }
	| {
			multiple?: false;
			/** Initial selection value */
			defaultSelection?: SelectItem;
			/** Selection value (controlled mode) */
			selection?: SelectItem;
			onChange: (value: string | null) => void;
	  }
);

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

	useEffect(() => {
		if (selection) {
			if (multiple) {
				dispatchSelected({
					multiple: true,
					items: selection as SelectItem[],
					type: SELECT_ACTION.SET
				});
			} else {
				dispatchSelected({
					multiple: false,
					item: selection as SelectItem
				});
			}
		}
	}, [multiple, selection]);

	useEffect(() => {
		onChange?.(multiple ? selected : selected[0]?.value ?? null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected, multiple]);

	const clickItemHandler = useCallback(
		(item: SelectItem, isSelected: boolean) => (): void => {
			if (multiple && isSelected) {
				dispatchSelected({
					type: SELECT_ACTION.REMOVE,
					item,
					multiple: true
				});
			} else if (multiple) {
				dispatchSelected({
					type: SELECT_ACTION.PUSH,
					item,
					multiple: true
				});
			} else if (isEmpty(selected) || item.value !== selected[0].value) {
				dispatchSelected({
					type: SELECT_ACTION.PUSH,
					item,
					multiple: false
				});
			}
		},
		[multiple, selected]
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
					multiple: true
				});
			} else {
				dispatchSelected({
					type: SELECT_ACTION.SELECT_ALL,
					items,
					multiple: true
				});
			}
		},
		[items]
	);

	const multipleMappedItems = useMemo(() => {
		if (!multiple) return [];
		const isSelected = selected.length === items.length;
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
	}, [
		multiple,
		selected.length,
		items.length,
		i18nAllLabel,
		showCheckbox,
		toggleSelectAll,
		mappedItems
	]);

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

export { Select, SelectProps, SelectItem, LabelFactoryProps };
