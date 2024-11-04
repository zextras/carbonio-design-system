/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, {
	useCallback,
	useState,
	useEffect,
	useMemo,
	useRef,
	InputHTMLAttributes
} from 'react';

import { flip, limitShift, shift } from '@floating-ui/dom';
import DatePicker, {
	getDefaultLocale,
	DatePickerProps,
	registerLocale,
	setDefaultLocale
} from 'react-datepicker';

import styles from './DateTimePicker.module.css';
import { DateTimePickerChipInput, DateTimePickerChipInputProps } from './DateTimePickerChipInput';
import { DateTimePickerInput } from './DateTimePickerInput';
import { LiteralUnion, PaletteColor } from '../../../types/utils';
import { INPUT_BACKGROUND_COLOR } from '../../constants';
import { ChipProps } from '../../display/Chip';
import { Container } from '../../layout/Container';

import 'react-datepicker/dist/react-datepicker.min.css';

type OmitUnion<T, K extends keyof DatePickerProps> = T extends DatePickerProps ? Omit<T, K> : never;
type DateTimePickerProps = {
	/** Input's background color */
	backgroundColor?: PaletteColor;
	/** Label for input */
	label: string;
	/** input change callback */
	onChange?: (newValue: Date | null) => void;
	/** default value of the input */
	defaultValue?: Date | null;
	/** Whether the input has an error */
	hasError?: boolean;
	/** Error Message */
	errorLabel?: string;
	/** Use Chips to show selected value */
	enableChips?: boolean;
	/** Pass chip props */
	chipProps?: Partial<ChipProps>;
	/**
	 * Input width: <br/>
	 *  <li>`fit`: shorthand for fit-content</li>
	 *  <li>`fill`: semantic alternative for `100%`</li>
	 *  <li>number: measure in px</li>
	 *  <li>string: any measure in CSS syntax</li>
	 */
	width?: LiteralUnion<'fit' | 'fill', string> | number;
	/**
	 * Use a custom component instead of the default one.
	 * The component will be cloned by react-datepicker.
	 * See "With Custom Input" section for more details.
	 */
	CustomComponent?: React.ComponentType<{
		value?: string;
		onClick?: (e: React.SyntheticEvent | KeyboardEvent) => void;
	}>;
} & OmitUnion<DatePickerProps, 'selectsMultiple' | 'selectsRange' | 'onChange' | 'placeholderText'>;

interface DatePickerCustomInputProps
	extends Pick<
		InputHTMLAttributes<HTMLInputElement>,
		| 'value'
		| 'onBlur'
		| 'onChange'
		| 'onClick'
		| 'onFocus'
		| 'onKeyDown'
		| 'id'
		| 'name'
		| 'form'
		| 'autoFocus'
		| 'placeholder'
		| 'disabled'
		| 'autoComplete'
		| 'className'
		| 'title'
		| 'readOnly'
		| 'required'
		| 'tabIndex'
		| 'aria-describedby'
		| 'aria-invalid'
		| 'aria-labelledby'
		| 'aria-required'
	> {
	value?: string;
	onClick?: (e: React.SyntheticEvent | KeyboardEvent) => void;
}

const DEFAULT_MODIFIERS = [
	flip({ fallbackPlacements: ['bottom'] }),
	shift({ limiter: limitShift() })
];

