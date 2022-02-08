/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import { render as rtlRender, RenderResult } from '@testing-library/react';
import { ThemeProvider } from './theme/theme-context-provider';

export function render(ui: React.ReactElement, { ...options } = {}): RenderResult {
	const Wrapper: React.FC = ({ children }) => <ThemeProvider>{children}</ThemeProvider>;

	return rtlRender(ui, {
		wrapper: Wrapper,
		...options
	});
}
