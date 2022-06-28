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
import { filter, map, slice, isEmpty, debounce, find, trim, reduce, uniq } from 'lodash';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { IconButton } from './IconButton';
import { ThemeObj } from '../../theme/theme';
import { Chip, ChipProps } from '../display/Chip';
import { Dropdown, DropdownItem } from '../display/Dropdown';
import { Text, TextProps } from '../basic/Text';
import { useKeyboard, getKeyboardPreset, KeyboardPreset } from '../../hooks/useKeyboard';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { getColor, pseudoClasses } from '../../theme/theme-utils';
import { Container, ContainerProps } from '../layout/Container';
import { Icon } from '../basic/Icon';
import { Divider, DividerProps } from '../layout/Divider';

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
			: pseudoClasses(theme, background)};
	padding: ${({ $hasLabel }): string => ($hasLabel ? '1px' : '10px')} 12px;
	gap: 8px;
	min-height: calc(
		${({ theme }): string => theme.sizes.font.medium} * 1.5 +
			${({ theme }): string => theme.sizes.font.extrasmall} * 1.5 + 2px
	);
	border-radius: 2px 2px 0 0;
`;

const ScrollContainer = styled.div<{
	wrap: 'nowrap' | 'wrap';
	hasLabel: boolean;
	maxHeight: string;
}>`
	display: flex;
	flex: 1 1 auto;
	justify-content: flex-start;
	align-items: center;
	width: auto;
	gap: 8px;
	/* handle horizontal scroll for chip overflowing */
	flex-wrap: ${({ wrap }): string => wrap};
	overflow-x: auto;
	overflow-x: overlay;
	-ms-overflow-style: ${({ wrap }): string =>
		wrap === 'wrap' ? 'auto' : 'none'}; /* IE and Edge */
	scrollbar-width: ${({ wrap }): string => (wrap === 'wrap' ? 'auto' : 'none')}; /* Firefox */

	&::-webkit-scrollbar {
		display: ${({ wrap }): string => (wrap === 'wrap' ? 'auto' : 'none')};
	}
	margin-top: ${({ hasLabel, theme }): SimpleInterpolation =>
		hasLabel ? css`calc(${theme.sizes.font.extrasmall} * 1.5)` : '0px'};
	max-height: ${({ maxHeight }): string => maxHeight};
	overflow-y: scroll;
`;

const InputEl = styled.input<{ color: keyof ThemeObj['palette'] }>`
	border: none !important;
	height: auto !important;
	width: 1em;
	outline: 0;
	background: transparent !important;
	font-size: ${({ theme }): string => theme.sizes.font.medium};
	font-weight: ${({ theme }): number => theme.fonts.weight.regular};
	font-family: ${({ theme }): string => theme.fonts.default};
	color: ${({ theme, color }): string => getColor(color, theme)};

	&:disabled {
		color: ${({ theme, color }): string => getColor(`${color}.disabled`, theme)};
		pointer-events: none;
	}

	transition: background 0.2s ease-out;
	line-height: 1.5;
	padding: 0;
	min-width: 1em;
	overflow-wrap: break-word;
	max-width: 100%;

	&::placeholder {
		color: transparent;
	}
`;

const HiddenSpan = styled.span`
	position: absolute;
	height: 0;
	overflow: hidden;
	white-space: pre;
`;

const InputContainer = styled.div`
	position: relative;
	flex: 1 1 auto;
	overflow-wrap: break-word;
	max-width: 100%;
