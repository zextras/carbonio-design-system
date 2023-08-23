/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { ThemeProvider } from '../../src/theme/theme-context-provider';

export default function Wrapper({
	children
}: {
	children?: React.ReactNode | React.ReactNode[];
}): React.JSX.Element {
	return <ThemeProvider loadDefaultFont>{children}</ThemeProvider>;
}
