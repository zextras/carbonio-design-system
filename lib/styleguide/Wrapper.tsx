/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { useDirection } from './useDirection';
import { ThemeProvider } from '../../src';

export default function Wrapper({
	children
}: {
	children?: React.ReactNode | React.ReactNode[];
}): JSX.Element {
	const [direction] = useDirection();
	return (
		<ThemeProvider loadDefaultFont direction={direction}>
			{children}
		</ThemeProvider>
	);
}
