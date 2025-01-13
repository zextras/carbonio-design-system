/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import type { ScreenMode } from '../../hooks/useScreenMode';
import { useScreenMode } from '../../hooks/useScreenMode';

interface ResponsiveProps {
	/** Whether the component's children should be displayed on mobile or desktop mode */
	mode: ScreenMode;
	/** The Window element to use to determine the screenMode */
	target?: Window;
	/** Content to conditionally render */
	children: React.ReactNode | React.ReactNode[];
}

function Responsive({ children, mode, target }: ResponsiveProps): React.JSX.Element {
	const screenMode = useScreenMode(target || window);
	return <>{screenMode === mode && children}</>;
}

export type { ResponsiveProps };
export { Responsive };
