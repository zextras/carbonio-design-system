/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, {
	InputHTMLAttributes,
	useCallback,
	useEffect,
	useMemo,
	useReducer,
	useRef,
	useState
} from 'react';
import { filter, map, slice, isEmpty, debounce, find, trim } from 'lodash';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { IconButton } from '../../index';
import { ThemeObj } from '../../theme/theme';
import Chip from '../display/Chip';
import Dropdown from '../display/Dropdown';
import Text from '../basic/Text';
import { useKeyboard, getKeyboardPreset, KeyboardPreset } from '../../hooks/useKeyboard';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { getColor } from '../../theme/theme-utils';
import Container from '../layout/Container';
import Icon from '../basic/Icon';
import Divider from '../layout/Divider';
import { pseudoClasses } from '../utilities/functions';

const ContainerEl = styled(Container)<{
	background: keyof ThemeObj['palette'];
	$hasLabel: boolean;
	$inputDisabled: boolean;
	$dropdownDisabled: boolean;
}>`
	cursor: ${({ $inputDisabled, $dropdownDisabled }): string | false => {
		if ($inputDisabled && !$dropdownDisabled) {
			return 'pointer';
		}
		if (!$inputDisabled) {
			return 'text';
		}
		return false;
	}};
	position: relative;
	${({ $inputDisabled, $dropdownDisabled, background, theme }): SimpleInterpolation =>
		$inputDisabled && $dropdownDisabled
			? css`
					background: ${getColor(`${background}.disabled`, theme)};
			  `
			: pseudoClasses(theme, background)}
	padding: ${({ $hasLabel }): string => ($hasLabel ? '2px' : '10px')} 12px;
	gap: 8px;
	min-height: calc(
		${({ theme }): string => theme.sizes.font.medium} * 1.5 +
			${({ theme }): string => theme.sizes.font.extrasmall} * 1.5 + 2px
	);
	border-radius: 2px 2px 0 0;
`;

const HorizontalScrollContainer = styled.div`
	display: flex;
	flex: 1 1 auto;
	gap: 8px;
	/* handle horizontal scroll for chip overflowing */
	flex-wrap: nowrap;
	overflow-x: auto;
	//noinspection CssInvalidPropertyValue
	overflow-x: overlay;
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */

	&::-webkit-scrollbar {
		display: none;
	}
`;

const InputEl = styled.input<{ color: keyof ThemeObj['palette'] }>`
	border: none !important;
	height: auto !important;
	width: 100%;
	outline: 0;
	background: transparent !important;
	font-size: ${({ theme }): string => theme.sizes.font.medium};
	font-weight: ${({ theme }): number => theme.fonts.weight.regular};
	font-family: ${({ theme }): string => theme.fonts.default};
	color: ${({ theme, color }): string => getColor(color, theme)};

	&:disabled {
		color: ${({ theme, color }): string => getColor(`${color}.disabled`, theme)};
	}

	transition: background 0.2s ease-out;
	line-height: 1.5;
	padding: 0;
	min-width: 1em;

	&::placeholder {
		color: transparent;
	}
`;

const HiddenSpan = styled.span<{ disabledAndClickable: boolean }>`
	position: absolute;
	height: ${({ disabledAndClickable }): string | number => (disabledAndClickable ? '100%' : 0)};
	width: ${({ disabledAndClickable }): string | false => disabledAndClickable && '100%'};
	overflow: hidden;
	white-space: pre;
`;

const InputContainer = styled.div`
	position: relative;
	width: 100%;
`;

/**
 * AdjustWidthInput has two goal:
 * 1) Adapt input width on typing
 * By default input html element has a fixed width and the content inside is hidden when overflowing,
 * but still reachable moving the caret. To avoid this behaviour and have instead an input which
 * extends its width on typing, a hidden span is used to set expand the width of the input container dynamically.
 * In order to accomplish this, the span is positioned over the input, but with height 0 and its content is set through
 * a listener (resizeInput), that keeps the span content synchronized with the input value.
 * Then, input receives its scroll width, which contains always the full content.
 *
 * 2) Fire onClick event even when input is disabled
 * Not all browsers fire events on a disabled input, but we need this to happen since disabled status for the input
 * does not mean the chip input is disabled (chip might be added with the dropdown). The hidden span in this case is used
 * to create a clickable layer over the input, so that mouse click is propagated and reach the dropdown
 *
 */
