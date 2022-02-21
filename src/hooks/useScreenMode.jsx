/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useLayoutEffect, useState, useContext, useCallback } from 'react';
import { ThemeContext } from 'styled-components';

export function useScreenMode(target = window) {
	const theme = useContext(ThemeContext);
	const check = useCallback(
		(width, height) =>
			width < theme.breakpoints.width || width / height < theme.breakpoints.aspectRatio
				? 'mobile'
				: 'desktop',
		[theme]
	);
	const [screenMode, setScreenMode] = useState(check(target.innerWidth, target.innerHeight));
	useLayoutEffect(() => {
		const handleResize = () => {
			setScreenMode(check(target.innerWidth, target.innerHeight));
		};
		target.addEventListener('resize', handleResize);
		return () => target.removeEventListener('resize', handleResize);
	}, [check, setScreenMode, target]);
	return screenMode;
}
