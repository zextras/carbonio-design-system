/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { ThemeProvider } from './theme/theme-context-provider';

export function render(ui, { ...options } = {}) {
	const Wrapper = ({ children }) => <ThemeProvider>{children}</ThemeProvider>;

	return rtlRender(ui, {
		wrapper: Wrapper,
		...options
	});
}
