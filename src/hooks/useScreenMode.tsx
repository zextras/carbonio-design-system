/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useLayoutEffect, useState, useContext, useCallback } from 'react';
import { ThemeContext } from 'styled-components';

type ScreenMode = 'mobile' | 'desktop';

function useScreenMode(target: Window = window): ScreenMode {
	const theme = useContext(ThemeContext);

	const check = useCallback(
		(width: number, height: number): ScreenMode =>
			width < theme.breakpoints.width || width / height < theme.breakpoints.aspectRatio
				? 'mobile'
				: 'desktop',
		[theme]
	);

	const [screenMode, setScreenMode] = useState<ScreenMode>(
		check(target.innerWidth, target.innerHeight)
	);

	useLayoutEffect(() => {
		const handleResize = (): void => {
			setScreenMode(check(target.innerWidth, target.innerHeight));
		};
		target.addEventListener('resize', handleResize);

		return (): void => {
			target.removeEventListener('resize', handleResize);
		};
	}, [check, setScreenMode, target]);

	return screenMode;
}

export { useScreenMode, ScreenMode };
