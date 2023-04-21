/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import '@testing-library/jest-dom/extend-expect';
import { act } from '@testing-library/react';

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
		writable: false,
		value: function ResizeObserverMock(callback: ResizeObserverCallback): ResizeObserver {
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
	act(() => {
		window.resizeTo(1024, 768);
	});
});