const AdjustWidthInput = React.forwardRef<
	HTMLInputElement,
	{
		color: keyof ThemeObj['palette'];
		separators: string[];
		confirmChipOnBlur: boolean;
		dropdownDisabled: boolean;
	} & InputHTMLAttributes<HTMLInputElement>
>(function AdjustWidthInputFn({ confirmChipOnBlur, dropdownDisabled, ...inputProps }, ref) {
	const hiddenSpanRef = useRef<HTMLSpanElement | null>(null);
	const inputRef = useCombinedRefs<HTMLInputElement>(ref);

	const resizeInput = useCallback(() => {
		if (inputRef.current && hiddenSpanRef.current) {
			// fill hidden span with a string with same length of value to get right width
			hiddenSpanRef.current.textContent = '#'.repeat(inputRef.current.value.length);
			inputRef.current.style.width = inputRef.current.value
				? `${inputRef.current.scrollWidth}px`
				: '';
		}
	}, [inputRef]);

	useEffect(() => {
		const inputElement = inputRef.current;
		if (inputElement) {
			inputElement.addEventListener('input', resizeInput);
			inputElement.addEventListener('change', resizeInput);
		}
		return (): void => {
			if (inputElement) {
				inputElement.removeEventListener('input', resizeInput);
				inputElement.removeEventListener('change', resizeInput);
			}
		};
	}, [confirmChipOnBlur, inputRef, resizeInput]);

	return (
		<InputContainer>
			<HiddenSpan
				ref={hiddenSpanRef}
				disabledAndClickable={!!inputProps.disabled && !dropdownDisabled}
			/>
			<InputEl {...inputProps} ref={inputRef} />
		</InputContainer>
	);
});

const Label = styled.label<{
	hasError: boolean;
	hasFocus: boolean;
	disabled: boolean;
	hasItems: boolean;
}>`
	position: absolute;
	top: 50%;
	left: 12px;
	font-size: ${({ theme }): string => theme.sizes.font.medium};
	font-weight: ${({ theme }): number => theme.fonts.weight.regular};
	font-family: ${({ theme }): string => theme.fonts.default};
	line-height: 1.5;
	color: ${({ theme, hasError, hasFocus, disabled }): string =>
		getColor(
			`${(hasError && 'error') || (hasFocus && 'primary') || 'secondary'}.${
				disabled ? 'disabled' : 'regular'
			}`,
			theme
		)};
	transform: translateY(-50%);
	transition: transform 150ms ease-out, font-size 150ms ease-out, top 150ms ease-out,
		left 150ms ease-out;
	pointer-events: none;
	user-select: none;
	max-width: calc(100% - ${({ theme }): string => `${theme.sizes.padding.large} * 2`});
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	${InputContainer}:focus-within + & {
		top: 2px;
		transform: translateY(0);
		font-size: ${({ theme }): string => theme.sizes.font.extrasmall};
	}

	${({ hasItems, theme }): SimpleInterpolation =>
		hasItems &&
		css`
			top: 2px;
			transform: translateY(0);
			font-size: ${theme.sizes.font.extrasmall};
		`}
`;

const CustomIconContainer = styled.span`
	align-self: center;
`;

const DividerEl = styled(Divider)`
	&:disabled {
		color: ${({ theme, color }): string => getColor(`${color}.disabled`, theme)};
	}
`;

const CustomText = styled(Text)<{ $backgroundColor?: string }>`
	line-height: 1.5;
	padding-top: 4px;
	background-color: ${({ $backgroundColor, theme }): string | undefined =>
		$backgroundColor && getColor($backgroundColor, theme)};
`;

