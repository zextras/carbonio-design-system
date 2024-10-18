/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';

import type { DatePickerCustomInputProps } from './DateTimePicker';
import { SingleItemArray } from '../../../types/utils';
import { ChipProps } from '../../display/Chip';
import { Container, ContainerProps } from '../../layout/Container';
import { ChipInput, ChipInputProps, ChipItem } from '../chipInput/ChipInput';

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

	const onInputType = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (onChange && event.target instanceof HTMLInputElement) {
				onChange({
					...event,
					target: event.target
				});
			}
		},
		[onChange]
	);

	return (
		<Container width={width} ref={ref}>
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
				onInputType={onInputType}
				maxChips={1}
				inputRef={inputRef}
			/>
		</Container>
	);
});
