/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useEffect, useState } from 'react';
import { filter, reduce } from 'lodash';

function useHiddenCount(
	containerRef: React.RefObject<HTMLElement>,
	listenForWindowResize: boolean
): [number, () => void] {
	const [hiddenTabsCount, setHiddenTabsCount] = useState<number>(0);

	const calculateHiddenCounts = useCallback(() => {
		if (containerRef.current) {
			// eslint-disable-next-line no-param-reassign
			containerRef.current.style.width = '';
			const allItems = Array.from(containerRef.current.querySelectorAll<HTMLElement>(':scope > *'));
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
		return (): void => {
			listenForWindowResize && window.removeEventListener('resize', calculateHiddenCounts);
		};
	}, [listenForWindowResize, calculateHiddenCounts]);

	return [hiddenTabsCount, calculateHiddenCounts];
}

export { useHiddenCount };
