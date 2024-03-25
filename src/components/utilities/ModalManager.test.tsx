/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useContext } from 'react';

import { renderHook } from '@testing-library/react';

import { ModalManager, ModalManagerContext } from './ModalManager';
import { ThemeProvider } from '../../theme/theme-context-provider';

describe('ModalManagerContext', () => {
	it('should return undefined if no manager has been set', () => {
		const { result } = renderHook(useContext, {
			initialProps: ModalManagerContext,
			wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>
		});
		expect(result.current).toBeUndefined();
	});

	it('should return a defined function if a manager has been set', () => {
		const { result } = renderHook(useContext, {
			initialProps: ModalManagerContext,
			wrapper: ({ children }) => (
				<ThemeProvider>
					<ModalManager>{children}</ModalManager>
				</ThemeProvider>
			)
		});
		expect(result.current).toBeDefined();
	});
});