const CustomIcon = styled(({ onClick, ...rest }) =>
	onClick ? <IconButton onClick={onClick} {...rest} /> : <Icon {...rest} />
)`
	padding: 2px;
	${({ onClick }): SimpleInterpolation =>
		onClick
			? css`
					& > svg {
						width: 20px;
						height: 20px;
						padding: 0;
					}
			  `
			: css`
					width: 20px;
					height: 20px;
			  `}
`;

const ChipsContainer = styled.div`
	display: flex;
	gap: 8px;
	justify-content: flex-start;
	width: auto;
`;

function reducer(
	state: ChipItem[],
	action:
		| { type: 'push' | 'replace'; item: ChipItem }
		| { type: 'pop'; index: number }
		| { type: 'popLast' }
		| { type: 'reset'; value: ChipItem[] | undefined }
): ChipItem[] {
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
			return action.value || [];
		default:
			throw new Error();
	}
}

function DefaultOnAdd(valueToAdd: unknown | string): { label: string } {
	if (typeof valueToAdd === 'string') {
		return { label: valueToAdd };
	}
	if (valueToAdd !== null && typeof valueToAdd === 'object') {
		return {
			label: 'no label',
			...valueToAdd // if valueToAdd has a label, spread will replace the default "no label"
		};
	}
	return { label: 'unknown value' };
}

type ChipItem = { label?: string } & React.ComponentPropsWithoutRef<typeof Chip> & {
		value?: unknown;
	};

type DropdownItem = React.ComponentPropsWithRef<typeof Dropdown>['items'][number];

interface ChipInputProps {
	/** ref to the input element */
	inputRef?: React.MutableRefObject<HTMLInputElement | null>;
	/** HTML input name */
	inputName?: string;
	/** Input Placeholder */
	placeholder?: string;
	/** ChipInput value */
	value?: ChipItem[];
	/** ChipInput default value */
	defaultValue?: ChipItem[];
	/** Callback to call when ChipInput's value changes */
	onChange?: (items: ChipItem[]) => void;
	/**
	 * Dropdown items.
	 * If disableOptions is true but options are provided, dropdown is still shown.
	 * To avoid dropdown to open at all, leave this prop empty
	 */
	options?: Array<DropdownItem & { value?: unknown }>;
	/**
	 * Callback to call when Input typing occurs
	 * - returns the keyup event object with an additional textContent value
	 * - the event is debounced using the debounce function from lodash
	 */
	onInputType?: (event: React.KeyboardEvent & { textContent: string | null }) => void;
	/** Debounce value in ms to which debounce the 'onInputType' callback */
	onInputTypeDebounce?: number;
	/** Callback called when a value is going to be added in the Chip Input, should return the configuration for the Chip */
	onAdd?: (value: string | unknown) => ChipItem;
	/** Set the current input text as a Chip when it loses focus */
	confirmChipOnBlur?: boolean;
	/**
	 * Set the current input text as a Chip when 'Space' is pressed
	 * @deprecated use separators prop instead
	 */
	confirmChipOnSpace?: boolean;
	/** ChipInput backgroundColor */
	background?: keyof ThemeObj['palette'];
	/** Chip generation triggers */
	separators?: string[];
	/** Show the error  */
	hasError?: boolean;
	/**
	 * Set the label for the error
	 * @deprecated use description instead
	 */
	errorLabel?: string;
	/** Background color for the error status */
	errorBackgroundColor?: keyof ThemeObj['palette'];
	/** Set the limit for chip inputs */
	maxChips?: number | null;
	/**
	 * Hide options to select values (on click).
	 * This prop does not prevent dropdown to open if options are
	 * provided. It only prevents it to open when clicking on the input.
	 * To avoid options to be shown at all, leave options empty
	 */
	disableOptions?: boolean;
	/** Icon on the right of the input */
	icon?: keyof ThemeObj['icons'];
	/** Action on Icon click */
	iconAction?: React.ReactEventHandler;
	/** Disable the icon */
	iconDisabled?: boolean;
	/** select single replaceable value from options */
	singleSelection?: boolean;
	/** hide the input's bottom border */
	hideBorder?: boolean;
	/** disable the input (but not the dropdown, use disableOptions for this) */
	disabled?: boolean;
	/** allow entering unique chips only */
	requireUniqueChips?: boolean;
	/** Input divider color */
	bottomBorderColor?: React.ComponentPropsWithRef<typeof Divider>['color'];
	/** Dropdown max height */
	dropdownMaxHeight?: string;
	/** Description for the input */
	description?: string;
	/** Custom Chip component */
	ChipComponent?: typeof Chip;
}

