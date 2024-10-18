/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { ru } from 'date-fns/locale/ru';

import { DateTimePicker } from './DateTimePicker';

export const DateTimePickerWithLocaleObj = (): React.JSX.Element => (
	<DateTimePicker label={'locale: ru'} locale={ru} timeCaption="need translation" />
);
