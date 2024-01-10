/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useContext } from 'react';

import { renderHook } from '@testing-library/react-hooks';

import { SnackbarManager, SnackbarManagerContext } from './SnackbarManager';
import { ThemeProvider } from '../../theme/theme-context-provider';

describe('SnackbarManagerContext', () => {
	it('should return undefined if no manager has been set', () => {
		const { result } = renderHook(useContext, {
			initialProps: SnackbarManagerContext,
			wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>
		});
		expect(result.current).toBeUndefined();
	});

	it('should return a defined function if a manager has been set', () => {
		const { result } = renderHook(useContext, {
			initialProps: SnackbarManagerContext,
			wrapper: ({ children }) => (
				<ThemeProvider>
					<SnackbarManager>{children}</SnackbarManager>
				</ThemeProvider>
			)
		});
		expect(result.current).toBeDefined();
	});
});
