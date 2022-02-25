/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { filter, map, slice, isEmpty, debounce, find, trim } from 'lodash';
import styled from 'styled-components';
import Chip from '../display/Chip';
import Dropdown from '../display/Dropdown';
import Text from '../basic/Text';
import { useKeyboard, getKeyboardPreset } from '../../hooks/useKeyboard';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { getColor, getPadding } from '../../theme/theme-utils';
import Padding from '../layout/Padding';
import Container from '../layout/Container';
import Icon from '../basic/Icon';
import Row from '../layout/Row';
import Divider from '../layout/Divider';

const InputDiv = styled.div``;
const InputContainer = styled.div`
	flex-grow: 1;
	min-width: fit-content;
	max-width: 100%;
	font-family: 'Roboto', sans-serif;
	color: ${getColor('text')};
	overflow: hidden;

	> ${InputDiv} {
		text-overflow: unset;
		min-height: ${({ theme }) =>
			`calc(${theme.sizes.avatar.small.diameter} + ${theme.sizes.padding.extrasmall} * 2)`};
		font-size: ${({ theme }) => theme.sizes.font.medium};
		line-height: ${({ theme }) =>
			`calc(${theme.sizes.avatar.small.diameter} + ${theme.sizes.padding.extrasmall} * 2)`};

		&:focus {
			outline: none;
		}
	}
`;

const Placeholder = styled(Text)`
	position: absolute;
	top: 50%;
	left: ${getPadding('large')};
	transform: translateY(-50%);
	transition: transform 150ms ease-out, font-size 150ms ease-out, top 150ms ease-out;
	font-size: ${(props) => props.theme.sizes.font.medium};
	color: ${({ hasError }) => (hasError ? getColor('error') : getColor('secondary'))};
	user-select: none;

	${InputDiv}:focus + &,
	${InputDiv}:active + &,
	${InputDiv}:not(:empty) + &,
	${InputContainer}:not(:first-child) > & {
		top: ${getPadding('small')};
		transform: translateY(0);
		font-size: ${({ theme }) => theme.sizes.font.small};
	}
	${InputDiv}:focus + &,
	${InputDiv}:active + & {
		color: ${getColor('primary')};
	}
`;

const ChipInputContainer = styled.div`
	position: relative;
	width: 100%;
	padding: ${getPadding('extrasmall large')};
	background: ${({ theme, background }) => getColor(background, theme)};
	border-radius: ${({ theme }) => theme.borderRadius};
	border-bottom: ${({ hideBorder }) =>
		hideBorder
			? 'none'
			: `1px solid ${({ hasError }) => (hasError ? getColor('error') : getColor('gray4'))}}`};

	box-sizing: border-box;
	cursor: text;
`;

const StyledPadding = styled(Padding)`
	background: ${({ theme, errorBackgroundColor }) =>
		getColor(errorBackgroundColor || 'transparent', theme)};
`;

const ChipInputWrapper = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: nowrap;
	overflow-x: overlay;
	padding: ${({ theme }) => theme.sizes.avatar.small.diameter} 0 0;
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */

	> div {
		margin: calc(${getPadding('extrasmall')} / 2);
		margin-left: 0;
	}
	&::-webkit-scrollbar {
		display: none;
	}
`;

const StyledContainer = styled(Container)`
	border-bottom: ${({ theme, bottomBorderColor }) =>
		bottomBorderColor ? `1px solid ${theme.palette[bottomBorderColor].regular}` : null};
