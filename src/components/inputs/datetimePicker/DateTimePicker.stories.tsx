/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { DateTimePicker } from './DateTimePicker';
import { DateTimePickerWithCustomInput } from './DateTimePicker.stories.customInput';
import { DateTimePickerWithDefaultLocale } from './DateTimePicker.stories.defaultLocale';
import { DateTimePickerWithLocaleObj } from './DateTimePicker.stories.localeObject';
import { DateTimePickerWithRegisteredLocale } from './DateTimePicker.stories.registeredLocale';

const meta = {
	component: DateTimePicker,
	args: {
		label: 'Date Time Picker',
		onChange: fn()
	}
} satisfies Meta<typeof DateTimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithReactDatePickerProps = {
	args: {
		dateFormat: 'dd/MM/yyyy',
		preventOpenOnFocus: true,
		timeIntervals: 10,
		defaultValue: new Date()
	}
} satisfies Story;

export const WithoutTime = {
	args: {
		includeTime: false,
		defaultValue: new Date()
	}
} satisfies Story;

export const WithChips = {
	args: {
		enableChips: true,
		defaultValue: new Date()
	}
} satisfies Story;

export const WithErrorOnInput = {
	args: {
		hasError: true,
		defaultValue: new Date()
	}
} satisfies Story;

export const WithErrorOnChipInput = {
	args: {
		hasError: true,
		enableChips: true,
		chipProps: { error: 'Error message for the chip' },
		defaultValue: new Date()
	}
} satisfies Story;

export const WithCustomInput = { render: DateTimePickerWithCustomInput } satisfies StoryObj<
	typeof DateTimePickerWithCustomInput
>;

export const WithDefaultLocale = { render: DateTimePickerWithDefaultLocale } satisfies StoryObj<
	typeof DateTimePickerWithDefaultLocale
>;

export const WithRegisteredLocale = {
	render: DateTimePickerWithRegisteredLocale
} satisfies StoryObj<typeof DateTimePickerWithRegisteredLocale>;

export const WithLocaleObject = { render: DateTimePickerWithLocaleObj } satisfies StoryObj<
	typeof DateTimePickerWithLocaleObj
>;
