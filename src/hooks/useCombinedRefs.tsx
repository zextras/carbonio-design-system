/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useRef, useEffect } from 'react';

function useCombinedRefs<T>(...refs: React.ForwardedRef<T>[]): React.RefObject<T> {
	const targetRef = useRef<T>(null);
	useEffect(() => {
		refs.forEach((ref) => {
			if (!ref) return;

			if (typeof ref === 'function') {
				ref(targetRef.current);
			} else {
				// eslint-disable-next-line no-param-reassign
				ref.current = targetRef.current;
			}
		});
	}, [refs]);
	return targetRef;
}

export { useCombinedRefs };