`;

function reducer(state, action) {
	switch (action.type) {
		case 'push':
			return [...state, action.item];
		case 'replace':
			return [action.item];
		case 'pop':
			return filter(state, (value, index) => action.index !== index);
		case 'popLast':
			return slice(state, 0, state.length - 1);
		case 'reset':
			return action.value;
		default:
			throw new Error();
	}
}

function DefaultOnAdd(valueToAdd) {
	return typeof valueToAdd === 'string'
		? { label: valueToAdd }
		: {
				...valueToAdd,
				label: valueToAdd.label || 'no label'
		  };
}

const ChipInput = React.forwardRef(function ChipInputFn(
	{
		inputRef,
		placeholder,

		value,
		defaultValue,
		onChange,

		options,
		onInputType,
		onInputTypeDebounce,

		onAdd,
		background,
		confirmChipOnBlur,
		confirmChipOnSpace,

		separators,
		icon,
		iconAction,
		disabled,

		requireUniqueChips,

		maxChips,
		hasError,
		hideBorder,
		errorLabel,
		errorBackgroundColor,
		disableOptions,
		singleSelction,
		dropdownTopBorderColor,
		bottomBorderColor,
		dropdownMaxHeight,

		...rest
	},
	ref
) {
	const [items, dispatch] = useReducer(reducer, defaultValue ?? value);
	const itemsRef = useRef(items);
	const [isActive, setIsActive] = useState(false);
	const innerRef = useRef(undefined);
	const contentEditableInput = useCombinedRefs(inputRef, innerRef);

	const [showDropdown, setShowDropdown] = useState(false);
	const [dropdownItems, setDropdownItems] = useState(options);
	const uncontrolledMode = useMemo(() => typeof value === 'undefined', [value]);

	const setFocus = useCallback(() => contentEditableInput.current.focus(), [contentEditableInput]);

	const saveValue = useCallback(
		(valueToSave) => {
			const trimmedValue = typeof valueToSave === 'string' ? trim(valueToSave) : valueToSave;

			const duplicate =
				requireUniqueChips &&
				find(items, {
					label: typeof trimmedValue === 'string' ? trimmedValue : trimmedValue.label
				});

			if (trimmedValue && !duplicate) {
				const item = onAdd(trimmedValue);
				uncontrolledMode && dispatch({ type: 'push', item });
				onChange && onChange([...itemsRef.current, item]);
			}
			contentEditableInput.current.innerHTML = '';
		},
		[contentEditableInput, onAdd, uncontrolledMode, onChange, items, requireUniqueChips]
	);

	const replaceValue = useCallback(
		(valueToSave) => {
			const item = onAdd(valueToSave);
			uncontrolledMode && dispatch({ type: 'replace', item });
			onChange && onChange([...itemsRef.current, item]);
			contentEditableInput.current.innerHTML = '';
		},
		[contentEditableInput, onAdd, uncontrolledMode, onChange]
	);
	const saveCurrentValue = useCallback(() => {
		const inputValue = contentEditableInput.current.textContent;
		inputValue.length && saveValue(inputValue);
	}, [contentEditableInput, saveValue]);

	const saveCurrentEvent = useMemo(() => {
		const events = getKeyboardPreset('chipInputKeys', saveCurrentValue, undefined, separators);
		if (confirmChipOnSpace) {
			events.push(...getKeyboardPreset('chipInputSpace', saveCurrentValue));
		}
		return events;
	}, [confirmChipOnSpace, saveCurrentValue, separators]);

	useKeyboard(contentEditableInput, saveCurrentEvent);

	const onBackspace = useCallback(
		(e) => {
			const cursorPosition = window.getSelection().getRangeAt(0).startOffset;
			if (cursorPosition === 0) {
				e.preventDefault();
				uncontrolledMode && dispatch({ type: 'popLast' });
				onChange && onChange(slice(itemsRef.current, 0, itemsRef.current.length - 1));
				return false;
			}
			return true;
		},
		[uncontrolledMode, onChange]
	);

	const backspaceEvent = useMemo(
		() => [
			{
				type: 'keydown',
				callback: onBackspace,
				keys: ['Backspace'],
				haveToPreventDefault: false
			}
		],
		[onBackspace]
	);

	useKeyboard(contentEditableInput, backspaceEvent);

	const onChipClose = useCallback(
		(index) => {
			uncontrolledMode && dispatch({ type: 'pop', index });
			onChange && onChange(filter(itemsRef.current, (item, i) => index !== i));
			contentEditableInput.current.focus();
		},
		[contentEditableInput, onChange, uncontrolledMode]
	);

	const onBlur = useCallback(() => {
		setIsActive(false);
		confirmChipOnBlur && !(options.length > 0) && saveCurrentValue();
	}, [confirmChipOnBlur, options, saveCurrentValue]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const onKeyUp = useCallback(
		debounce((ev) => {
			if (onInputType) {
				onInputType({
					...ev,
					textContent: contentEditableInput.current && contentEditableInput.current.textContent
				});
			}
		}, onInputTypeDebounce),
		[contentEditableInput, onInputType]
	);

	const onOptionClick = useCallback(
		(valueToAdd) => {
			singleSelction ? replaceValue(valueToAdd) : saveValue(valueToAdd);
			setFocus();
		},
		[saveValue, setFocus, singleSelction, replaceValue]
	);

	const onClose = useCallback(() => {
		setShowDropdown(false);
	}, []);

	useEffect(() => {
		!uncontrolledMode && dispatch({ type: 'reset', value });
	}, [uncontrolledMode, value]);

	useEffect(() => {
		setShowDropdown(!isEmpty(options));
	}, [options]);

	useEffect(() => {
		setDropdownItems(
			map(options, (o) => ({
				...o,
				click: () => {
					o.click && o.click();
					onOptionClick(o.value ? o.value : o.label);
				}
			}))
		);
	}, [onOptionClick, options]);

	useEffect(() => {
		itemsRef.current = items;
	}, [items]);

	const wrapperRef = useRef();
	useEffect(() => {
		const r = wrapperRef.current;
		const flipScroll = (ev) => {
			ev.preventDefault();
			r.scrollLeft += ev.deltaY;
		};
		if (r) {
			r.addEventListener('wheel', flipScroll);
		}
		return () => {
			if (r) {
				r.removeEventListener('wheel', flipScroll);
			}
		};
	}, [wrapperRef]);

	const disableEditable = useMemo(() => items.length < maxChips, [items, maxChips]);
	const dropdownDisabled = useMemo(
		() => disableOptions || !disableEditable,
		[disableOptions, disableEditable]
	);
	const hasFocus = useMemo(() => isActive && disableEditable, [isActive, disableEditable]);
	const contentEditable = useMemo(
		() => (disabled ? false : disableEditable),
		[disableEditable, disabled]
	);

	const dividerColor = useMemo(
		// eslint-disable-next-line no-nested-ternary
		() => (hasError ? 'error' : hasFocus ? 'primary' : 'gray5'),
		[hasError, hasFocus]
	);

	const onFocus = useCallback(() => setIsActive(true), []);
	return (
		<Container orientation="horizontal" background={background}>
			<Dropdown
				items={dropdownItems}
				display="block"
				width="100%"
				disableAutoFocus
				disableRestoreFocus
				forceOpen={showDropdown && dropdownDisabled}
				onClose={onClose}
				disabled={dropdownDisabled}
				maxHeight={dropdownMaxHeight}
			>
				<Container mainAlignment="flex-start" crossAlignment="baseline">
					<StyledContainer
						bottomBorderColor={bottomBorderColor}
						crossAlignment="baseline"
						mainAlignment="space-between"
						orientation="horizontal"
						width="100%"
					>
						<ChipInputContainer
							ref={ref}
							tabindex={0}
							width="100%"
							hideBorder={hideBorder}
							background={background}
							onClick={setFocus}
							hasError={hasError}
							{...rest}
						>
							<ChipInputWrapper ref={wrapperRef}>
								{map(items, (item, index) => (
									<Padding right="small" key={`p${index}-${item.value}`}>
										<Chip
											key={`${index}-${item.value}`}
											{...item}
											closable
											onClose={() => onChipClose(index)}
										/>
									</Padding>
								))}
								<InputContainer>
									<InputDiv
										ref={contentEditableInput}
										onBlur={onBlur}
										onFocus={onFocus}
										onKeyUp={onInputType && onKeyUp}
										contentEditable={contentEditable}
									/>
									<Placeholder hasError={hasError}>{placeholder}</Placeholder>
								</InputContainer>
							</ChipInputWrapper>
						</ChipInputContainer>

						{icon && (
							<Padding right="small">
								<Icon icon={icon} size="large" onClick={iconAction || (() => null)} />
							</Padding>
						)}
					</StyledContainer>
					<Divider color={dividerColor} />
					<Row padding={{ left: 'large' }} background="gray6">
						{hasError && (
							<StyledPadding
								width="100%"
								errorBackgroundColor={errorBackgroundColor}
								top="extrasmall"
							>
								<Text color="error" size="small">
									{errorLabel}
								</Text>
							</StyledPadding>
						)}
					</Row>
				</Container>
			</Dropdown>
		</Container>
	);
});

ChipInput.propTypes = {
	/** ref to the input element */
	inputRef: PropTypes.object,
	/** Input's Placeholder */
	placeholder: PropTypes.string,
	/** Input's value */
	value: PropTypes.arrayOf(PropTypes.object),
	/** Input's default value */
	defaultValue: PropTypes.arrayOf(PropTypes.object),
	/** Callback to call when Input's value changes */
	onChange: PropTypes.func,
	/** Dropdown items */
	options: Dropdown.propTypes.items,
	/** Callback to call when Input typing occurs
	 * - returns the keyup event object with an additional textContent value
	 * - the event is debounced using the debounce function from lodash */
	onInputType: PropTypes.func,
	/** Debounce value in ms to which debounce the 'onInputType' callback */
	onInputTypeDebounce: PropTypes.number,
	/** Callback to be called when a value is added in the Chip Input, should return the configuration for the Chip */
	onAdd: PropTypes.func,
	/** Set the current input text as a Chip when it loses focus */
	confirmChipOnBlur: PropTypes.bool,
	/** Set the current input text as a Chip when 'Space' is pressed */
	confirmChipOnSpace: PropTypes.bool,
	/** ChipInput backgroundColor */
	background: PropTypes.string,
	/** Chip generation triggers */
	separators: PropTypes.arrayOf(PropTypes.string),
	/** Show the error  */
	hasError: PropTypes.bool,
	/** Set the label for the error */
	errorLabel: PropTypes.string,
	/** Set the limit for chip inputs */
	maxChips: PropTypes.number,
	/** Show options to select values */
	disableOptions: PropTypes.bool,
	/** Icon on the right of dropdown */
	icon: PropTypes.string,
	/** Action on Icon click */
	iconAction: PropTypes.func,
	/** select single replacable value from options */
	singleSelction: PropTypes.bool,
	/** hide the input's bottom border */
	hideBorder: PropTypes.bool,
	/** disable the input */
	disabled: PropTypes.bool,
	/** allow to enter unique chips only */
	requireUniqueChips: PropTypes.bool
};

ChipInput.defaultProps = {
	background: 'gray6',
	confirmChipOnBlur: true,
	confirmChipOnSpace: true,
	options: [],
	onAdd: DefaultOnAdd,
	onInputTypeDebounce: 300,
	separators: ['Enter', 'NumpadEnter', 'Comma'],
	hasError: false,
	errorLabel: 'You have an error in the input',
	maxChips: 20,
	disableOptions: true,
	singleSelction: false,
	hideBorder: false,
	requireUniqueChips: false
};

export default ChipInput;
