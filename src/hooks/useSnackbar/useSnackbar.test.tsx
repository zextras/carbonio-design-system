/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { act, renderHook } from '@testing-library/react-hooks';

import { useSnackbar } from './useSnackbar';
import { SnackbarManager } from '../../components/utilities/SnackbarManager';
import { ThemeProvider } from '../../theme/theme-context-provider';

jest.mock<typeof import('react-dom')>('react-dom', () => ({
	...jest.requireActual<typeof import('react-dom')>('react-dom'),
	createPortal: (node): React.ReactPortal => ({ children: node, key: null, props: {}, type: '' })
}));

const snackbarContextError = 'snackbar manager context not initialized';
beforeEach(() => {
	const originalErrorFn = console.error;
	console.error = jest.fn<ReturnType<typeof console.error>, Parameters<typeof console.error>>(
		(message, ...args) => {
			// silence error for snackbar
			if (message !== snackbarContextError) {
				originalErrorFn(message, ...args);
			}
		}
	);
});

describe('useSnackbar', () => {
	it('should return a defined function which logs an error if no manager has been set', async () => {
		const { result } = renderHook(useSnackbar, {
			wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>
		});
		expect(result.current).toBeDefined();
		result.current({
			label: 'test'
		});
		expect(console.error).toHaveBeenCalledWith(snackbarContextError);
	});

	it('should return a defined function if a manager has been set', async () => {
		const { result } = renderHook(useSnackbar, {
			wrapper: ({ children }) => (
				<ThemeProvider>
					<SnackbarManager>{children}</SnackbarManager>
				</ThemeProvider>
			)
		});
		expect(result.current).toBeDefined();
		act(() => {
			result.current({
				label: 'test'
			});
		});
		expect(console.error).not.toHaveBeenCalledWith(snackbarContextError);
	});
});
