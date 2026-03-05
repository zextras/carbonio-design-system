/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useEffect } from 'react';

import { DocsContainer } from '@storybook/addon-docs/blocks';
import { disable, enable } from 'darkreader';
import type { Globals } from 'storybook/internal/csf';

export const DarkReaderDocsContainer = ({
	children,
	context,
	...rest
}: React.ComponentProps<typeof DocsContainer> & {
	context: { store: { userGlobals: { globals: Globals } } };
}): React.JSX.Element => {
	const { isDarkModeEnabled } = context.store.userGlobals.globals;

	useEffect(() => {
		isDarkModeEnabled ? enable({}) : disable();
	}, [isDarkModeEnabled]);

	return (
		<DocsContainer context={context} {...rest}>
			{children}
		</DocsContainer>
	);
};
