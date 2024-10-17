/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useMemo } from 'react';

import { DatePickerProps } from 'react-datepicker';
import styled from 'styled-components';

import type { DatePickerCustomInputProps } from './DateTimePicker';
import { Button } from '../../basic/button/Button';
import { Container, ContainerProps } from '../../layout/Container';
import { IconButtonProps } from '../IconButton';
import { Input, InputProps } from '../input/Input';

const InputIconsContainer = styled.div`
	display: flex;
	gap: 0.5rem;
	width: fit-content;
`;
const CustomIconButton = styled(Button)`
	padding: 0.125rem;
`;

type InputIconsProps = Pick<IconButtonProps, 'onClick' | 'disabled'> & {
	showClear: boolean;
	onClear: IconButtonProps['onClick'];
};

const buildInputIcons = ({
	showClear,
	onClear,
	onClick,
	disabled
}: InputIconsProps): NonNullable<InputProps['CustomIcon']> =>
	function InputIcons({ hasError }): React.JSX.Element {
		return (
			<InputIconsContainer>
				{showClear && (
					<CustomIconButton
						icon="CloseOutline"
						size="large"
						onClick={onClear}
						disabled={disabled}
						color={'text'}
						type={'ghost'}
					/>
				)}
				<CustomIconButton
					icon="CalendarOutline"
					size="large"
					type={'ghost'}
					onClick={onClick}
					color={hasError ? 'error' : 'text'}
					disabled={disabled}
				/>
			</InputIconsContainer>
		);
	};

type DateTimePickerInputProps = Omit<
	InputProps,
	keyof NonNullable<DatePickerProps['customInput']>
> & {
	width: ContainerProps['width'];
	isClearable: boolean;
	onClear: IconButtonProps['onClick'];
};

export const DateTimePickerInput = React.forwardRef<
	HTMLDivElement,
	// do not directly accept props that will come from react-datepicker
	DateTimePickerInputProps & Partial<Record<keyof DatePickerCustomInputProps, never>>
>(function DateTimePickerInputFn(
	{
		width,
		onClear,
		isClearable,
		placeholder,
		...rest
	}: DateTimePickerInputProps & DatePickerCustomInputProps,
	ref
) {
	const { value, onClick = (): void => undefined, disabled } = rest;

	const InputIconsComponent = useMemo<InputProps['CustomIcon']>(
		() => buildInputIcons({ showClear: isClearable && !!value, onClear, onClick, disabled }),
		[disabled, isClearable, onClear, onClick, value]
	);

	return (
		<Container width={width} ref={ref}>
			<Input CustomIcon={InputIconsComponent} label={placeholder} {...rest} />
		</Container>
	);
});
