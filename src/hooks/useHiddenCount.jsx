/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useCallback, useEffect, useState } from 'react';
import { filter, reduce } from 'lodash';

export function useHiddenCount(containerRef, listenForWindowResize) {
	const [hiddenTabsCount, setHiddenTabsCount] = useState();

	const calculateHiddenCounts = useCallback(() => {
		if (containerRef && containerRef.current) {
			// eslint-disable-next-line no-param-reassign
			containerRef.current.style.width = '';
			const allItems = Array.from(containerRef.current.querySelectorAll(':scope > *'));
			const hiddenItems = filter(allItems, (child) => child.offsetTop > 0).length;
			setHiddenTabsCount(hiddenItems);
			if (hiddenItems > 0) {
				// eslint-disable-next-line no-param-reassign
				containerRef.current.style.width = `${reduce(
					allItems.splice(0, allItems.length - hiddenItems),
					(width, item) => width + item.clientWidth,
					0
				)}px`;
			}
		}
	}, [containerRef]);

	useEffect(() => {
		listenForWindowResize && window.addEventListener('resize', calculateHiddenCounts);
		return () =>
			listenForWindowResize && window.removeEventListener('resize', calculateHiddenCounts);
	}, [listenForWindowResize, calculateHiddenCounts]);

	return [hiddenTabsCount, calculateHiddenCounts];
}
