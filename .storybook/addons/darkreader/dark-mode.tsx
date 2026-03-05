/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useEffect } from 'react';

import { MoonIcon, SunIcon } from '@storybook/icons';
import { disable, enable } from 'darkreader';
import { IconButton } from 'storybook/internal/components';
import { useGlobals } from 'storybook/internal/manager-api';

export const DarkMode = (): React.JSX.Element => {
	const [globals, updateGlobals] = useGlobals();

	const darkModeToggle = useCallback(() => {
		updateGlobals({
			isDarkModeEnabled: !globals.isDarkModeEnabled
		});
	}, [globals.isDarkModeEnabled, updateGlobals]);

	useEffect(() => {
		globals.isDarkModeEnabled ? enable({}) : disable();
	}, [globals.isDarkModeEnabled]);

	return (
		<IconButton title="dark mode" onClick={darkModeToggle}>
			{globals.isDarkModeEnabled ? <SunIcon /> : <MoonIcon />}
		</IconButton>
	);
};
