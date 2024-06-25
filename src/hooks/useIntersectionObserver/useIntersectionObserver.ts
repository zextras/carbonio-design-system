/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { RefObject, useCallback, useEffect, useRef } from 'react';

export const useIntersectionObserver = (
	containerRef: RefObject<Element | Document> | undefined,
	onIntersect: (entry: IntersectionObserverEntry) => void,
	{ rootMargin, threshold }: Omit<IntersectionObserverInit, 'root'> = {}
): {
	observe: (element: Element) => void;
	unobserve: (element: Element) => void;
} => {
	const observerRef = useRef<IntersectionObserver | null>(null);
	const observedElementsRef = useRef<Element[]>([]);

	const onIntersectRef = useRef<typeof onIntersect>(onIntersect);
	onIntersectRef.current = onIntersect;

	useEffect(() => {
		if (!observerRef.current && !!containerRef?.current) {
			observerRef.current = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						onIntersectRef.current(entry);
					});
				},
				{
					root: containerRef.current,
					rootMargin,
					threshold
				}
			);

			// re-observe element once intersection observer is re-created
			observedElementsRef.current.forEach((element) => {
				observerRef.current?.observe(element);
			});
		}

		return (): void => {
			observerRef.current?.disconnect();
			observerRef.current = null;
		};
	}, [containerRef, rootMargin, threshold]);

	const observe = useCallback((element: Element) => {
		if (observerRef.current && !observedElementsRef.current.includes(element)) {
			observedElementsRef.current.push(element);
			observerRef.current.observe(element);
		}
	}, []);

	const unobserve = useCallback((element: Element) => {
		observerRef.current?.unobserve(element);
		observedElementsRef.current.splice(observedElementsRef.current.indexOf(element), 1);
	}, []);

	return { observe, unobserve };
};
