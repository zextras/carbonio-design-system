/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';

import type { DatePickerCustomInputProps } from './DateTimePicker';
import type { SingleItemArray } from '../../../types/utils';
import type { ChipProps } from '../../display/chip/Chip';
import type { ContainerProps } from '../../layout/container/Container';
import { Container } from '../../layout/container/Container';
import type { ChipInputProps, ChipItem } from '../chipInput/ChipInput';
import { ChipInput } from '../chipInput/ChipInput';

type DateChipItem = ChipItem<Date>;

export type DateTimePickerChipInputProps = Omit<
	ChipInputProps<Date>,
	keyof DatePickerCustomInputProps
> & {
	width: ContainerProps['width'];
	chipValue: Date | null;
	chipProps: Partial<ChipProps> | undefined;
	/** Redefine onChange for ChipInput to avoid having it overwritten by react-datepicker */
	handleChipChange: (items: DateChipItem[]) => void;
	/** Called on every change of the typed text, to discard the date parsed from the previous text */
	onInputClear: () => void;
};

export const DateTimePickerChipInput = React.forwardRef<
	HTMLDivElement,
	// do not directly accept props that will come from react-datepicker
	DateTimePickerChipInputProps & Partial<Record<keyof DatePickerCustomInputProps, never>>
>(function DateTimePickerChipInputFn(
	{
		width,
		onChange,
		chipProps,
		handleChipChange,
		onInputClear,
		placeholder,
		chipValue,
		value,
		...rest
	}: DateTimePickerChipInputProps & DatePickerCustomInputProps,
	ref
) {
	const { hasError, onClick, disabled } = rest;
	const inputRef = useRef<HTMLInputElement>(null);
	const [chipInputValue, setChipInputValue] = useState<SingleItemArray<DateChipItem>>([]);

	useEffect(() => {
		setChipInputValue((prevState) => {
			const prevValue = prevState.length > 0 && prevState[0] ? prevState[0].value : null;
			if (chipValue && value) {
				return [
					{
						background: disabled ? undefined : 'gray2',
						avatarIcon: 'CalendarOutline',
						color: 'text',
						...chipProps,
						value: chipValue,
						label: value,
						onClick,
						disabled
					}
				];
			}
			if (prevValue && !chipValue) {
				return [];
			}
			return prevState;
		});
		if (value && chipValue && inputRef.current) {
			inputRef.current.value = '';
			inputRef.current.dispatchEvent(new Event('change'));
		}
	}, [chipProps, chipValue, disabled, onClick, value]);

	useEffect(() => {
		// react-datepicker empties its value when it closes without a date: drop the invalid text
		if (!value && inputRef.current?.value) {
			inputRef.current.value = '';
			inputRef.current.dispatchEvent(new Event('change'));
		}
	}, [value]);

	// relay every change synchronously, so that react-datepicker has parsed the text
	// before an Enter or a click outside confirms it
	const onInput = useCallback(
		(event: React.FormEvent<HTMLDivElement>) => {
			if (event.target !== inputRef.current || !(event.target instanceof HTMLInputElement)) {
				return;
			}
			onInputClear();
			onChange?.({
				...event,
				target: event.target,
				currentTarget: event.target
			});
		},
		[onChange, onInputClear]
	);

	return (
		<Container width={width} ref={ref} onInput={onInput}>
			<ChipInput
				icon="CalendarOutline"
				iconAction={onClick}
				iconColor={hasError ? 'error' : 'text'}
				iconDisabled={disabled}
				wrap={'nowrap'}
				separators={[]}
				{...rest}
				placeholder={placeholder}
				value={chipInputValue}
				onChange={handleChipChange}
				maxChips={1}
				confirmChipOnBlur={false}
				inputRef={inputRef}
			/>
		</Container>
	);
});
