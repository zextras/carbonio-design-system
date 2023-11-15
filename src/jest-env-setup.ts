/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import '@testing-library/jest-dom/extend-expect';
import { act, configure } from '@testing-library/react';
import failOnConsole from 'jest-fail-on-console';

configure({
	asyncUtilTimeout: 2000
});

failOnConsole({
	shouldFailOnError: true,
	shouldFailOnWarn: true
});

beforeAll(() => {
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: jest.fn().mockImplementation((query) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: jest.fn(), // Deprecated
			removeListener: jest.fn(), // Deprecated
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			dispatchEvent: jest.fn()
		}))
	});

	// mock a simplified Intersection Observer
	Object.defineProperty(window, 'IntersectionObserver', {
		writable: false,
		value: jest.fn().mockImplementation(
			(
				callback: IntersectionObserverCallback,
				options?: IntersectionObserverInit
			): IntersectionObserver => ({
				thresholds: (options?.threshold || [0]) as typeof IntersectionObserver.prototype.thresholds,
				root: options?.root || window.document,
				rootMargin: options?.rootMargin || '0px',
				observe: jest.fn(),
				unobserve: jest.fn(),
				disconnect: jest.fn(),
				takeRecords: (): IntersectionObserverEntry[] => []
			})
		)
	});

	// mock a simplified Intersection Observer
	Object.defineProperty(window, 'ResizeObserver', {
		writable: true,
		value: function ResizeObserverMock(): ResizeObserver {
			return {
				observe: jest.fn(),
				unobserve: jest.fn(),
				disconnect: jest.fn()
			};
		}
	});

	// define resizeTo function so that it fire a resize event with wanted dimensions
	window.resizeTo = function resizeTo(width, height): void {
		Object.assign(this, {
			innerWidth: width,
			innerHeight: height,
			outerWidth: width,
			outerHeight: height
		}).dispatchEvent(new this.Event('resize'));
	};
});

afterEach(() => {
	// Restores the original implementation of "spies"
	// Replace mocks with jest.fn(), but replace spies with their original implementation.
	jest.restoreAllMocks();
	jest.runOnlyPendingTimers();
	act(() => {
		window.resizeTo(1024, 768);
	});
});
