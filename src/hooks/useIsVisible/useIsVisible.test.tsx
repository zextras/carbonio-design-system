/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useRef } from 'react';

import { useIsVisible } from './useIsVisible';
import { makeItemsVisible, screen, setup } from '../../test-utils';

type IntersectionObserverMock = jest.Mock<
	IntersectionObserver,
	[callback: IntersectionObserverCallback, options?: IntersectionObserverInit]
>;

function getIntersectionObserverCalls(): IntersectionObserverMock['mock']['calls'] {
	const { calls } = (window.IntersectionObserver as unknown as IntersectionObserverMock).mock;
	return calls ?? [];
}

const VISIBLE_TRUE = 'Item is visible';
const VISIBLE_FALSE = 'Item is not visible';
const TestComponent = ({ options }: { options?: IntersectionObserverInit }): React.JSX.Element => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isVisible, itemRef] = useIsVisible<HTMLDivElement>(containerRef, undefined, options);
	return (
		<div data-testid={'container'} ref={containerRef}>
			<div ref={itemRef}>{isVisible ? VISIBLE_TRUE : VISIBLE_FALSE}</div>
		</div>
	);
};

describe('Use is visible hook', () => {
	it('should return false if the element is not visible on first render', () => {
		setup(<TestComponent />);
		expect(screen.getByText(VISIBLE_FALSE)).toBeVisible();
	});

	it('should return true if the element becomes visible', () => {
		setup(<TestComponent />);
		makeItemsVisible();
		expect(screen.getByText(VISIBLE_TRUE)).toBeVisible();
	});

	it('should use list element to track visibility', async () => {
		setup(<TestComponent />);
		makeItemsVisible();
		const [, initOptions] = getIntersectionObserverCalls()[0];
		expect(initOptions?.root).toEqual(screen.getByTestId('container'));
	});

	it('should use custom options to track visibility when set', async () => {
		const customInitOptions = {
			threshold: 0.5,
			rootMargin: '10px 20px 30px 40px',
			root: document
		} satisfies IntersectionObserverInit;
		setup(<TestComponent options={customInitOptions} />);
		makeItemsVisible();
		const [, initOptions] = getIntersectionObserverCalls()[0];
		expect(initOptions?.threshold).toEqual(customInitOptions.threshold);
		expect(initOptions?.rootMargin).toEqual(customInitOptions.rootMargin);
	});
});
