/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { ptBR } from 'date-fns/locale/pt-BR';

import { DateTimePicker, registerLocale } from './DateTimePicker';

registerLocale('pt-BR', ptBR);

export const DateTimePickerWithRegisteredLocale = (): React.JSX.Element => (
	<DateTimePicker label={'locale: pt-BR'} locale={'pt-BR'} timeCaption="need translation" />
);
