/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import failOnConsole from 'jest-fail-on-console';
import { noop } from 'lodash';

failOnConsole({
	shouldFailOnError: true,
	shouldFailOnWarn: true
});

beforeAll(() => {
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: (query: string): MediaQueryList => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: noop, // Deprecated
			removeListener: noop, // Deprecated
			addEventListener: noop,
			removeEventListener: noop,
			dispatchEvent: () => true
		})
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

beforeEach(() => {
	// mock a simplified Intersection Observer
	Object.defineProperty(window, 'IntersectionObserver', {
		writable: true,
		value: jest.fn(function intersectionObserverMock(
			callback: IntersectionObserverCallback,
			options: IntersectionObserverInit
		) {
			return {
				thresholds: options.threshold,
				root: options.root,
				rootMargin: options.rootMargin,
				observe: noop,
				unobserve: noop,
				disconnect: noop
			};
		})
	});

	// mock a simplified Intersection Observer
	Object.defineProperty(window, 'ResizeObserver', {
		writable: true,
		value: jest.fn(function ResizeObserverMock(): ResizeObserver {
			return {
				observe: jest.fn(),
				unobserve: jest.fn(),
				disconnect: jest.fn()
			};
		})
	});
});

afterEach(() => {
	// Restores the original implementation of "spies"
	// Replace mocks with jest.fn(), but replace spies with their original implementation.
	jest.runOnlyPendingTimers();
	act(() => {
		window.resizeTo(1024, 768);
	});
});
