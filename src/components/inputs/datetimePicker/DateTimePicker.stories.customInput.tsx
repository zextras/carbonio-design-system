/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { DateTimePicker, DateTimePickerProps } from './DateTimePicker';
import { Button } from '../../basic/button/Button';

type CustomInputProps = React.ComponentProps<NonNullable<DateTimePickerProps['CustomComponent']>>;
const ExampleCustomInput = React.forwardRef<HTMLDivElement, CustomInputProps>(
	function CustomInputFn({ value, onClick = (): void => undefined }, ref) {
		return <Button onClick={onClick} ref={ref} label={value} icon="CalendarOutline" />;
	}
);

export const DateTimePickerWithCustomInput = (): React.JSX.Element => (
	<DateTimePicker
		label="Date Time Picker"
		includeTime={false}
		dateFormat="dd/MM/yyyy"
		CustomComponent={ExampleCustomInput}
	/>
);
