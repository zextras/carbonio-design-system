/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState, useMemo, useCallback, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { some, isEmpty } from 'lodash';
import Container from '../layout/Container';
import Divider from '../layout/Divider';
import Dropdown from '../display/Dropdown';
import Icon from '../basic/Icon';
import Padding from '../layout/Padding';
import Row from '../layout/Row';
import Text from '../basic/Text';
import { Theme } from '../../theme/theme';

const Label = styled(Text)`
	position: absolute;
	top: ${({ selected, theme }) => (selected ? `calc(${theme.sizes.padding.small} - 1px)` : '50%')};
	left: ${({ theme }) => theme.sizes.padding.large};
	transform: translateY(${({ selected }) => (selected ? '0' : '-50%')});
	transition: 150ms ease-out;
`;
const ContainerEl = styled(Container)`
	transition: background 0.2s ease-out;
	&:hover {
		background: ${(props) => props.theme.palette[props.background].hover};
	}
	${(props) =>
		props.focus &&
		css`
			background: ${props.theme.palette[props.background].focus};
		`}
`;
const TabContainer = styled(Container)`
	position: relative;
	cursor: pointer;

	&:focus {
		outline: none;
	}
`;

const DefaultLabelFactory = ({ selected, label, open, focus, background, disabled }) => (
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
			focus={focus}
		>
			<Row takeAvailableSpace mainAlignment="unset">
				<Padding top="medium" style={{ width: '100%' }}>
					<Text
						size="medium"
						style={{ minHeight: '1.167em' }}
						color={disabled ? 'secondary' : 'text'}
					>
						{!isEmpty(selected) &&
							selected.reduce((arr, obj) => [...arr, obj.label], []).join(', ')}
					</Text>
				</Padding>
				<Label
					selected={!isEmpty(selected)}
					size={!isEmpty(selected) ? 'small' : 'medium'}
					// eslint-disable-next-line no-nested-ternary
					color={disabled ? 'gray2' : open || focus ? 'primary' : 'secondary'}
				>
					{label}
				</Label>
			</Row>
			<Icon
				size="medium"
				icon={open ? 'ArrowUp' : 'ArrowDown'}
				// eslint-disable-next-line no-nested-ternary
				color={disabled ? 'gray2' : open || focus ? 'primary' : 'secondary'}
				style={{ alignSelf: 'center', pointerEvents: 'none' }}
			/>
		</ContainerEl>
		<Divider color={open || focus ? 'primary' : 'gray2'} />
	</>
);

const initialValue = (value, multiple) => (value ? (multiple ? value : [value]) : []);

function selectedReducer(state, action) {
	if (!action.multiple) {
		return action.item ? [action.item] : [];
	}
	switch (action.type) {
		case 'push': {
			return [...state, { ...action.item }];
		}
		case 'remove': {
			return state.filter((obj) => obj.value !== action.item.value);
		}
		case 'selectAll': {
			return [...action.items];
		}
		case 'reset': {
			return [];
		}
		case 'set': {
			return action.item;
		}
		default:
			throw new Error();
	}
}
const Select = React.forwardRef(function SelectFn(
	{
		background,
		disabled,
		items,
		label,
		onChange,
		defaultSelection,
		multiple,
		i18nAllLabel,
		display,
		dropdownWidth,
		dropdownMaxWidth,
		dropdownMaxHeight,
		LabelFactory,
		selection,
		disablePortal,
		showCheckbox,
		...rest
	},
	ref
) {
	const [selected, dispatchSelected] = useReducer(
		selectedReducer,
		initialValue(defaultSelection ?? selection, multiple)
	);
	const [open, setOpen] = useState(false);
	const [focus, setFocus] = useState(false);

	useEffect(() => {
		if (selection) {
			dispatchSelected({
				multiple,
				item: selection,
				type: 'set'
			});
		}
	}, [multiple, selection]);

	useEffect(() => {
		onChange?.(multiple ? selected : selected[0]?.value ?? null);
	}, [selected, onChange, multiple]);

	const mappedItems = useMemo(
		() =>
			items.map((item, index) => {
				const isSelected = some(selected, { value: item.value });
				return {
					id: `${index}-${item.label}`,
					label: item.label,
					icon: showCheckbox ? (isSelected ? 'CheckmarkSquare' : 'Square') : '',
					click: () => {
						if (multiple && isSelected) {
							dispatchSelected({
								type: 'remove',
								item,
								multiple
							});
						} else if (
							(!multiple && (isEmpty(selected) || item.value !== selected[0].value)) ||
							multiple
						) {
							dispatchSelected({
								type: 'push',
								item,
								multiple
							});
						}
					},
					selected: isSelected,
					disabled: item.disabled,
					customComponent: item.customComponent
				};
			}),
		[items, selected, multiple, showCheckbox]
	);

	const onOpen = useCallback(() => setOpen(true), []);
	const onClose = useCallback(() => setOpen(false), []);
	const onFocus = useCallback(() => setFocus(true), []);
	const onBlur = useCallback(() => setFocus(false), []);

	const multipleMappedItems = useMemo(() => {
		if (!multiple) return [];
		const isSelected = selected.length === items.length;
		return [
			{
				id: 'all',
				label: i18nAllLabel,
				icon: showCheckbox ? (isSelected ? 'CheckmarkSquare' : 'Square') : '',
				click: () => {
					dispatchSelected({
						type: isSelected ? 'reset' : 'selectAll',
						items,
						multiple
					});
				},
				selected: isSelected
			},
			...mappedItems
		];
	}, [multiple, selected.length, items, i18nAllLabel, mappedItems, showCheckbox]);

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
			<TabContainer ref={ref} onFocus={onFocus} onBlur={onBlur} tabIndex="0">
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

Select.propTypes = {
	label: PropTypes.string,
	background: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(Object.keys(Theme.palette))]),
	disabled: PropTypes.bool,
	items: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })),
	/** Initial selection value */
	defaultSelection: PropTypes.oneOfType([
		PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
		PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }))
	]),
	/** Selection value (controlled mode) */
	selection: PropTypes.oneOfType([
		PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
		PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }))
	]),
	onChange: PropTypes.func,
	/** Css display property of select */
	display: Dropdown.propTypes.display,
	/** Css width property of dropdown */
	dropdownWidth: Dropdown.propTypes.width,
	/** Css max-width property of dropdown */
	dropdownMaxWidth: Dropdown.propTypes.maxWidth,
	/** Css max-height property of dropdown */
	dropdownMaxHeight: Dropdown.propTypes.maxHeight,
	LabelFactory: PropTypes.func,
	multiple: PropTypes.bool,
	i18nAllLabel: PropTypes.string,
	/** Flag to disable the Portal implementation of dropdown */
	disablePortal: PropTypes.bool,
	/** Whether or not to show checkboxes */
	showCheckbox: PropTypes.bool
};

Select.defaultProps = {
	label: undefined,
	disabled: false,
	background: 'gray5',
	multiple: false,
	i18nAllLabel: 'All',
	display: 'block',
	dropdownWidth: '100%',
	LabelFactory: DefaultLabelFactory,
	items: [],
	defaultSelection: undefined,
	selection: undefined,
	onChange: undefined,
	dropdownMaxWidth: undefined,
	disablePortal: false,
	showCheckbox: true
};

export default Select;
