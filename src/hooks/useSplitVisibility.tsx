/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { drop, head, last, slice } from 'lodash';

function useSplitVisibility<T, R extends HTMLElement = HTMLElement>(
	items: T[],
	removeFrom = 'end'
): [T[], T[], React.RefObject<R>] {
	const [visibleItems, setVisibleItems] = useState<T[]>(items);
	const [hiddenItems, setHiddenItems] = useState<T[]>([]);

	const [width, setWidth] = useState(window.innerWidth);
	const [lastHiddenWidth, setLastHiddenWidth] = useState(0);

	useEffect(() => {
		setVisibleItems(items);
		setHiddenItems([]);
		setLastHiddenWidth(0);
	}, [items]);

	useEffect(() => {
		function handleResize(): void {
			setWidth(window.innerWidth);
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const containerRef = useRef<R>(null);

	useLayoutEffect(() => {
		if (
			containerRef.current &&
			containerRef.current.offsetWidth >= lastHiddenWidth &&
			hiddenItems.length > 0
		) {
			if (removeFrom === 'end') {
				setVisibleItems([...visibleItems, head(hiddenItems) as T]);
				setHiddenItems(drop(hiddenItems));
			} else {
				setVisibleItems([last(hiddenItems) as T, ...visibleItems]);
				setHiddenItems(slice(hiddenItems, 0, hiddenItems.length - 1));
			}
		}
		if (
			containerRef.current &&
			containerRef.current.scrollWidth > containerRef.current.offsetWidth &&
			visibleItems.length > 0
		) {
			if (removeFrom === 'end') {
				setHiddenItems([last(visibleItems) as T, ...hiddenItems]);
				setVisibleItems(slice(visibleItems, 0, visibleItems.length - 1));
			} else {
				setHiddenItems([...hiddenItems, head(visibleItems) as T]);
				setVisibleItems(drop(visibleItems));
			}
			setLastHiddenWidth(containerRef.current.scrollWidth);
		}
	}, [width, items, lastHiddenWidth, hiddenItems, visibleItems, removeFrom]);

	return [visibleItems, hiddenItems, containerRef];
}

export { useSplitVisibility };
