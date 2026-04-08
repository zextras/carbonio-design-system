/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import '@testing-library/jest-dom';
import { act, cleanup } from '@testing-library/react';
import { noop } from 'lodash';
import failOnConsole from 'vitest-fail-on-console';

failOnConsole({
	shouldFailOnError: true,
	shouldFailOnWarn: true
});

beforeAll(() => {
	vi.useFakeTimers({
		shouldAdvanceTime: true
	});
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

	// mock a simplified crypto
	Object.defineProperty(window, 'crypto', {
		writable: true,
		value: {
			get subtle() {
				throw new Error('subtle mock is not implemented!');
			},
			getRandomValues: vi.fn(() => {
				throw new Error('getRandomValues mock is not implemented!');
			}),
			randomUUID: vi.fn(() => Math.random().toString())
		}
	});
});

beforeEach(() => {
	// mock a simplified Intersection Observer
	Object.defineProperty(window, 'IntersectionObserver', {
		writable: true,
		value: vi.fn(function intersectionObserverMock(
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

	// mock a simplified Resize Observer
	Object.defineProperty(window, 'ResizeObserver', {
		writable: true,
		value: vi.fn(function ResizeObserverMock(): ResizeObserver {
			return {
				observe: vi.fn(),
				unobserve: vi.fn(),
				disconnect: vi.fn()
			};
		})
	});
});

afterEach(() => {
	cleanup();
	// Restores the original implementation of "spies"
	// Replace mocks with vi.fn(), but replace spies with their original implementation.
	if (vi.isFakeTimers()) {
		vi.runOnlyPendingTimers();
	}
	act(() => {
		window.resizeTo(1024, 768);
	});
});