`;

/**
 * Adapt input width on typing
 *
 * By default, input html element has a fixed width and the content inside is hidden when overflowing,
 * but still reachable moving the caret. To avoid this behaviour and have instead an input which
 * extends its width on typing, a hidden span is used to set expand the width of the input container dynamically.
 * In order to accomplish this, the span is positioned over the input, but with height 0 and its content is set through
 * a listener (resizeInput), that keeps the span content synchronized with the input value.
 * Then, input receives its scroll width, which contains always the full content.
 *
 */
const AdjustWidthInput = React.forwardRef<
	HTMLInputElement,
	{
		color: keyof ThemeObj['palette'];
		separators: string[];
		confirmChipOnBlur: boolean;
	} & InputHTMLAttributes<HTMLInputElement>
>(function AdjustWidthInputFn({ confirmChipOnBlur, ...inputProps }, ref) {
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
			<HiddenSpan ref={hiddenSpanRef} />
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
		top: 1px;
		transform: translateY(0);
		font-size: ${({ theme }): string => theme.sizes.font.extrasmall};
	}

	${({ hasItems, theme }): SimpleInterpolation =>
		hasItems &&
		css`
			top: 1px;
			transform: translateY(0);
			font-size: ${theme.sizes.font.extrasmall};
		`};
`;

const CustomIconContainer = styled.span`
	align-self: center;
`;

const DividerEl = styled(Divider)`
	&:disabled {
		color: ${({ theme, color }): string => getColor(`${color}.disabled`, theme)};
	}
`;

const CustomText = styled(Text)<{
	$backgroundColor?: string;
	size: NonNullable<TextProps['size']>;
}>`
	line-height: 1.5;
	padding-top: 4px;
	min-height: calc(${({ theme, size }): string => theme.sizes.font[size]} * 1.5);
	background-color: ${({ $backgroundColor, theme }): string | undefined =>
		$backgroundColor && getColor($backgroundColor, theme)};
`;

const CustomIcon = styled(({ onClick, iconColor, ...rest }) =>
	onClick ? (
		<IconButton onClick={onClick} iconColor={iconColor} {...rest} />
	) : (
		<Icon color={iconColor} {...rest} />
	)
)`
	padding: 2px;
	${({ onClick }): SimpleInterpolation =>
		!onClick &&
		css`
			width: 20px;
			height: 20px;
		`};
`;

