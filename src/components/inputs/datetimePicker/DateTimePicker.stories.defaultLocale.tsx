/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import enUS from 'date-fns/locale/en-US';

import { DateTimePicker, registerLocale, setDefaultLocale } from './DateTimePicker';

registerLocale('en-US', enUS);
setDefaultLocale('en-US');

export const DateTimePickerWithDefaultLocale = (): React.JSX.Element => (
	<DateTimePicker label={'locale: global default (en-US)'} timeCaption="need translation" />
);
