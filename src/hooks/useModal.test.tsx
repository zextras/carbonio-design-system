/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { act, renderHook } from '@testing-library/react';

import { useModal } from './useModal';
import { ModalManager } from '../components/utilities/ModalManager';
import { ThemeProvider } from '../theme/theme-context-provider';

jest.mock<typeof import('react-dom')>('react-dom', () => ({
	...jest.requireActual<typeof import('react-dom')>('react-dom'),
	createPortal: (node): React.ReactPortal => ({ children: node, key: null, props: {}, type: '' })
}));

const modalContextError = 'Modal manager context not initialized';
beforeEach(() => {
	const originalErrorFn = console.error;
	console.error = jest.fn<ReturnType<typeof console.error>, Parameters<typeof console.error>>(
		(message, ...args) => {
			// silence error for snackbar
			if (message !== modalContextError) {
				originalErrorFn(message, ...args);
			}
		}
	);
});

describe('useModal', () => {
	it('should return a defined function which logs an error if no manager has been set', () => {
		const { result } = renderHook(useModal, {
			wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>
		});
		expect(result.current).toBeDefined();
		result.current({});
		expect(console.error).toHaveBeenCalledWith(modalContextError);
	});

	it.skip('should return a defined function if a manager has been set', () => {
		const { result } = renderHook(useModal, {
			wrapper: ({ children }) => (
				<ThemeProvider>
					<ModalManager>{children}</ModalManager>
				</ThemeProvider>
			)
		});
		expect(result.current).toBeDefined();
		act(() => {
			result.current({});
		});
		expect(console.error).not.toHaveBeenCalledWith(modalContextError);
	});
});
