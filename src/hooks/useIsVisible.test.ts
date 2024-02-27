/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { renderHook } from '@testing-library/react-hooks';

import { useIsVisible } from './useIsVisible';
import { makeItemsVisible } from '../test-utils';

type UseIsVisibleParams = Parameters<typeof useIsVisible>;
type UseIsVisibleReturnType = ReturnType<typeof useIsVisible>;

describe('Use is visible hook', () => {
	it('should return false if the element is not visible on first render', () => {
		const listRef = React.createRef<HTMLDivElement>();
		const { result } = renderHook<UseIsVisibleParams, UseIsVisibleReturnType>(
			(props) => useIsVisible(...props),
			{
				initialProps: [listRef]
			}
		);
		expect(result.current[0]).toBeFalsy();
	});

	it('should return true if the element becomes visible', () => {
		const listRef = React.createRef<HTMLDivElement>();
		const { result } = renderHook<UseIsVisibleParams, UseIsVisibleReturnType>(
			(props) => useIsVisible(...props),
			{
				initialProps: [listRef]
			}
		);
		makeItemsVisible();
		expect(result.current[0]).toBeTruthy();
	});

	it('should use list element to track visibility', () => {
		const listRef = React.createRef<HTMLDivElement>();
		renderHook<UseIsVisibleParams, UseIsVisibleReturnType>((props) => useIsVisible(...props), {
			initialProps: [listRef],
			wrapper: ({ children }) => React.createElement('div', { ref: listRef }, children)
		});
		const { calls } = (
			window.IntersectionObserver as jest.Mock<
				IntersectionObserver,
				[callback: IntersectionObserverCallback, options?: IntersectionObserverInit]
			>
		).mock;
		const [, initOptions] = calls[0];
		expect(initOptions?.root).toEqual(listRef.current);
	});

	it('should use custom options to track visibility when set', () => {
		const listRef = React.createRef<HTMLDivElement>();
		const customInitOptions = {
			threshold: 0.5,
			rootMargin: '10px 20px 30px 40px',
			root: document
		} satisfies IntersectionObserverInit;
		renderHook<UseIsVisibleParams, UseIsVisibleReturnType>((props) => useIsVisible(...props), {
			initialProps: [listRef, undefined, customInitOptions]
		});
		const { calls } = (
			window.IntersectionObserver as jest.Mock<
				IntersectionObserver,
				[callback: IntersectionObserverCallback, options?: IntersectionObserverInit]
			>
		).mock;
		const [, initOptions] = calls[0];
		expect(initOptions?.threshold).toEqual(customInitOptions.threshold);
		expect(initOptions?.rootMargin).toEqual(customInitOptions.rootMargin);
		expect(initOptions?.root).toEqual(document);
	});
});