const DateTimePicker = React.forwardRef<DatePicker, DateTimePickerProps>(function DateTimePickerFn(
	{
		width = '15.625rem',
		hasError,
		label,
		showTimeSelect = true,
		dateFormat = 'MMMM d, yyyy h:mm aa',
		timeIntervals = 15,
		enableChips,
		chipProps,
		CustomComponent,
		backgroundColor = INPUT_BACKGROUND_COLOR,
		errorLabel = 'Error',
		isClearable = false,
		onChange,
		defaultValue = null,
		disabled,
		popperModifiers = DEFAULT_MODIFIERS,
		...datePickerProps
	}: DateTimePickerProps,
	ref: React.ForwardedRef<DatePicker>
) {
	const dateTimeRef = useRef<Date | null>(defaultValue);
	const [dateTime, setDateTime] = useState(defaultValue);
	const updateDateTimeState = useCallback<
		(
			action:
				| { type: 'SAVE' | 'SAVE_AND_UPDATE'; value: Date | null }
				| { type: 'UPDATE'; value?: never }
		) => void
	>(
		({ type, value: newValue }) => {
			const currentValue = dateTimeRef.current;
			switch (type) {
				case 'SAVE':
					dateTimeRef.current = newValue;
					break;
				case 'UPDATE':
					setDateTime(currentValue);
					onChange?.(currentValue);
					break;
				case 'SAVE_AND_UPDATE':
					dateTimeRef.current = newValue;
					setDateTime(newValue);
					onChange?.(newValue);
					break;
				default:
					break;
			}
		},
		[onChange]
	);

	useEffect(() => {
		updateDateTimeState({ type: 'SAVE_AND_UPDATE', value: defaultValue });
	}, [defaultValue, updateDateTimeState]);

	const onClear = useCallback(() => {
		updateDateTimeState({ type: 'SAVE_AND_UPDATE', value: null });
	}, [updateDateTimeState]);

	const onValueChange = useCallback(
		(date: Date | null) => {
			updateDateTimeState({ type: 'SAVE', value: date });
		},
		[updateDateTimeState]
	);

	const handleChipChange = useCallback<DateTimePickerChipInputProps['handleChipChange']>(
		(items) => {
			// this change is called only when chip is removed through the close action
			// so the value set as new date should always be null.
			// Other changes are handled from outside by changing the value of the chip input directly.
			const newDateTime = items.length > 0 ? (items[0].value as Date) : null;
			updateDateTimeState({ type: 'SAVE_AND_UPDATE', value: newDateTime });
		},
		[updateDateTimeState]
	);

	const defaultInputComponent = useMemo(() => {
		if (enableChips) {
			return (
				<DateTimePickerChipInput
					width={width}
					background={backgroundColor}
					hasError={hasError}
					description={(hasError && errorLabel) || undefined}
					handleChipChange={handleChipChange}
					chipProps={chipProps}
					chipValue={dateTime}
				/>
			);
		}
		return (
			<DateTimePickerInput
				background={backgroundColor}
				hasError={hasError}
				description={(hasError && errorLabel) || undefined}
				width={width}
				label={label}
				onClear={onClear}
				isClearable={isClearable}
			/>
		);
	}, [
		backgroundColor,
		chipProps,
		dateTime,
		enableChips,
		errorLabel,
		handleChipChange,
		hasError,
		isClearable,
		label,
		onClear,
		width
	]);

	const updateDateTime = useCallback<NonNullable<DatePickerProps['onCalendarClose']>>(() => {
		updateDateTimeState({ type: 'UPDATE' });
	}, [updateDateTimeState]);

	return (
		<Container orientation={'horizontal'} width={width} mainAlignment={'flex-start'} height={'fit'}>
			<DatePicker
				showPopperArrow={false}
				selected={dateTime}
				onChange={onValueChange}
				showTimeSelect={showTimeSelect}
				timeIntervals={timeIntervals}
				dateFormat={dateFormat}
				disabled={disabled}
				customInput={CustomComponent ? <CustomComponent /> : defaultInputComponent}
				ref={ref}
				placeholderText={label}
				onCalendarClose={updateDateTime}
				onSelect={updateDateTime}
				onBlur={updateDateTime}
				popperModifiers={popperModifiers}
				wrapperClassName={styles.wrapper}
				popperPlacement={'bottom-start'}
				{...datePickerProps}
			/>
		</Container>
	);
});

export {
	DateTimePicker,
	type DateTimePickerProps,
	getDefaultLocale,
	setDefaultLocale,
	registerLocale,
	DEFAULT_MODIFIERS,
	type DatePickerCustomInputProps
};
