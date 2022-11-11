/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { drop, head, last, slice } from 'lodash';

type Options = {
	removeFrom: 'end' | 'start';
	maxVisible?: number;
};

function useSplitVisibility<T, R extends HTMLElement = HTMLElement>(
	items: T[],
	// TODO(BREAKING CHANGE): remove string types and keep only Option type and rename to "options"
	optionsWithRetroCompatibility: Options | 'end' | 'start' = { removeFrom: 'end' }
): [T[], T[], React.RefObject<R>] {
	const [visibleItems, setVisibleItems] = useState<T[]>(items);
	const [hiddenItems, setHiddenItems] = useState<T[]>([]);

	const [width, setWidth] = useState(window.innerWidth);
	const [lastHiddenWidth, setLastHiddenWidth] = useState(0);

	// TODO(BREAKING CHANGE): remove when options will be only an Option type
	const options = useMemo<Options>(
		() =>
			typeof optionsWithRetroCompatibility === 'string'
				? {
						removeFrom: optionsWithRetroCompatibility
				  }
				: optionsWithRetroCompatibility,
		[optionsWithRetroCompatibility]
	);

	useEffect(() => {
		if (typeof options.maxVisible === 'number') {
			setVisibleItems(items.slice(0, options.maxVisible));
			setHiddenItems(items.slice(options.maxVisible));
		} else {
			setVisibleItems(items);
			setHiddenItems([]);
		}
		setLastHiddenWidth(0);
	}, [items, options.maxVisible]);

	useEffect(() => {
		function handleResize(): void {
			setWidth(window.innerWidth);
		}
		window.addEventListener('resize', handleResize);
		return (): void => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const containerRef = useRef<R>(null);

	useLayoutEffect(() => {
		if (containerRef?.current) {
			const { offsetWidth, scrollWidth } = containerRef.current;
			if (
				offsetWidth >= lastHiddenWidth &&
				hiddenItems.length > 0 &&
				(typeof options.maxVisible !== 'number' || visibleItems.length < options.maxVisible)
			) {
				if (options.removeFrom === 'end') {
					setVisibleItems([...visibleItems, head(hiddenItems) as T]);
					setHiddenItems(drop(hiddenItems));
				} else {
					setVisibleItems([last(hiddenItems) as T, ...visibleItems]);
					setHiddenItems(slice(hiddenItems, 0, hiddenItems.length - 1));
				}
			}
			if (scrollWidth > offsetWidth && visibleItems.length > 0) {
				if (options.removeFrom === 'end') {
					setHiddenItems([last(visibleItems) as T, ...hiddenItems]);
					setVisibleItems(slice(visibleItems, 0, visibleItems.length - 1));
				} else {
					setHiddenItems([...hiddenItems, head(visibleItems) as T]);
					setVisibleItems(drop(visibleItems));
				}
				setLastHiddenWidth(scrollWidth);
			}
		}
	}, [width, items, lastHiddenWidth, hiddenItems, visibleItems, options]);

	return [visibleItems, hiddenItems, containerRef];
}

export { useSplitVisibility, Options };