type ChipInput = React.ForwardRefExoticComponent<
	ChipInputProps & React.RefAttributes<HTMLDivElement>
> & {
	_newId?: number;
};

const ChipInput: ChipInput = React.forwardRef<HTMLDivElement, ChipInputProps>(function ChipInputFn(
	{
		inputRef = null,
		inputName,
		placeholder,
		value,
		defaultValue,
		onChange,
		options = [],
		onInputType,
		onInputTypeDebounce = 300,
		onAdd = DefaultOnAdd,
		background = 'gray6',
		confirmChipOnBlur = true,
		confirmChipOnSpace = true,
		separators = ['Enter', 'NumpadEnter', 'Comma', 'Space'],
		icon,
		iconAction,
		iconDisabled = false,
		disabled = false,
		requireUniqueChips = false,
		maxChips = 20,
		hasError = false,
		hideBorder = false,
		errorLabel,
		errorBackgroundColor,
		disableOptions = true,
		singleSelection = false,
		bottomBorderColor = 'gray4',
		dropdownMaxHeight,
		description,
		ChipComponent = Chip,
		...rest
	},
	ref
) {
	const [items, dispatch] = useReducer(reducer, defaultValue || value || []);
	const [isActive, setIsActive] = useState(false);
	const inputElRef = useCombinedRefs<HTMLInputElement>(inputRef);
	const hScrollContainerRef = useRef<HTMLDivElement | null>(null);
	const chipsContainerRef = useRef<HTMLDivElement | null>(null);
	const scrollAfterSaveRef = useRef(false);

	const [id] = useState(() => {
		if (!ChipInput._newId) {
			ChipInput._newId = 0;
		}
		// eslint-disable-next-line no-plusplus
		return `chipInput-${ChipInput._newId++}`;
	});

	const [forceShowDropdown, setForceShowDropdown] = useState(false);
	const [dropdownItems, setDropdownItems] = useState<DropdownItem[]>(options);

	const uncontrolledMode = useMemo(() => value === undefined, [value]);

	// TODO: remove together with confirmChipOnSpace
	const separatorKeys = useMemo(() => {
		const keys = [...separators];
		const index = keys.indexOf('Space');
		if (confirmChipOnSpace && index < 0) {
			keys.push('Space');
		} else if (!confirmChipOnSpace && index >= 0) {
			keys.splice(index, 1);
		}
		return keys;
	}, [confirmChipOnSpace, separators]);

	const setFocus = useCallback(() => {
		inputElRef.current && inputElRef.current.focus();
	}, [inputElRef]);

	const saveValue = useCallback(
		(valueToSave: string | unknown) => {
			const trimmedValue = typeof valueToSave === 'string' ? trim(valueToSave) : valueToSave;

			const duplicate =
				requireUniqueChips &&
				find(items, {
					label: trimmedValue
				});

			if (trimmedValue && !duplicate) {
				const item = onAdd(trimmedValue);
				uncontrolledMode && dispatch({ type: 'push', item });
				onChange && onChange([...items, item]);
				scrollAfterSaveRef.current = true;
			}
			if (inputElRef.current) {
				inputElRef.current.value = '';
				inputElRef.current.dispatchEvent(new Event('change'));
			}
		},
		[requireUniqueChips, items, inputElRef, onAdd, uncontrolledMode, onChange]
	);

	const replaceValue = useCallback(
		(valueToSave: string | unknown) => {
			const item = onAdd(valueToSave);
			uncontrolledMode && dispatch({ type: 'replace', item });
			onChange && onChange([...items, item]);
			if (inputElRef.current) {
				inputElRef.current.value = '';
				inputElRef.current.dispatchEvent(new Event('change'));
			}
		},
		[onAdd, uncontrolledMode, onChange, items, inputElRef]
	);

	const saveCurrentValue = useCallback(() => {
		const inputValue = inputElRef.current?.value || '';
		inputValue.length && saveValue(inputValue);
	}, [inputElRef, saveValue]);

	const saveCurrentEvent = useMemo(
		() => getKeyboardPreset('chipInputKeys', saveCurrentValue, undefined, separatorKeys),
		[saveCurrentValue, separatorKeys]
	);

	useKeyboard(inputElRef, saveCurrentEvent);

	const onBackspace = useCallback(
		(e: KeyboardEvent) => {
			const inputElement = e.currentTarget instanceof HTMLInputElement && e.currentTarget;
			if (
				inputElement &&
				inputElement.selectionStart === 0 &&
				inputElement.selectionStart === inputElement.selectionEnd
			) {
				e.preventDefault();
				uncontrolledMode && dispatch({ type: 'popLast' });
				onChange && onChange(slice(items, 0, items.length - 1));
				return false;
			}
			return true;
		},
		[uncontrolledMode, onChange, items]
	);

	const backspaceEvent = useMemo<KeyboardPreset>(
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

	useKeyboard(inputElRef, backspaceEvent);

	const onChipClose = useCallback(
		(index: number) => {
			uncontrolledMode && dispatch({ type: 'pop', index });
			onChange && onChange(filter(items, (item, i) => index !== i));
			if (inputElRef.current) {
				inputElRef.current.focus();
			}
		},
		[inputElRef, items, onChange, uncontrolledMode]
	);

	const onInputBlur = useCallback(() => {
		setIsActive(false);
		confirmChipOnBlur && options.length === 0 && saveCurrentValue();
	}, [confirmChipOnBlur, options, saveCurrentValue]);

	const onInputKeyUp = useMemo(
		() =>
			debounce((ev: React.KeyboardEvent) => {
				if (onInputType) {
					onInputType({
						...ev,
						textContent: inputElRef.current && inputElRef.current.value
					});
				}
			}, onInputTypeDebounce),
		[inputElRef, onInputType, onInputTypeDebounce]
	);

	const onOptionClick = useCallback(
		(valueToAdd: string | unknown) => {
			singleSelection ? replaceValue(valueToAdd) : saveValue(valueToAdd);
			setFocus();
		},
		[saveValue, setFocus, singleSelection, replaceValue]
	);

	const onClose = useCallback(() => {
		setForceShowDropdown(false);
	}, []);

	useEffect(() => {
		!uncontrolledMode && dispatch({ type: 'reset', value });
	}, [uncontrolledMode, value]);

	useEffect(() => {
		setDropdownItems((prevState) => {
			if (options.length === 0 && prevState.length === 0) {
				return prevState;
			}
			return map(options, (o) => ({
				...o,
				click: (event): void => {
					o.click && o.click(event);
					onOptionClick(o.value ? o.value : o.label);
				}
			}));
		});
	}, [onOptionClick, options]);

	// allow horizontal scroll without a scroll bar
	const flipScroll = useCallback<(e: WheelEvent) => void>((ev) => {
		ev.preventDefault();
		if (ev.currentTarget && ev.currentTarget instanceof HTMLElement) {
			const scrollableElement = ev.currentTarget;
			scrollableElement.scrollLeft += ev.deltaY;
		}
	}, []);

	useEffect(() => {
		const wrapperElement = hScrollContainerRef.current;
		wrapperElement && wrapperElement.addEventListener('wheel', flipScroll);
		return () => {
			wrapperElement && wrapperElement.removeEventListener('wheel', flipScroll);
		};
	}, [flipScroll, hScrollContainerRef]);

	useEffect(() => {
		/*
		 * Scroll to end of horizontal scrollable container when items change and when
		 * scrollAfterSave is true, so that the last chip is fully visible and also the input.
		 * This is done with an effect to be sure both keyboard and blur events trigger this
		 * calc with the final dimensions of the container
		 */
		if (scrollAfterSaveRef.current && hScrollContainerRef.current) {
			// scroll to the end so the newly added chip is fully shown
			hScrollContainerRef.current.scrollLeft = hScrollContainerRef.current.scrollWidth;
			scrollAfterSaveRef.current = false;
		}
	}, [items]);

	const inputDisabled = useMemo(
		() => !!maxChips && items.length >= maxChips,
		[items.length, maxChips]
	);

	// dropdown disabled does not depend on chipInput disabled, so that options can be still used
	// even if input is disabled (chip can be added through dropdown but not typing)
	const dropdownDisabled = useMemo(
		() => disableOptions || inputDisabled,
		[disableOptions, inputDisabled]
	);

	useEffect(() => {
		// if dropdown is set to not open on click (dropdownDisabled),
		// force open it on options change to simulate suggestion mode
		setForceShowDropdown(dropdownDisabled && !isEmpty(options));
	}, [dropdownDisabled, options]);

	const hasFocus = useMemo(() => isActive && !inputDisabled, [isActive, inputDisabled]);

	const onInputFocus = useCallback(() => setIsActive(true), []);

	return (
		<Container height="fit" width="fill" crossAlignment="flex-start">
			<Dropdown
				items={dropdownItems}
				display="block"
				width="100%"
				disableAutoFocus
				disableRestoreFocus
				forceOpen={forceShowDropdown}
				onClose={onClose}
				disabled={dropdownDisabled}
				maxHeight={dropdownMaxHeight}
			>
				<ContainerEl
					ref={ref}
					orientation="horizontal"
					width="fill"
					height="fit"
					mainAlignment="flex-start"
					crossAlignment={placeholder ? 'flex-end' : 'center'}
					borderRadius="half"
					background={background}
					$hasLabel={!!placeholder}
					$inputDisabled={disabled || inputDisabled}
					$dropdownDisabled={dropdownDisabled}
					onClick={setFocus}
					{...rest}
				>
					<HorizontalScrollContainer ref={hScrollContainerRef}>
						{items.length > 0 && (
							<ChipsContainer {...rest} ref={chipsContainerRef}>
								{map(items, (item, index) => (
									<ChipComponent
										key={`${index}-${item.value}`}
										{...item}
										closable
										onClose={(): void => onChipClose(index)}
									/>
								))}
							</ChipsContainer>
						)}
						<AdjustWidthInput
							color="text"
							autoComplete="off"
							ref={inputElRef}
							onFocus={onInputFocus}
							onBlur={onInputBlur}
							onKeyUp={onInputType && onInputKeyUp}
							id={id}
							name={inputName || placeholder}
							disabled={disabled || inputDisabled}
							placeholder={placeholder}
							separators={separatorKeys}
							confirmChipOnBlur={confirmChipOnBlur}
							dropdownDisabled={dropdownDisabled}
						/>
						{placeholder && (
							<Label
								htmlFor={id}
								hasFocus={hasFocus}
								hasError={hasError}
								disabled={disabled && dropdownDisabled}
								hasItems={items.length > 0 || !!inputElRef.current?.value}
							>
								{placeholder}
							</Label>
						)}
					</HorizontalScrollContainer>
					{icon && (
						<CustomIconContainer>
							<CustomIcon icon={icon} onClick={iconAction} disabled={iconDisabled} />
						</CustomIconContainer>
					)}
				</ContainerEl>
			</Dropdown>
			<DividerEl
				color={
					(hideBorder && 'transparent') ||
					(hasError && 'error') ||
					(hasFocus && 'primary') ||
					bottomBorderColor
				}
			/>
			{((hasError && errorLabel) || description) && (
				<CustomText
					size="extrasmall"
					color={(hasError && 'error') || (hasFocus && 'primary') || 'secondary'}
					disabled={disabled && dropdownDisabled}
					overflow="break-word"
					$backgroundColor={errorBackgroundColor}
				>
					{(hasError && errorLabel) || description}
				</CustomText>
			)}
		</Container>
	);
});

ChipInput._newId = 0;

export default ChipInput;