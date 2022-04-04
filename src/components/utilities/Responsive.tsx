/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import { ScreenMode, useScreenMode } from '../../hooks/useScreenMode';

interface ResponsiveProps {
	/** Whether the component's children should be displayed on mobile or desktop mode */
	mode: ScreenMode;
	/** The Window element to use to determine the screenMode */
	target?: Window;
	/** Content to conditionally render */
	children: React.ReactNode | React.ReactNode[];
}

function Responsive({ children, mode, target }: ResponsiveProps): JSX.Element {
	const screenMode = useScreenMode(target || window);
	return <>{screenMode === mode && children}</>;
}

export { Responsive, ResponsiveProps };
