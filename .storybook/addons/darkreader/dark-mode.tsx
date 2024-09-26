/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useEffect, useState } from 'react';

import { IconButton  } from '@storybook/components';
import { MoonIcon, SunIcon } from '@storybook/icons';
import { disable, enable } from 'darkreader';
import { API } from 'storybook/internal/manager-api';

export const DarkMode = ({ api }: { api: API }) => {
    const [isDarkModeEnabled, setIsDarkModeEnabled] = useState<boolean>(false);
    const globals = api.getGlobals();

    const darkModeToggle = useCallback(() => {
        setIsDarkModeEnabled((prevState) => !prevState);
    }, []);

    useEffect(() => {
        api.updateGlobals({
            isDarkModeEnabled: isDarkModeEnabled
        });
        globals.isDarkModeEnabled ? enable({}) : disable()
    }, [isDarkModeEnabled, globals.isDarkModeEnabled]);

    return (
        <IconButton title="dark mode" onClick={darkModeToggle}>
            {isDarkModeEnabled ? <SunIcon /> : <MoonIcon />}
        </IconButton>
    );
};
