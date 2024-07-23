/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useEffect, useRef } from 'react';

import { act } from '@testing-library/react';

import { useIntersectionObserver } from './useIntersectionObserver';
import { screen, setup } from '../../test-utils';

const TestComponent = ({
	onIntersect = (): void => undefined,
	renderItem1,
	renderItem2
}: {
	onIntersect?: Parameters<typeof useIntersectionObserver>[1];
	renderItem1?: boolean;
	renderItem2?: boolean;
}): React.JSX.Element => {
	const containerRef = useRef<HTMLDivElement>(null);
	const observed1Ref = useRef<HTMLDivElement>(null);
	const observed2Ref = useRef<HTMLDivElement>(null);
	const { observe, unobserve } = useIntersectionObserver(containerRef, onIntersect);

	useEffect(() => {
		const observed1 = observed1Ref.current;
		if (observed1) {
			observe(observed1);
		}

		return (): void => {
			if (observed1) {
				unobserve(observed1);
			}
		};
	}, [observe, unobserve]);

	useEffect(() => {
		const observed2 = observed1Ref.current;
		if (observed2) {
			observe(observed2);
		}

		return (): void => {
			if (observed2) {
				unobserve(observed2);
			}
		};
	}, [observe, unobserve]);

	return (
		<div data-testid={'container'} ref={containerRef}>
			{renderItem1 && <div data-testid={'observed-1'} ref={observed1Ref}></div>}
			{renderItem2 && <div data-testid={'observed-2'} ref={observed2Ref}></div>}
		</div>
	);
};

type IntersectionObserverMock = jest.Mock<
	IntersectionObserver,
	[callback: IntersectionObserverCallback, options?: IntersectionObserverInit]
>;

describe('useIntersectionObserver', () => {
	it('should create a new intersection observer with root the given ref element', () => {
		setup(<TestComponent />);
		const { calls } = (window.IntersectionObserver as unknown as IntersectionObserverMock).mock;
		const [, initOptions] = calls[0];
		expect(initOptions?.root).toBe(screen.getByTestId('container'));
	});

	it('should invoke the onIntersect callback for each intersected element', () => {
		const onIntersectFn = jest.fn();
		setup(<TestComponent onIntersect={onIntersectFn} renderItem1 renderItem2 />);
		const { calls, instances } = (
			window.IntersectionObserver as unknown as IntersectionObserverMock
		).mock;
		expect(calls).toHaveLength(1);
		const [callback] = calls[0];
		// trigger the intersection on the observed element
		const entry1 = {
			intersectionRatio: 0,
			isIntersecting: true,
			target: screen.getByTestId('observed-1')
		} as unknown as IntersectionObserverEntry;
		const entry2 = {
			intersectionRatio: 0,
			isIntersecting: false,
			target: screen.getByTestId('observed-2')
		} as unknown as IntersectionObserverEntry;
		act(() => {
			callback([entry1, entry2], instances[0]);
		});

		expect(onIntersectFn).toHaveBeenCalledTimes(2);
		expect(onIntersectFn).toHaveBeenCalledWith(entry1);
		expect(onIntersectFn).toHaveBeenCalledWith(entry2);
	});
});