function reducer(
	state: ChipItem[],
	action:
		| { type: 'push' | 'replace'; item: ChipItem }
		| { type: 'pop'; index: number }
		| { type: 'popLast' }
		| { type: 'reset'; value: ChipItem[] | undefined }
		| { type: 'pushMultiples'; items: ChipItem[] }
): ChipItem[] {
	switch (action.type) {
		case 'push':
			return [...state, action.item];
		case 'pushMultiples':
			return [...state, ...action.items];
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

type ChipItem = { label?: string } & ChipProps & {
		value?: unknown;
	};

interface ChipInputProps extends Omit<ContainerProps, 'defaultValue' | 'onChange'> {
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
	errorLabel?: string | undefined;
	/** Background color for the error status */
	errorBackgroundColor?: keyof ThemeObj['palette'];
	/** Set the limit for chip inputs <br />
	 * <strong>Warning</strong>: be aware that this check is performed only on internal changes on items.
	 * If you change the value from outside, you are in charge of apply this check on the new value itself.
	 */
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
	/** Icon color */
	iconColor?: string | keyof ThemeObj['palette'];
	/** select single replaceable value from options */
	singleSelection?: boolean;
	/** hide the input's bottom border */
	hideBorder?: boolean;
	/** disable the input (but not the dropdown, use disableOptions for this) */
	disabled?: boolean;
	/**
	 * Allow entering unique chips only <br />
	 * <strong>Warning</strong>: be aware that this check is performed only on internal changes on items.
	 * If you change the value from outside, you are in charge of apply this check on the new value itself.
	 */
	requireUniqueChips?: boolean;
	/** Input divider color */
	bottomBorderColor?: DividerProps['color'];
	/** Dropdown max height */
	dropdownMaxHeight?: string;
	/** Description for the input */
	description?: string | undefined;
	/** Custom Chip component */
	ChipComponent?: React.ComponentType<ChipItem>;
	/** allow to create chips from pasted values */
	createChipOnPaste?: boolean;
	/** Chip generation triggers on paste */
	pasteSeparators?: string[];
	/** Strategy on chips overflow */
	wrap?: 'nowrap' | 'wrap';
	/** maxHeight of Input in case of no horizontal scroll */
	maxHeight?: string;
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
		iconColor,
		disabled = false,
		requireUniqueChips = false,
		createChipOnPaste = false,
		pasteSeparators = [','],
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
		ChipComponent,
		wrap = 'wrap',
		maxHeight = '130px',
		...rest
	},
	ref
) {
	const [items, dispatch] = useReducer(reducer, defaultValue || value || []);
	const [isActive, setIsActive] = useState(false);
	const inputElRef = useCombinedRefs<HTMLInputElement>(inputRef);
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);
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

	const savePastedValue = useCallback(
		(valueToSave: string[]) => {
			const pastedItems = map(valueToSave, (vts) => onAdd(vts));
			uncontrolledMode && dispatch({ type: 'pushMultiples', items: pastedItems });
			onChange && onChange([...items, ...pastedItems]);
		},
		[uncontrolledMode, onChange, items, onAdd]
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
		const scrollableElement = ev.currentTarget;
		if (
			scrollableElement &&
			scrollableElement instanceof HTMLElement &&
			// avoid to catch scroll if entire content is visible
			scrollableElement.scrollWidth > scrollableElement.clientWidth
		) {
			ev.preventDefault();
			scrollableElement.scrollLeft += ev.deltaY;
		}
	}, []);

	useEffect(() => {
		const wrapperElement = scrollContainerRef.current;
		wrapperElement && wrapperElement.addEventListener('wheel', flipScroll);
		return () => {
			wrapperElement && wrapperElement.removeEventListener('wheel', flipScroll);
		};
	}, [flipScroll, scrollContainerRef]);

	useEffect(() => {
		/*
		 * Scroll to end of horizontal scrollable container when items change and when
		 * scrollAfterSave is true, so that the last chip is fully visible and also the input.
		 * This is done with an effect to be sure both keyboard and blur events trigger this
		 * calc with the final dimensions of the container
		 */
		if (scrollAfterSaveRef.current && scrollContainerRef.current) {
			// scroll to the end so the newly added chip is fully shown
			scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
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

	const onPaste = useCallback<React.ClipboardEventHandler>(
		(e) => {
			if (createChipOnPaste) {
				e.preventDefault();
				const pastedText = e.clipboardData.getData('Text');
				const separatorsRegex = new RegExp(pasteSeparators.join('|'), 'gi');
				const reducedChips = reduce<string, string[]>(
					pastedText.split(separatorsRegex),
					(acc, v) => {
						if (trim(v) !== '') acc.push(trim(v));
						return acc;
					},
					[]
				);
				savePastedValue(requireUniqueChips ? uniq(reducedChips) : reducedChips);
			}
		},
		[createChipOnPaste, pasteSeparators, requireUniqueChips, savePastedValue]
	);

	const ChipComp = useMemo(() => ChipComponent || Chip, [ChipComponent]);

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
					<ScrollContainer
						ref={scrollContainerRef}
						wrap={wrap}
						maxHeight={maxHeight}
						hasLabel={!!placeholder}
					>
						{items.length > 0 &&
							map(items, (item, index) => (
								<ChipComp
									key={`${index}-${item.value}`}
									maxWidth={(wrap === 'wrap' && '100%') || undefined}
									{...item}
									closable
									onClose={(): void => onChipClose(index)}
								/>
							))}
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
							onPaste={onPaste}
						/>
						{placeholder && (
							<Label
								htmlFor={id}
								hasFocus={hasFocus}
								hasError={hasError}
								disabled={disabled && dropdownDisabled && (!iconAction || iconDisabled)}
								hasItems={items.length > 0 || !!inputElRef.current?.value}
							>
								{placeholder}
							</Label>
						)}
					</ScrollContainer>
					{icon && (
						<CustomIconContainer>
							<CustomIcon
								icon={icon}
								onClick={iconAction}
								disabled={iconDisabled}
								iconColor={iconColor}
								size="large"
							/>
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
			{((hasError && errorLabel !== undefined) || description !== undefined) && (
				<CustomText
					size="extrasmall"
					color={(hasError && 'error') || (hasFocus && 'primary') || 'secondary'}
					disabled={disabled && dropdownDisabled && (!iconAction || iconDisabled)}
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

export { ChipInput, ChipInputProps, ChipItem };
